"use client";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { useDraggable } from "@dnd-kit/react";
import { ReactNode, useRef } from "react";
import { useMountedState } from "react-use";
import ClientOnly from "./client-only";
interface DraggableWindowProps {
  title: string;
  onClose?: () => void;
  content: ReactNode;
  onDragStart: () => void;
  onDragEnd: () => void;
}
function DraggableWindow({
  title,
  onClose,
  onDragStart,
  onDragEnd,
  content,
}: Readonly<DraggableWindowProps>) {
  const isMounted = useMountedState();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { ref, draggable } = useDraggable({
    id: title,
    handle: headerRef,
    modifiers: [
      RestrictToElement.configure({
        element: (isMounted() && window?.document.body) || null,
      }),
    ],
  });
  const itemStyle = draggable.alignment
    ? {
        transform: `translate3d(${draggable.alignment.x}px, ${draggable.alignment.y}px, 0)`,
      }
    : {};
  return (
    <ClientOnly>
      <div
        ref={ref}
        style={itemStyle}
        className="window w-min-[300px] h-min-[300px] bg-accent shadow-lg rounded-lg  border border-primary/50 overflow-hidden"
      >
        <div
          ref={headerRef}
          className="window-header px-4 py-2 flex items-center justify-between bg-accent text-accent-foreground rounded-t-lg border-b border-foreground/50"
        >
          <span className="window-title text-xl">{title}</span>
          <button className="window-close-button" onClick={onClose}>
            [X]
          </button>
        </div>
        <div className="bg-primary/20 p-4 overflow-auto max-h-[20rem]">
          {content}
        </div>
      </div>
    </ClientOnly>
  );
}

export { DraggableWindow };
