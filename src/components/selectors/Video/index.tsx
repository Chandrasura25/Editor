import React, { useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { styled } from 'styled-components';
import { VideoSettings } from './VideoSettings';

const VideoDiv = styled.div<{ $enabled: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
  border: ${(props) => (props.$enabled ? '2px dashed #aaa' : 'none')};
  position: relative;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: ${(props) => (props.$enabled ? 'none' : 'auto')};
  }

  input {
    display: none;
  }

  .placeholder {
    display: ${(props) => (props.$enabled ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    color: #666;
    font-size: 16px;
  }
`;

export const Video = (props: any) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const [videoSrc, setVideoSrc] = useState(props.videoSrc || '');

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <VideoDiv
      ref={(ref) => ref && connect(ref)}
      $enabled={enabled}
      onDragOver={preventDefault}
      onDrop={handleDrop}
    >
      {videoSrc ? (
        <video src={videoSrc} controls />
      ) : (
        <div className="placeholder">
          <label htmlFor="video-upload">Drop a video file here or click to upload</label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
          />
        </div>
      )}
    </VideoDiv>
  );
};

Video.craft = {
  displayName: 'Video',
  props: {
    videoSrc: '',
  },
  related: {
    toolbar: VideoSettings,
  },
};