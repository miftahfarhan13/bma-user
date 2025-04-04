import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const IconPlate: React.FC<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      version="1.1"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      image-rendering="optimizeQuality"
      fill-rule="evenodd"
      clip-rule="evenodd"
      viewBox="0 0 40.97 40.97"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path d="M3.2 8.48l34.57 0c1.76,0 3.2,1.44 3.2,3.2l0 17.61c0,1.76 -1.44,3.2 -3.2,3.2l-34.57 0c-1.76,0 -3.2,-1.44 -3.2,-3.2l0 -17.61c0,-1.76 1.44,-3.2 3.2,-3.2zm0 2.4l34.57 0c0.44,0 0.8,0.36 0.8,0.8l0 17.61c0,0.44 -0.36,0.8 -0.8,0.8l-34.57 0c-0.44,0 -0.8,-0.36 -0.8,-0.8l0 -17.61c0,-0.44 0.36,-0.8 0.8,-0.8z"></path>
      <path d="M5.07 24.72l2.33 0 0 -2.4 1.15 0c2.09,0 3.61,-1.05 3.61,-3.03l0 -0.02c0,-1.86 -1.37,-2.95 -3.49,-2.95l-3.6 0 0 8.4zm2.33 -4.23l0 -2.22 1.09 0c0.84,0 1.34,0.39 1.34,1.11l0 0.02c0,0.66 -0.5,1.09 -1.33,1.09l-1.1 0zm5.75 4.23l6.39 0 0 -2.04 -4.07 0 0 -6.36 -2.32 0 0 8.4zm6.72 0l2.45 0 0.6 -1.5 3.24 0 0.61 1.5 2.5 0 -3.58 -8.46 -2.24 0 -3.58 8.46zm3.73 -3.32l0.95 -2.38 0.94 2.38 -1.89 0zm7.46 3.32l2.32 0 0 -6.36 2.53 0 0 -2.04 -7.38 0 0 2.04 2.53 0 0 6.36z"></path>
    </svg>
  );
};

export default IconPlate;
