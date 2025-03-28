import React from "react";

type SpinnerProps = {
  size?: "small" | "medium" | "large";
  color?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ size = "medium", color = "border-blue-500" }) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-t-transparent ${sizeClasses[size]} ${color}`}
    ></div>
  );
};

export default Spinner;
