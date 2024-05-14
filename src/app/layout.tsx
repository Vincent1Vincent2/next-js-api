"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../../components/header/Header";
import "../app/globals.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
