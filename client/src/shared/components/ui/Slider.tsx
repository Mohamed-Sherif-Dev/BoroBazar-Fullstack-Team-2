import React from "react";

interface SliderProps {
  children: React.ReactNode;
}

export function Slider({ children }: SliderProps) {
  return (
    <div className="slider-container overflow-x-auto flex gap-4 pb-4">
      {children}
    </div>
  );
}
