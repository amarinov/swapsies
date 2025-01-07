import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TokenExchangeForm } from './components/token-exchange-form';
import { ErrorBoundary } from "react-error-boundary";
import { AppErrorFallback } from './components/app-error-fallback';
import Box from '@mui/material/Box';

const materialTheme = createTheme({
  colorSchemes: {
    light: true,
    dark: false,
  },
});

function App() {
  return (
    <ThemeProvider theme={materialTheme}>
      <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          minHeight="100vh"
        >
        <h1>Swapsies</h1>
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
          <TokenExchangeForm />
        </ErrorBoundary>
      </Box>
    </ThemeProvider>
  )
}

export default App;
