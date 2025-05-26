"use client";
import { QueryClientProvider as QCProvider } from "@tanstack/react-query";
import type * as React from "react";
import { getQueryClient } from "./get-client";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return <QCProvider client={queryClient}>{children}</QCProvider>;
}
