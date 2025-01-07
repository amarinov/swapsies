import { Chain, ChainId, Token } from "../../types/entities";
export type { Route as BridgingRoute } from "@lifi/sdk";

export type TokensResponse = Record<ChainId, Token[]>;
export type ChainResponse = Chain[];

export type GetRoutesParams = {
  fromChainId: number
  fromAmount: string
  fromTokenAddress: string
  toChainId: number
  toTokenAddress: string
}