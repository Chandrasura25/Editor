import React from 'react';
import { ToolbarSection, ToolbarItem } from '../../editor';

export const VideoSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection title="Video">
        <ToolbarItem
          full={true}
          propKey="videoSrc"
          type="text"
          label="Video Source"
        />
      </ToolbarSection>
    </React.Fragment>
  );
};