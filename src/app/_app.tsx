import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../../components/header/Header";
import "./globals.css";
import Home from "./page";

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
