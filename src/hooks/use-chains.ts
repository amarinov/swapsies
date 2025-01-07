import { useCallback, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { ChainResponse } from "../services/api/types";
import { Chain, ChainId } from "../types/entities";
import { getChains } from "../services/api/chains";

interface UseChainsResult {
  chains: Record<ChainId, Chain> | null;
  isLoading: boolean;
  refetch: () => Promise<ChainResponse>;
}

function transformChainsResponse(chainsResponse: ChainResponse): Record<ChainId, Chain> {
  return chainsResponse.reduce<Record<ChainId, Chain>>((acc, chain) => {
    acc[chain.id] = chain;
    return acc;
  }, {});
}

export function useChains(): UseChainsResult {
  const [chains, setChains] = useState<Record<ChainId, Chain> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showBoundary: showError } = useErrorBoundary();

  const fetchChains = useCallback(async () => {
    setChains(null);
    setIsLoading(true);

    try {
      const response = await getChains();
      setChains(transformChainsResponse(response));
      setIsLoading(false);

      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchChains().catch(() => {
      showError({ message: "Failed to fetch chains" });
    });
  }, [fetchChains, showError]);

  return { chains, isLoading, refetch: fetchChains };
}