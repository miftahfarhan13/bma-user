import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const IconNIK: React.FC<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      version="1.1"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 41.35 41.35"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path d="M3.23 8.56l2.91 0c0.66,0 1.21,0.54 1.21,1.21l0 0c0,0.67 -0.55,1.21 -1.21,1.21l-2.91 0c-0.44,0 -0.81,0.37 -0.81,0.81l0 17.77c0,0.44 0.37,0.8 0.81,0.8l2.91 0c0.66,0 1.21,0.55 1.21,1.22l0 0c0,0.66 -0.55,1.21 -1.21,1.21l-2.91 0c-1.78,0 -3.23,-1.46 -3.23,-3.23l0 -17.77c0,-1.78 1.45,-3.23 3.23,-3.23zm31.98 0l2.91 0c1.77,0 3.23,1.45 3.23,3.23l0 17.77c0,1.77 -1.46,3.23 -3.23,3.23l-2.91 0c-0.67,0 -1.21,-0.55 -1.21,-1.21l0 0c0,-0.67 0.54,-1.22 1.21,-1.22l2.91 0c0.44,0 0.8,-0.36 0.8,-0.8l0 -17.77c0,-0.44 -0.36,-0.81 -0.8,-0.81l-2.91 0c-0.67,0 -1.21,-0.54 -1.21,-1.21l0 0c0,-0.67 0.54,-1.21 1.21,-1.21z"></path>
      <path d="M6.25 26.33l3.1 0 0 -6.21 4.83 6.21 2.75 0 0 -11.31 -3.1 0 0 5.98 -4.66 -5.98 -2.92 0 0 11.31zm12.74 0l3.15 0 0 -11.31 -3.15 0 0 11.31zm5.22 0l3.13 0 0 -2.93 1.15 -1.27 2.84 4.2 3.77 0 -4.43 -6.45 4.28 -4.86 -3.71 0 -3.9 4.59 0 -4.59 -3.13 0 0 11.31z"></path>
    </svg>
  );
};

export default IconNIK;
