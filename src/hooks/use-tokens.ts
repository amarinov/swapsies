import { useCallback, useEffect, useState } from "react";
import { getTokens } from '../services/api/token-management';
import type { TokensResponse } from "../services/api/types";
import { ChainId, Token } from "../types/entities";
import { useErrorBoundary } from "react-error-boundary";

interface UseTokensResult {
  tokens: Record<ChainId, Token[]> | null;
  isLoading: boolean;
  refetch: () => Promise<TokensResponse>;
}
   
export function useTokens(): UseTokensResult {
  const [tokens, setTokens] = useState<TokensResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showBoundary: showError } = useErrorBoundary();

  const fetchTokens = useCallback(async () => {
    setTokens(null);
    setIsLoading(true);

    try {
      const response = await getTokens();
      setTokens(response);
      setIsLoading(false);

      return response;
    } catch(error)  {
      setIsLoading(false);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchTokens().catch(() => {
      showError({ message: "Failed to fetch tokens" });
    });
  }, [fetchTokens, showError]);

  return {tokens, isLoading, refetch: fetchTokens};
}