import { TypographyH2 } from "@/components/ui/typography";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title: ReactNode;
}
export default function Section({ children, title }: SectionProps) {
  return (
    <section>
      <TypographyH2 className="text-center mb-6">{title}</TypographyH2>
      {children}
    </section>
  );
}
