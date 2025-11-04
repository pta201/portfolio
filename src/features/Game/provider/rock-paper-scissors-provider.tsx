"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createRockPaperScissorsStore } from "../stores/rock-paper-scissors.store";

export type RockPaperScissorsStoreApi = ReturnType<
  typeof createRockPaperScissorsStore
>;

export const RockPaperScissorsStoreContext = createContext<
  RockPaperScissorsStoreApi | undefined
>(undefined);

export interface RockPaperScissorsStoreProviderProps {
  children: ReactNode;
}

export const RockPaperScissorsStoreProvider = ({
  children,
}: RockPaperScissorsStoreProviderProps) => {
  const storeRef = useRef<RockPaperScissorsStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createRockPaperScissorsStore();
  }

  return (
    <RockPaperScissorsStoreContext.Provider value={storeRef.current}>
      {children}
    </RockPaperScissorsStoreContext.Provider>
  );
};

export const useRockPaperScissorsStore = () => {
  const rockPaperScissorsStoreContext = useContext(
    RockPaperScissorsStoreContext
  );

  if (!rockPaperScissorsStoreContext) {
    throw new Error(
      `useRockPaperScissorsStore must be used within RockPaperScissorsStoreProvider`
    );
  }

  return useStore(rockPaperScissorsStoreContext);
};

export default RockPaperScissorsStoreProvider;
