"use client";
import { PropsWithChildren } from "react";
import QueryClientProvider from "./qc-provider";
import { ThemeProvider } from "./theme-provider";

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
