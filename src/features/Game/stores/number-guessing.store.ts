import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NumberGuessingState = {
  winCount: number;
  lossCount: number;
};

export type NumberGuessingActions = {
  increaseWin: () => void;
  increaseLoss: () => void;
};

export type NumberGuessingStore = NumberGuessingState & NumberGuessingActions;

export const defaultInitState: NumberGuessingState = {
  winCount: 0,
  lossCount: 0,
};

export const createNumberGuessingStore = (
  initState: NumberGuessingState = defaultInitState
) => {
  return create<NumberGuessingStore>()(
    persist(
      (set) => ({
        ...initState,
        increaseWin: () => set((state) => ({ winCount: state.winCount + 1 })),
        increaseLoss: () =>
          set((state) => ({ lossCount: state.lossCount + 1 })),
      }),
      {
        name: "number-guessing-store",
        version: 1,
      }
    )
  );
};
