import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RockPaperScissorsState = {
  winCount: number;
  drawCount: number;
  lossCount: number;
};

export type RockPaperScissorsActions = {
  increaseWin: () => void;
  increaseDraw: () => void;
  increaseLoss: () => void;
};

export type RockPaperScissorsStore = RockPaperScissorsState &
  RockPaperScissorsActions;

export const defaultInitState: RockPaperScissorsState = {
  winCount: 0,
  drawCount: 0,
  lossCount: 0,
};

export const createRockPaperScissorsStore = (
  initState: RockPaperScissorsState = defaultInitState
) => {
  return create<RockPaperScissorsStore>()(
    persist(
      (set) => ({
        ...initState,
        increaseWin: () => set((state) => ({ winCount: state.winCount + 1 })),
        increaseDraw: () =>
          set((state) => ({ drawCount: state.drawCount + 1 })),
        increaseLoss: () =>
          set((state) => ({ lossCount: state.lossCount + 1 })),
      }),
      {
        name: "rock-paper-scissors-store",
        version: 1,
      }
    )
  );
};
