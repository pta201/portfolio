"use client";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
interface DraggableWindowProps {
  title: string;
  onClose?: () => void;
  content: ReactNode;
  id: string;
  x: number;
  y: number;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  contentCn?: string;
}
function DraggableWindow({
  title,
  onClose,
  id,
  x,
  y,
  content,
  isActive = false,
  onClick,
  className,
  contentCn,
}: Readonly<DraggableWindowProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    top: y,
    left: x,
  };

  return (
    <dialog
      aria-labelledby="window-title"
      ref={setNodeRef}
      className={cn(
        "window  bg-accent shadow-lg rounded-lg  border border-primary/50 overflow-hidden absolute",
        isActive ? "z-10" : "z-0",
        className
      )}
      style={style}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      open
    >
      <div className="relative">
        <div
          className="window-header px-4 py-2 flex items-center justify-between bg-accent text-accent-foreground rounded-t-lg border-b border-foreground/50 relative "
          {...listeners}
          {...attributes}
        >
          <span className="window-title text-xl">{title}</span>
        </div>
        <button
          className="window-close-button absolute right-2 top-2 hover:scale-110 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          [ X ]
        </button>
        <div
          className={cn(
            "bg-primary/20 p-4 overflow-auto max-h-[20rem]",
            contentCn
          )}
        >
          {content}
        </div>
      </div>
    </dialog>
  );
}

export { DraggableWindow };
