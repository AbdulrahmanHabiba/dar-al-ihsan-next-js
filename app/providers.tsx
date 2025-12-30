"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [quertClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Refresh every 5 minutes
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={quertClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
