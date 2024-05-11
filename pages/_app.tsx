import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from ".";
import Header from "../components/header/Header";
import "./globals.css";

const queryClient = new QueryClient();

const Index = ({}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Home />
    </QueryClientProvider>
  );
};

export default Index;
