import {getChains as sdkGetChains} from '@lifi/sdk';
import { logger } from "../logging";
import { ChainResponse } from './types';

export async function getChains(): Promise<ChainResponse> {
  try {
    return await sdkGetChains();
  } catch (error) {
    logger.error('Error fetching chains from API', error);
    throw new Error(`Error fetching chains from API. Reason: ${error}`);
  }
}