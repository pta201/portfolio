import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/constants/config/site";
export default function FAQ() {
  const email = siteConfig.user.email;
  const emailSubject = "Hello!";
  const emailBody = "Hi! I would love to hear from you!";
  const faqItems = [
    {
      id: 1,
      question: "What is this?",
      answer: "This is a simple FAQ section.",
    },
  ];
  return (
    <section className="flex flex-col gap-8">
      <Accordion type="single" collapsible>
        {faqItems.map((faq) => (
          <AccordionItem key={faq.id} value={`item-${faq.id}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
