import { Button } from "@/components/ui/button";
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNumberGuessingStore } from "../provider/number-guessing-provider";

interface Props {}

export const metadata = {
  title: "Number Guessing",
  description: "Number Guessing Game",
};
const initNumber = () => Math.floor(Math.random() * 100) + 1;
const maxAttempts = 10;

const NumberGuessing = (props: Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      guess: 0,
    },
  });
  const [numberToGuess, setNumberToGuess] = useState(initNumber());
  const [attempts, setAttempts] = useState(maxAttempts);
  const [message, setMessage] = useState<string>("");
  const [gameOver, setGameOver] = useState(false);
  const [isCorrected, setIsCorrected] = useState(false);

  const { increaseLoss, increaseWin, lossCount, winCount } =
    useNumberGuessingStore();
  const handleGuess = (data: any) => {
    if (gameOver) {
      setMessage("Game Over! Please start a new game.");
      return;
    }
    const userGuess = parseInt(data.guess);
    if (userGuess === numberToGuess) {
      setGameOver(true);
      setIsCorrected(true);

      setMessage("Congratulations! You guessed the number!");

      handleGameOver(true);
    } else {
      setAttempts((prev) => prev - 1);
      setIsCorrected(false);

      if (attempts <= 1) {
        setGameOver(true);
        setMessage(`Game Over! The number was ${numberToGuess}`);

        handleGameOver(false);
      } else {
        setMessage(
          userGuess < numberToGuess
            ? "Your guess is too low"
            : "Your guess is too high"
        );
      }
    }
  };
  const handleGameOver = (isWin: boolean) => {
    if (!isWin) return increaseLoss();
    return increaseWin();
  };

  const handleReset = () => {
    setMessage("Let's make our guess");
    setGameOver(false);
    setAttempts(maxAttempts);
    setNumberToGuess(initNumber());
  };

  const shouldShowCat = attempts !== maxAttempts;

  const getCat = () => {
    if (!shouldShowCat) return null;
    return <Cat isSuccess={isCorrected} />;
  };
  return (
    <div className="relative">
      <div className="flex flex-col mb-12">
        <TypographyLarge className="text-2xl font-bold">
          Number Guessing{" "}
          <TypographyMuted>(Aquired {winCount} 🏆 )</TypographyMuted>
        </TypographyLarge>
        <TypographySmall className="text-lg">
          Guess the number between 1 and 100
        </TypographySmall>
      </div>
      <div className="flex justify-between my-4">
        <TypographyLarge>{message}</TypographyLarge>
        <TypographyMuted className="text-lg">
          Remaining attempt: {attempts}
        </TypographyMuted>
      </div>
      <div className="opacity-0">{numberToGuess}</div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleGuess)}
      >
        <input
          type="number"
          placeholder="Enter your guess"
          className="border p-2 bg-accent"
          min={1}
          max={100}
          {...register("guess")}
        />
        <div className="flex w-full gap-4">
          <Button className="basis-[80%] p-4" type="submit" size={"lg"}>
            Submit
          </Button>
          <Button
            size={"lg"}
            className="flex-1 p-4"
            type="reset"
            onClick={() => handleReset()}
            variant={"secondary"}
          >
            <RefreshCcw />
          </Button>
        </div>
      </form>
      <div className="absolute top-0 right-0 w-[100px] h-[100px] rounded-md overflow-hidden">
        {getCat()}
      </div>
    </div>
  );
};
export default NumberGuessing;

const CATS = {
  NoNo: "https://giphy.com/embed/nR4L10XlJcSeQ",
  YesYes: "https://giphy.com/embed/Opgs8NUosTAnRSFYzc",
};
function Cat({ isSuccess }: { isSuccess: boolean }) {
  const url = isSuccess ? CATS.YesYes : CATS.NoNo;

  return (
    <iframe
      title="cat-gif"
      src={url}
      width="100%"
      height="100%"
      className="giphy-embed"
      allowFullScreen
    ></iframe>
  );
}
