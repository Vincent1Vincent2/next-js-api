import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GuestHeader from "../../components/header/GuestHeader";
import "./globals.css";
import Home from "./page";

const queryClient = new QueryClient();

const Index = ({}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GuestHeader />
      <Home />
    </QueryClientProvider>
  );
};

export default Index;
