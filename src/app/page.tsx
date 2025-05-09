"use client";
import ClientOnly from "@/components/custom/client-only";
import Landing from "@/pages/Landing";
export default function Home() {
  return (
    <ClientOnly>
      <Landing />
    </ClientOnly>
  );
}
