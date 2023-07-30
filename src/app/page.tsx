import MainHeader from "@/components/layout/MainHeader";
import AnimatedText from "@/components/ui/AnimatedText";
import Signature from "@/components/ui/Signature";
import { siteConfig } from "../constants/config/site";
export default function Home() {
  return (
    <>
      <MainHeader />
      <main className="flex min-h-screen flex-col items-center justify-between text-white bg-black p-4">
        <div className="flex justify-between">
          <section className="flex gap-4 flex-wrap-reverse justify-center">
            <div className="w-1/2">
              <AnimatedText
                text={`Hi! This is ${siteConfig.user.name}`}
                className="text-3xl"
              />
              <p className="text-xl text-justify">{siteConfig.user.describe}</p>
            </div>
            <div className="w-[200px]">
              <Signature />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
