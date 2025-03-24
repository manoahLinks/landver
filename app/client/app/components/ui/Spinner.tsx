import React from "react";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
}

const Spinner: React.FC<SpinnerProps> = ({ size = "medium" }) => {
  const sizes: Record<SpinnerProps["size"], string> = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${sizes[size]}`}
      />
    </div>
  );
};

export default Spinner;
