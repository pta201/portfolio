import AppImage from "@/components/custom/app-image";
import { DraggableWindow } from "@/components/custom/dragable-window";
import DroppableZone from "@/components/custom/dropable-zone";
import AnimatedText from "@/components/ui/AnimatedText";
import Signature from "@/components/ui/Signature";
import { TypographyLarge, TypographyLead } from "@/components/ui/typography";
import { siteConfig } from "@/constants/config/site";
import About from "@/pages/Landing/components/About";
import Experience from "@/pages/Landing/components/Experience";
import MainHeader from "@/pages/Landing/layout/MainHeader";
import { DragDropProvider } from "@dnd-kit/react";
import Project from "./components/Project";
export default function Landing() {
  // const [activeDraggable, setActiveDraggable] = useState(null);
  return (
    <>
      <div className="sticky top-0 opacity-95">
        <MainHeader />
      </div>
      <DragDropProvider
        onDragStart={(ev) => {
          console.log("drag start", ev);
        }}
        onDragEnd={(ev) => {
          console.log("drag end", ev);
        }}
      >
        <DroppableZone id="droppable-zone">
          <main className="min-h-screen text-foreground bg-primary/20  p-4">
            <div className="flex flex-col gap-12 max-w-(--breakpoint-lg) mx-auto ">
              <section className="flex gap-4 flex-wrap-reverse justify-between">
                <div className="flex flex-col gap-4 flex-3/5">
                  <TypographyLarge>
                    <AnimatedText
                      text={`Hello there! Welcome to my personal page`}
                      className="text-3xl"
                    />
                  </TypographyLarge>
                  <TypographyLead>{siteConfig.user.describe}</TypographyLead>
                </div>
                <div>
                  <Signature />
                </div>
              </section>

              <DraggableWindow
                title="About"
                content={
                  <div className="flex items-center justify-center  md:justify-between md:gap-4 text-left flex-wrap-reverse">
                    <About />
                    <div className="rounded-full overflow-hidden">
                      <AppImage
                        src={siteConfig.user.github}
                        width={"200"}
                        height={"200"}
                        alt="user-avatar"
                      />
                    </div>
                  </div>
                }
                onDragStart={function (): void {
                  throw new Error("Function not implemented.");
                }}
                onDragEnd={function (): void {
                  throw new Error("Function not implemented.");
                }} // onClose={() => {}}
              />

              <DraggableWindow
                title="Projects"
                content={<Project />}
                onDragStart={function (): void {
                  throw new Error("Function not implemented.");
                }}
                onDragEnd={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />

              <DraggableWindow
                title="Experience"
                content={<Experience />}
                onDragStart={function (): void {
                  throw new Error("Function not implemented.");
                }}
                onDragEnd={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </main>
        </DroppableZone>
      </DragDropProvider>
    </>
  );
}
