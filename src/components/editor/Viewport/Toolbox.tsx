import { Element, useEditor } from "@craftjs/core";
import { Tooltip } from "@material-ui/core";
import { styled } from "styled-components";
import TypeSvg from "../../../public/icons/toolbox/text.svg";
import YoutubeSvg from "../../../public/icons/toolbox/video-line.svg";
import { Button } from "../../selectors/Button";
import { Container } from "../../selectors/Container";
import { Text } from "../../selectors/Text";
import { Video } from "../../selectors/Video";
const ButtonSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <title>S Button 18 N</title>
      <rect id="Canvas" opacity="0" />
      <path
        className="a"
        d="M13,4H5A5,5,0,0,0,5,14h8A5,5,0,0,0,13,4Zm0,9.05H5a4.05,4.05,0,0,1,0-8.1h8a4.05,4.05,0,0,1,0,8.1Z"
      />
      <path
        className="a"
        d="M13,6.05H5a2.95,2.95,0,0,0,0,5.9h8a2.95,2.95,0,0,0,0-5.9Z"
      />
    </svg>
  );
};
const SquareSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <title>S Rectangle 18 N</title>
      <rect id="Canvas" opacity="0" />
      <path
        className="a"
        d="M1,2.5v13a.5.5,0,0,0,.5.5h15a.5.5,0,0,0,.5-.5V2.5a.5.5,0,0,0-.5-.5H1.5A.5.5,0,0,0,1,2.5ZM16,15H2V3H16Z"
      />
    </svg>
  );
};
const ToolboxDiv = styled.div<{ $enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.$enabled ? `width: 0;` : "")}
  ${(props) => (!props.$enabled ? `opacity: 0;` : "")}
`;

const Item = styled.a<{ $move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.$move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      $enabled={enabled && enabled}
      className="toolbox transition w-12 h-full flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Tooltip title="Container" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" $move>
              <SquareSvg />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <Tooltip title="Text" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" $move>
              <img src={TypeSvg} alt="Type" />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
          <Tooltip title="Button" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" $move>
              <ButtonSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" $move>
              <img src={YoutubeSvg} alt="Video" />
            </Item>
          </Tooltip>
        </div>
      </div>
    </ToolboxDiv>
  );
};
