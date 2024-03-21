import { Container } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/Home";

const queryClient = new QueryClient();

function App() {
 return (
  <QueryClientProvider client={queryClient}>
   <Container maxWidth='xl'>
    <Home />
   </Container>
  </QueryClientProvider>
 );
}

export default App;
