import React, { useEffect, useState } from "react";

interface CircularProgressProps {
  value: number; // current seconds
  max: number; // total seconds
  size?: number; // in px, default is 96 (Tailwind's w-24/h-24)
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max,
  size = 96,
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / max) * 100, 100);

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox="0 0 100 100"
      >
        <circle
          className="text-gray-300"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="text-yellow-600 transition-all duration-500 ease-out"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-yellow-600 font-extrabold"
        style={{ fontSize: size / 4, textShadow: "0 0 4px rgba(0,0,0,1)" }}
      >
        {value}
      </div>
    </div>
  );
};

export default CircularProgress;
