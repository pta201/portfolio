"use client";
import NextImage, {
  ImageLoaderProps,
  ImageProps as NextImageProps,
} from "next/image";
interface Props extends Omit<NextImageProps, "loader"> {}

const imageLoader = ({ src, width, quality = 100 }: ImageLoaderProps) => {
  return `https://wsrv.nl/?url=${src}&w=${width}&q=${quality}&output=webp`;
};
const AppImage = (props: Props) => {
  return (
    <NextImage
      {...props}
      className={`rounded-lg object-cover ${props.className}`}
      loader={imageLoader}
      alt={props.alt || ""}
      width={props.width ?? 300}
      height={props.height ?? 300}
    />
  );
};

export default AppImage;
