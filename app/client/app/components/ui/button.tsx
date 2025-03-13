import React from "react";
import clsx from "clsx"; 

const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-secondary text-primary hover:bg-secondary/90",
  ghost:
    "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  danger: "bg-red-500 text-white hover:bg-red-600",
};


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
  size?: "sm" | "md" | "lg";
}

// Button Component
const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        "rounded-lg font-semibold transition duration-200 ease-in-out",
        VARIANTS[variant], 
        sizeClasses[size], 
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
