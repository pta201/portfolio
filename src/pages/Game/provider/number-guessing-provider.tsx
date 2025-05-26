"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createNumberGuessingStore } from "../stores/number-guessing.store";

export type NumberGuessingStoreApi = ReturnType<
  typeof createNumberGuessingStore
>;

export const NumberGuessingStoreContext = createContext<
  NumberGuessingStoreApi | undefined
>(undefined);

export interface NumberGuessingStoreProviderProps {
  children: ReactNode;
}

export const NumberGuessingStoreProvider = ({
  children,
}: NumberGuessingStoreProviderProps) => {
  const storeRef = useRef<NumberGuessingStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createNumberGuessingStore();
  }

  return (
    <NumberGuessingStoreContext.Provider value={storeRef.current}>
      {children}
    </NumberGuessingStoreContext.Provider>
  );
};

export const useNumberGuessingStore = () => {
  const numberGuessingStoreContext = useContext(NumberGuessingStoreContext);

  if (!numberGuessingStoreContext) {
    throw new Error(
      `useNumberGuessingStore must be used within NumberGuessingStoreProvider`
    );
  }

  return useStore(numberGuessingStoreContext);
};
