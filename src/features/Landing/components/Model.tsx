import View3D, { ARButton } from "@egjs/react-view3d";
import "@egjs/react-view3d/css/view3d-bundle.min.css";
import "@egjs/view3d/css/view3d-bundle.min.css";
import { useEffect, useRef } from "react";
interface Props {}

const Model = (props: Props) => {
  const ref = useRef<View3D | null>(null);
  useEffect(() => {
    ref.current?.loadPlugins(new ARButton());

    const handleResize = () => {
      ref.current?.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <View3D
        ref={ref}
        className="w-[300px] h-[300px]"
        src="/beemo.glb"
        webAR={true}
        initialZoom={0}
        yaw={0}
        pitch={5}
        onReady={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
};
export default Model;
