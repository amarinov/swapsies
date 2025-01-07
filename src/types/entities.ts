export type ChainId = string;

// Currently own definition of entities matches the ones from the SDK,
// but it could differentiate in the future and we should not couple with and import directly from the SDK definitions
export type {Token, ChainType, ExtendedChain as Chain } from '@lifi/sdk';
