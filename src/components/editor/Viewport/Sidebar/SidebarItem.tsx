import React from "react";
import { styled } from "styled-components";

const Arrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
      <title>ChevronDownMedium</title>
      <rect id="ToDelete" fill="#ff13dc" opacity="0" />
      <path d="M9.99,1.01A.9999.9999,0,0,0,8.28266.30327L5,3.58594,1.71734.30327A.9999.9999,0,1,0,.30327,1.71734L4.29266,5.69673a.99965.99965,0,0,0,1.41468,0L9.69673,1.71734A.99669.99669,0,0,0,9.99,1.01Z" />
    </svg>
  );
};

const SidebarItemDiv = styled.div<{ $visible?: boolean; $height?: string }>`
  height: ${(props) =>
    props.$visible && props.$height && props.$height !== "full"
      ? `${props.$height}`
      : "auto"};
  flex: ${(props) =>
    props.$visible && props.$height && props.$height === "full"
      ? `1`
      : "unset"};
  color: #545454;
`;

const Chevron = styled.a<{ $visible: boolean }>`
  transform: rotate(${(props) => (props.$visible ? 180 : 0)}deg);
  svg {
    width: 8px;
    height: 8px;
  }
`;

export type SidebarItemProps = {
  title: string;
  height?: string;
  icon: string;
  visible?: boolean;
  onChange?: (bool: boolean) => void;
  children?: React.ReactNode;
};

const HeaderDiv = styled.div`
  color: #615c5c;
  height: 45px;
  svg {
    fill: #707070;
  }
`;

export const SidebarItem: React.FC<SidebarItemProps> = ({
  visible,
  icon,
  title,
  children,
  height,
  onChange,
}) => {
  return (
    <SidebarItemDiv
      $visible={visible}
      $height={height}
      className="flex flex-col"
    >
      <HeaderDiv
        onClick={() => {
          if (onChange) onChange(!visible);
        }}
        className={`cursor-pointer bg-white border-b last:border-b-0 flex items-center px-2 ${
          visible ? "shadow-sm" : ""
        }`}
      >
        <div className="flex-1 flex items-center">
          <img src={icon} alt={title} className="w-4 h-4 mr-2" />
          {/* {React.createElement(icon, { className: 'w-4 h-4 mr-2' })} */}
          <h2 className="text-xs uppercase">{title}</h2>
        </div>
        <Chevron $visible={visible}>
          <Arrow />
        </Chevron>
      </HeaderDiv>
      {visible ? (
        <div className="w-full flex-1 overflow-auto">{children}</div>
      ) : null}
    </SidebarItemDiv>
  );
};
