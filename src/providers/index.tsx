"use client";
import { NuqsAdapter } from "nuqs/adapters/next";
import { PropsWithChildren } from "react";
import QueryClientProvider from "./qc-provider";
import { ThemeProvider } from "./theme-provider";

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider>{children}</QueryClientProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
};

export default AppProvider;
