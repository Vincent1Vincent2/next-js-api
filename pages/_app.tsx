import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from ".";
import "./globals.css";

const queryClient = new QueryClient();

const Index = ({}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default Index;
