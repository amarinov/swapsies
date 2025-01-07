import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

export type AppErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export function AppErrorFallback({ error, resetErrorBoundary }: AppErrorFallbackProps) {
  // TODO: Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <Alert variant="filled" severity="error" action={
      <Button color="inherit" size="small" onClick={resetErrorBoundary}>
        Reload
      </Button>
    }>
      {error.message}
    </Alert>
  );
}