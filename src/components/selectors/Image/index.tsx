import React, { useRef } from "react";
import { useNode } from "@craftjs/core";
import { styled } from "styled-components";
import { ImageSettings } from "./ImageSettings";

const ImageDiv = styled.div<{
  $padding: number[];
  $margin: number[];
  $opacity: number;
  $radius: number;
  $shadow: number;
  $objectFit: string;
  $isBackground: boolean;
  $src: string;
  $width: string;
  $height: string;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => ($height ? `${$height}px` : "auto")};
  margin: ${({ $margin }) =>
    `${$margin[0]}px ${$margin[1]}px ${$margin[2]}px ${$margin[3]}px`};
  padding: ${({ $padding }) =>
    `${$padding[0]}px ${$padding[1]}px ${$padding[2]}px ${$padding[3]}px`};
  opacity: ${({ $opacity }) => $opacity};
  border-radius: ${({ $radius }) => `${$radius}px`};
  box-shadow: ${({ $shadow }) =>
    $shadow === 0 ? "none" : `0px 3px 10px ${$shadow}px rgba(0, 0, 0, 0.13)`};
  background-image: ${({ $isBackground, $src }) =>
    $isBackground && $src ? `url(${$src})` : "none"};
  background-size: ${({ $objectFit }) => $objectFit};
  background-repeat: no-repeat;
  display: ${({ $isBackground }) => ($isBackground ? "block" : "flex")};
  justify-content: ${({ $isBackground }) => ($isBackground ? "unset" : "center")};
  align-items: ${({ $isBackground }) => ($isBackground ? "unset" : "center")};
  overflow: hidden;

  img {
    display: ${({ $isBackground }) => ($isBackground ? "none" : "block")};
    max-width: 100%;
    max-height: 100%;
    object-fit: ${({ $objectFit }) => $objectFit};
  }
`;

export const Image = ({
  isBackground,
  src,
  width,
  height,
  margin,
  padding,
  opacity,
  radius,
  shadow,
  objectFit,
  children,
}: {
  isBackground: boolean;
  src: string;
  width: string;
  height: string;
  margin: number[];
  padding: number[];
  opacity: number;
  radius: number;
  shadow: number;
  objectFit: string;
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setProp((props: any) => (props.src = dataUrl));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setProp((props: any) => (props.src = dataUrl));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <ImageDiv
      ref={connect}
      $padding={padding}
      $margin={margin}
      $opacity={opacity}
      $radius={radius}
      $shadow={shadow}
      $objectFit={objectFit}
      $isBackground={isBackground}
      $src={src}
      $width={width}
      $height={height}
      onDragOver={handleDragOver}
      onDrop={handleFileDrop}
    >
      {!isBackground && src && <img src={src} alt="Uploaded" />}
      {!src && (
        <div
          className="border-dashed border-2 border-gray-400 p-4 rounded-md text-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <p className="text-gray-500">Drop an image file here or click to upload</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
      )}
      {children}
    </ImageDiv>
  );
};

Image.craft = {
  displayName: "Image",
  props: {
    isBackground: false,
    src: "",
    width: "100%",
    height: "auto",
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    opacity: 1,
    radius: 0,
    shadow: 0,
    objectFit: "cover",
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ImageSettings,
  },
};

