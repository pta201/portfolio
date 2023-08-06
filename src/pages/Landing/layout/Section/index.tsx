import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title: ReactNode;
}
export default function Section({ children, title }: SectionProps) {
  return (
    <section>
      <h2 className="text-2xl uppercase text-center mb-6">{title}</h2>
      {children}
    </section>
  );
}
