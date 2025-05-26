import { TypographyLead, TypographyMuted } from "@/components/ui/typography";
import { siteConfig } from "@/constants/config/site";
export default function About() {
  return (
    <div className="flex flex-col gap-4">
      {siteConfig.user.about.map((item) => (
        <div key={item.title}>
          <TypographyLead className="text-primary">{item.title}</TypographyLead>
          <TypographyMuted className="ml-4">{item.content}</TypographyMuted>
        </div>
      ))}
    </div>
  );
}
