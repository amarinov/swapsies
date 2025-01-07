import {getRoutes as sdkGetRoutes} from '@lifi/sdk';
import { logger } from "../logging";
import { BridgingRoute, GetRoutesParams } from './types';

const AMOUNT_MULTIPLIER = 100_000_000;

export async function getCheapestRoute(params: GetRoutesParams): Promise<BridgingRoute | undefined> {
  try {
    const {routes} = await sdkGetRoutes({
      ...params,
      fromAmount: String(params.fromAmount*AMOUNT_MULTIPLIER)
    });

    const cheapestRoute = routes.find(route => route.tags?.includes('CHEAPEST'));
    return cheapestRoute;
  } catch (error) {
    logger.error('Error fetching routes from API', error);
    throw new Error('Error fetching routes from API');
  }
}