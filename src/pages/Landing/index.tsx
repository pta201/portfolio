import AnimatedText from "@/components/ui/AnimatedText";
import Signature from "@/components/ui/Signature";
import { siteConfig } from "@/constants/config/site";
import About from "@/pages/Landing/components/About";
import Experience from "@/pages/Landing/components/Experience";
import MainHeader from "@/pages/Landing/layout/MainHeader";
import Image from "next/image";
import Project from "./components/Project";
import Section from "./layout/Section";
export default function Landing() {
  return (
    <>
      <div className="sticky top-0 opacity-95">
        <MainHeader />
      </div>
      <main className="min-h-screen  text-white bg-black p-4">
        <div className="flex flex-col gap-12 max-w-(--breakpoint-lg) mx-auto text-center">
          <section className="flex gap-4 flex-wrap-reverse justify-center">
            <div className="">
              <p className="text-xl">
                <AnimatedText
                  text={`Hi! This is ${siteConfig.user.name}`}
                  className="text-3xl"
                />
                {siteConfig.user.describe}
              </p>
            </div>
            <div className="w-[200px]">
              <Signature />
            </div>
          </section>

          <Section title="About">
            <div className="flex items-center justify-center  md:justify-between md:gap-4 text-left flex-wrap-reverse">
              <About />

              <div className="rounded-full overflow-hidden">
                <Image
                  src={siteConfig.user.github}
                  width={"300"}
                  height={"300"}
                  alt="user-avatar"
                />
              </div>
            </div>
          </Section>

          <Section title="Projects">
            <div className="flex flex-col">
              <Project />
            </div>
          </Section>
          <Section title="Experience">
            <div className="flex flex-col justify-center">
              <Experience />
            </div>
          </Section>
        </div>
      </main>
    </>
  );
}
