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
            staleTime: 1000 * 60 * 60 * 6, // Refresh every 6 hours
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            refetchOnMount: true, // true
            refetchOnWindowFocus: false, // false
            refetchOnReconnect: false, // false
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
