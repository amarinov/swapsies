import {getTokens as sdkGetTokens} from '@lifi/sdk';
import { TokensResponse } from './types';
import { logger } from '../logging';

export async function getTokens(): Promise<TokensResponse> {
  try {
    const {tokens} = await sdkGetTokens();
    return tokens;
  } catch (error) {
    logger.error('Error fetching tokens from API', error);
    throw new Error('Error fetching tokens from API');
  }
}