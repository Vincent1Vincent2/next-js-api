import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/header/Header";
import "./globals.css";

const queryClient = new QueryClient();

const Index = ({}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
    </QueryClientProvider>
  );
};

export default Index;
