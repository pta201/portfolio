"use client";
import { PropsWithChildren } from "react";
import { NumberGuessingStoreProvider } from "./number-guessing-provider";

const GameProvider = ({ children }: PropsWithChildren) => {
  return <NumberGuessingStoreProvider>{children}</NumberGuessingStoreProvider>;
};

export default GameProvider;
