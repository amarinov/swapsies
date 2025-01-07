import TextField from "@mui/material/TextField";
import { TokenSelect } from "../token-select";
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { Chain, Token } from "../../types/entities";
import { getCheapestRoute } from "../../services/api/bridging";
import { BridgingRoute } from "../../services/api/types";
import { useErrorBoundary } from "react-error-boundary";

type ChainTokenPair = {
  chain: Chain | null;
  token: Token | null;
}

export function TokenExchangeForm() {
  const { showBoundary: showError } = useErrorBoundary();
  const [source, setSource] = useState<ChainTokenPair>({ chain: null, token: null });
  const [destination, setDestination] = useState<ChainTokenPair>({ chain: null, token: null });
  const [amount, setAmount] = useState<number | null>(null);
  const [route, setRoute] = useState<BridgingRoute | undefined>(undefined);
  const [routeLoading, setRouteLoading] = useState<boolean>(false);

  // TODO: Replace with object model validation and form control library, e.g. react-hook-forms + yup or zod
  const formComplete = source.chain && source.token && destination.chain && destination.token && !!amount;

  useEffect(() => {
    if (formComplete) {
      async function fetchRoute() {
        const route = await getCheapestRoute({
          fromChainId: source.chain!.id,
          fromAmount: amount!,
          fromTokenAddress: source.token!.address,
          toChainId: destination.chain!.id,
          toTokenAddress: destination.token!.address
        });

        setRoute(route);
      }

      setRoute(undefined);
      setRouteLoading(true);
      
      fetchRoute().catch((error) => {
        showError(error);
      }).finally(() => {
        setRouteLoading(false);
      });
    }
  }, [source, destination, amount, formComplete, showError]);

  return (
    <Stack component="form" spacing={2}>
      <TokenSelect label="Source chain and token" onChange={(chain, token) => setSource({ chain, token })} />
      <TokenSelect label="Destination chain and token" onChange={(chain, token) => setDestination({ chain, token })} />
      <TextField type="number" label="Amount to send" placeholder="0.0" onChange={(event) => {
        const value = parseFloat(event.target.value);
        setAmount(isNaN(value) ? null : value);
      }} />

      {route && (
        <Stack spacing={2}>
          <div>Cheapest route:</div>
          <div>From: {source.chain?.name} ({source.token?.name})</div>
          <div>To: {destination.chain?.name} ({destination.token?.name})</div>
          <div>Route steps:</div>
          <ol>{route.steps.map(step => (
            <li key={step.id}>
              Name: {step.toolDetails.name}, Duration: {step.estimate.executionDuration} seconds <br />
              Fee costs:
              {step.estimate.feeCosts?.length ?
                <ul>
                  {step.estimate.feeCosts.map((feeCost, index) => <li key={index}>{feeCost.name} - {feeCost.amountUSD}</li>)}
                </ul> : " N/A"
              }
            </li>
          ))}</ol>
        </Stack>
      )}
      {routeLoading && <div>Loading routes...</div>}
      {/* TODO: Add reload/retry button */}
      {!route && formComplete && !routeLoading && <div>No route was found.</div>}
    </Stack>
  );
}