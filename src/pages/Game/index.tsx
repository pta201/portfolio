import { DraggableWindow } from "@/components/custom/dragable-window";
import DroppableZone from "@/components/custom/dropable-zone";
import {
  TypographyH1,
  TypographyLarge,
  TypographySmall,
} from "@/components/ui/typography";
import Container from "@/layout/Container";
import { DndContext, UniqueIdentifier } from "@dnd-kit/core";
import { Scroll, Search, X } from "lucide-react";
import { useState } from "react";
import NumberGuessing from "./components/NumberGuessing";
import RockPaperSiccors from "./components/RockPaperSiccors";
import TicTacToe from "./components/TicTacToe";

const items = [
  {
    id: "1",
    title: "Number Guessing",
    description: "Guess the number between 1 and 100",
    icon: Search,
    content: <NumberGuessing />,
  },
  {
    id: "2",
    title: "Rock Paper Scissors",
    description: "Play Rock Paper Scissors",
    icon: Scroll,
    content: <RockPaperSiccors />,
  },
  {
    id: "3",
    title: "Tic Tac Toe",
    description: "Play Tic Tac Toe",
    icon: X,
    content: <TicTacToe />,
  },
];
const initWindows = items.map((item, index) => ({
  ...item,
  x: Math.floor((0.5 + Math.random() * 0.5) * (index + 1) * 250),
  y: Math.floor((0.5 + Math.random() * 0.5) * 250),
}));

export default function Game() {
  const [activeWindowIds, setActiveWindowIds] = useState<string[]>([]);
  const [windows, setWindows] = useState(initWindows);
  const closeWindow = (id: string) => {
    setActiveWindowIds((prev) => prev.filter((window) => window !== id));
  };
  const openWindow = (id: string) => {
    setActiveWindowIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    setDraggingId(id);
  };
  const [draggingId, setDraggingId] = useState<UniqueIdentifier | null>(null);
  return (
    <div className="h-full text-foreground bg-primary/20  p-4">
      <DndContext
        onDragStart={(ev) => {
          setDraggingId(ev.active.id);
        }}
        onDragEnd={({ delta }) => {
          const { x, y } = delta;
          setWindows((prev) => {
            const newWindows = [...prev];
            const index = newWindows.findIndex(
              (window) => window.id === draggingId
            );
            if (index !== -1) {
              newWindows[index] = {
                ...newWindows[index],
                x: newWindows[index].x + x,
                y: newWindows[index].y + y,
              };
            }
            return newWindows;
          });
        }}
      >
        <DroppableZone id="droppable-zone">
          <Container className="flex justify-center items-center flex-col gap-8">
            <TypographyH1 className="text-lg mx-auto">
              Welcome to the game page!
            </TypographyH1>
            <TypographyLarge>Choose a game to play:</TypographyLarge>
            <ul className="grid grid-cols-2 *:md:grid-cols-3 gap-8">
              {items.map((item) => {
                return (
                  <li key={`button-${item.id}`}>
                    <button
                      className="w-[120px] h-[120px] flex flex-col justify-center  items-center border-2 border-primary/50 bg-accent/50 p-4 gap-4 rounded-lg hover:bg-primary/5 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
                      onClick={() => openWindow(item.id)}
                    >
                      <item.icon width={32} height={32} />
                      <TypographySmall>{item.title}</TypographySmall>
                    </button>
                  </li>
                );
              })}
            </ul>
            {windows.map((item) => {
              if (!activeWindowIds.includes(item.id)) {
                return null;
              }
              return (
                <DraggableWindow
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  content={item.content}
                  onClose={() => closeWindow(item.id)}
                  x={item.x}
                  y={item.y}
                  isActive={draggingId === item.id}
                  onClick={() => setDraggingId(item.id)}
                  className={"w-[600px]"}
                />
              );
            })}
            <p className="text-lg">More games coming soon!</p>
          </Container>
        </DroppableZone>
      </DndContext>
    </div>
  );
}
