"use client";
import { PropsWithChildren } from "react";
import { NumberGuessingStoreProvider } from "./number-guessing-provider";
import { RockPaperScissorsStoreProvider } from "./rock-paper-scissors-provider";

const Providers = [NumberGuessingStoreProvider, RockPaperScissorsStoreProvider];
const GameProvider = ({ children }: PropsWithChildren) => {
  const store = Providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
  return <>{store}</>;
};

export default GameProvider;
