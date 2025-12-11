import AppImage from "@/components/custom/app-image";
import { DraggableWindow } from "@/components/custom/dragable-window";
import DroppableZone from "@/components/custom/dropable-zone";
import AnimatedText from "@/components/ui/AnimatedText";
import Signature from "@/components/ui/Signature";
import { TypographyLarge, TypographySmall } from "@/components/ui/typography";
import { siteConfig } from "@/constants/config/site";
import About from "@/features/Landing/components/About";
import Experience from "@/features/Landing/components/Experience";
import { DndContext, UniqueIdentifier } from "@dnd-kit/core";

import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import Container from "@/layout/Container";
import { BriefcaseBusiness, Info, Mail, Pickaxe } from "lucide-react";
import { useState } from "react";
import Contact from "./components/Contact";
import Model from "./components/Model";
import Project from "./components/Project";

const items = [
  {
    id: "1",
    title: "About",
    content: (
      <div className="flex items-center justify-center  md:justify-between md:gap-4 text-left flex-wrap-reverse">
        <About />
        <div className="rounded-full overflow-hidden hover:brightness-110">
          <AppImage
            src={siteConfig.user.avatar}
            width={"200"}
            height={"200"}
            alt="user-avatar"
          />
        </div>
      </div>
    ),
    icon: Info,
  },
  {
    id: "2",
    title: "Projects",
    content: <Project />,
    icon: BriefcaseBusiness,
    className: "w-[50rem]",
  },
  {
    id: "3",
    title: "Experience",
    content: <Experience />,
    icon: Pickaxe,
  },
  {
    id: "4",
    title: "Contact",
    content: <Contact />,
    icon: Mail,
  },
  // {
  //   id: "5",
  //   title: "FAQ",
  //   content: <FAQ />,
  //   icon: BsQuestionCircle,
  // },
];
const initWindows = items.map((item, index) => ({
  ...item,
  x: Math.floor((0.5 + Math.random() * 0.5) * (index + 1) * 250),
  y: Math.floor((0.5 + Math.random() * 0.5) * 250),
}));

export default function Landing() {
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
        <main className="grid h-full text-foreground bg-primary/20 p-4">
          <Container>
            <section className="flex flex-col gap-8 justify-center items-center">
              <header className="flex gap-4 flex-wrap-reverse justify-between">
                <div className="flex flex-col gap-4 flex-3/5">
                  <TypographyLarge className="flex gap-2 items-center">
                    <div className="animate-wiggle animate-infinite animate-ease-in-out text-4xl">
                      👋
                    </div>
                    <AnimatedText text={`Hello there!`} className="text-4xl" />
                  </TypographyLarge>

                  {siteConfig.user.describe.map((item) => (
                    <TypographySmall
                      key={item}
                      className="text-lg animate-fade-right animate-duration-1000 text-primary"
                    >
                      {item}
                    </TypographySmall>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Signature />
                  <Model />
                </div>
              </header>

              <div className="flex gap-8">
                {items.map((item) => {
                  return (
                    <button
                      className="text-accent-foreground rounded-lg px-4 py-2 hover:scale-105 transition-all w-36  h-36 flex items-center justify-center flex-col cursor-pointer"
                      key={`button-${item.id}`}
                      onClick={() => openWindow(item.id)}
                    >
                      <item.icon className="w-12 h-12" />
                      <TypographyLarge>{item.title}</TypographyLarge>
                    </button>
                  );
                })}
              </div>
            </section>

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
                  className={item.className}
                />
              );
            })}
          </Container>
          <footer className="absolute bottom-0 left-0 right-0 ">
            <SpotifyNowPlaying />
          </footer>
        </main>
      </DroppableZone>
    </DndContext>
  );
}
