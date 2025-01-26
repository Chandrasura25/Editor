import React, { useRef } from "react";
import { ToolbarSection, ToolbarItem } from "../../editor";
import { ToolbarRadio } from "../../editor/Toolbar/ToolbarRadio";
import { useEditor } from "@craftjs/core";
export const ImageSettings = () => {
    return (
      <React.Fragment>
        <ToolbarSection
          title="Image Upload"
          props={["src"]}
          summary={({ src }: any) => (src ? "Image Uploaded" : "No Image Uploaded")}
        >
          <div className="w-full h-full">
            <FileUploader propKey="src" label="Upload or Drop Image" />
          </div>
        </ToolbarSection>
        <ToolbarSection title="Dimensions" props={["width", "height"]}>
          <ToolbarItem propKey="width" type="text" label="Width" />
          <ToolbarItem propKey="height" type="text" label="Height" />
        </ToolbarSection>
        <ToolbarSection title="Position" props={["margin", "padding"]}>
        <ToolbarItem propKey="margin" index={0} type="slider" label="Top Margin" />
        <ToolbarItem propKey="margin" index={1} type="slider" label="Right Margin" />
        <ToolbarItem propKey="margin" index={2} type="slider" label="Bottom Margin" />
        <ToolbarItem propKey="margin" index={3} type="slider" label="Left Margin" />
        <ToolbarItem propKey="padding" index={0} type="slider" label="Top Padding" />
        <ToolbarItem propKey="padding" index={1} type="slider" label="Right Padding" />
        <ToolbarItem propKey="padding" index={2} type="slider" label="Bottom Padding" />
        <ToolbarItem propKey="padding" index={3} type="slider" label="Left Padding" />
      </ToolbarSection>
        <ToolbarSection title="Appearance" props={["opacity", "radius", "shadow", "objectFit"]}>
          <ToolbarItem propKey="opacity" type="slider" label="Opacity" />
          <ToolbarItem propKey="radius" type="slider" label="Border Radius" />
          <ToolbarItem propKey="shadow" type="slider" label="Shadow" />
          <ToolbarItem propKey="objectFit" type="radio" label="Object Fit">
            <ToolbarRadio value="cover" label="Cover" />
            <ToolbarRadio value="contain" label="Contain" />
            <ToolbarRadio value="fill" label="Fill" />
          </ToolbarItem>
        </ToolbarSection>
      </React.Fragment>
    );
  };
  
  export const FileUploader = ({ propKey, label }: { propKey: string; label: string }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { actions } = useEditor();
  
    const handleFile = (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        actions.setProp(propKey, dataUrl);
      };
      reader.readAsDataURL(file);
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) handleFile(file);
    };
  
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      if (file) handleFile(file);
    };
  
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };
  
    return (
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-dashed border-2 border-gray-400 p-4 rounded-md text-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <p>{label}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    );
  };
  