import { TypographyLarge } from "@/components/ui/typography";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title: ReactNode;
}
export default function Section({ children, title }: SectionProps) {
  return (
    <section className="flex flex-col gap-8">
      <TypographyLarge className="text-4xl ">{title}</TypographyLarge>
      {children}
    </section>
  );
}
