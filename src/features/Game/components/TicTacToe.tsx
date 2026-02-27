import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface Props {}

type Player = "X" | "O" | null;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (squares: Player[]) => {
  for (const [a, b, c] of WIN_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] as number[] };
    }
  }
  if (squares.every(Boolean)) return { winner: null, line: [] }; // draw
  return null;
};

const Square: React.FC<{
  value: Player;
  onClick: () => void;
  highlight?: boolean;
}> = ({ value, onClick, highlight }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        fontSize: 32,
        fontWeight: 700,
        cursor: value ? "default" : "pointer",
        background: highlight ? "#ffd54f" : "#fff",
        border: "1px solid #333",
        outline: "none",
      }}
    >
      {value}
    </Button>
  );
};

const TicTacToe: React.FC<Props> = () => {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = calculateWinner(squares);
  const winner = result?.winner ?? null;
  const winningLine = result?.line ?? [];

  const handleClick = (i: number) => {
    if (squares[i] || winner !== null) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const status =
    winner === "X" || winner === "O"
      ? `Winner: ${winner}`
      : result && winner === null
      ? "Draw"
      : `Next: ${xIsNext ? "X" : "O"}`;

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Roboto, sans-serif",
        display: "inline-block",
      }}
    >
      <div style={{ marginBottom: 8 }}>{status}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          gap: 0,
        }}
      >
        {squares.map((val, i) => (
          <Square
            key={i}
            value={val}
            onClick={() => handleClick(i)}
            highlight={winningLine.includes(i)}
          />
        ))}
      </div>

      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <Button
          onClick={restart}
          style={{ padding: "6px 12px", cursor: "pointer" }}
        >
          Restart
        </Button>
      </div>
    </div>
  );
};

export default TicTacToe;
