import { Button } from "@/components/ui/button";
import { TypographyLarge, TypographyMuted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRockPaperScissorsStore } from "../provider/rock-paper-scissors-provider";

const ROLLS = [
  {
    name: "rock",
    emoji: "🗿",
  },
  {
    name: "paper",
    emoji: "📃",
  },
  {
    name: "scissors",
    emoji: "✂️",
  },
];
const NAME_TO_EMOJI: Record<string, string> = {
  rock: "🗿",
  paper: "📃",
  scissors: "✂️",
} as const;
type RollName = (typeof ROLLS)[number]["name"];
type GameResult = "playerWin" | "computerWin" | "draw" | "fresh";

const getRandomRoll = () => {
  const randomIndex = Math.floor(Math.random() * ROLLS.length);
  return ROLLS[randomIndex].name;
};
const RockPaperScissors = () => {
  const {
    increaseLoss,
    increaseWin,
    lossCount,
    winCount,
    drawCount,
    increaseDraw,
  } = useRockPaperScissorsStore();
  const [computerCurrentRoll, setComputerCurrentRoll] =
    useState<RollName | null>(null);
  const [playerCurrentRoll, setPlayerCurrentRoll] = useState<RollName | null>(
    null
  );
  const [gameResult, setGameResult] = useState<GameResult>("fresh");
  const handlePick = (playerRoll: RollName) => {
    const computerNewRoll = getRandomRoll();
    if (playerRoll === computerNewRoll) {
      // It's a tie
      increaseDraw();
      setGameResult("draw");
    } else if (
      (playerRoll === "rock" && computerNewRoll === "scissors") ||
      (playerRoll === "paper" && computerNewRoll === "rock") ||
      (playerRoll === "scissors" && computerNewRoll === "paper")
    ) {
      // Player wins
      increaseWin();
      setGameResult("playerWin");
    } else {
      // Opponent wins
      increaseLoss();
      setGameResult("computerWin");
    }
    setComputerCurrentRoll(computerNewRoll);
    setPlayerCurrentRoll(playerRoll);
  };

  const resetGame = () => {
    setPlayerCurrentRoll(null);
    setComputerCurrentRoll(null);
    setGameResult("fresh");
  };

  return (
    <div>
      <div className="flex flex-col mb-4">
        <TypographyLarge className="text-2xl font-bold">
          Rock Paper Scissor
        </TypographyLarge>
        <TypographyMuted className="text-lg">
          🗡️<span className="text-green-600/60">{winCount}</span> - 🤝
          <span className="text-yellow-600/60">{drawCount}</span> - 🛡️
          <span className="text-red-600/60">{lossCount}</span>
        </TypographyMuted>
      </div>
      {/* Rock Paper Scissors Game */}
      <div className="flex flex-col gap-lg">
        <div className="flex flex-col gap-md">
          <div className="flex flex-col  items-center justify-center gap-md">
            <TypographyLarge className="text-xl font-semibold">
              Computer's Roll:{" "}
            </TypographyLarge>
            <IconContainer result={gameResult} isComputer={true}>
              {computerCurrentRoll ? NAME_TO_EMOJI[computerCurrentRoll] : "❓"}
            </IconContainer>
          </div>
        </div>
        <div className="flex flex-col gap-md">
          <div className="flex flex-col  items-center justify-center gap-md">
            <TypographyLarge className="text-xl font-semibold">
              Player's Roll:{" "}
            </TypographyLarge>
            <IconContainer result={gameResult}>
              {playerCurrentRoll ? NAME_TO_EMOJI[playerCurrentRoll] : "❓"}
            </IconContainer>
          </div>
          <div className="flex justify-center gap-lg w-full">
            {ROLLS.map((roll) => (
              <Button
                variant={"outline"}
                key={roll.name}
                onClick={() => handlePick(roll.name)}
              >
                {roll.emoji}
              </Button>
            ))}
            <Button onClick={resetGame}>Reset</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;

function IconContainer({
  children,
  className,
  result,
  isComputer = false,
}: {
  children: React.ReactNode;
  className?: string;
  result: GameResult;

  isComputer?: boolean;
}) {
  const winBg = "bg-green-300/70";
  const loseBg = "bg-red-300/70";
  const drawBg = "bg-yellow-300/70";
  const getBGClass = () => {
    if (result === "playerWin") {
      return isComputer ? loseBg : winBg;
    }
    if (result === "computerWin") {
      return isComputer ? winBg : loseBg;
    }
    if (result === "draw") {
      return drawBg;
    }

    return "bg-white";
  };

  return (
    <span
      className={cn(
        `text-3xl p-4 bg-white rounded-lg w-20 h-20 inline-flex items-center justify-center`,
        getBGClass(),
        className
      )}
    >
      {children}
    </span>
  );
}
