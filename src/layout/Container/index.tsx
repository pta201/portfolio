import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
}

const Container = ({
  children,
  className,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <div className={cn("max-w-(--breakpoint-lg) mx-auto ", className)}>
      {children}
    </div>
  );
};

export default Container;
