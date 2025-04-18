import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
interface CardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
  value?: string | number | React.ReactNode;
  image?: React.ReactNode;
  className?: string;
  badges?: number;
  svgColor?:string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  icon,
  value,
  image,
  className = "",
  badges,
  svgColor
}) => {
  return (
    <div className={`rounded-xl shadow-sm p-6 ${className} flex flex-col`}>
      {/* Content */}
      <div className="flex flex-col h-full">
        {/* Title & Value */}
        {title && (
          <h3 className={`text-lg font-medium ${value ? "text-gray-500" : ""}`}>
            {title}
          </h3>
        )}

        {value && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-4xl font-bold">{value}</span>
            <div className="w-16 h-16 rounded-full">
              <div className={`w-full rounded-full h-full bg-gradient-to-b ${svgColor?svgColor:'bg-secondary'} flex items-center justify-center`}>
                <Image
                  alt="icon"
                  src="/icons/layers.svg"
                  height={25}
                  width={25}
                />
              </div>
            </div>
          </div>
        )}

        {/* Badges */}
        {badges && (
          <div className="flex mt-4 relative">
            {[...Array(Math.min(5, badges))].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-secondary border border-primary rounded-full flex items-center justify-center -ml-3 first:ml-0"
              >
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
            ))}
            {badges > 5 && (
              <div className="w-10 h-10 bg-gray-200 rounded-full border border-black flex items-center justify-center text-xs text-gray-500 -ml-3">
                +{badges - 5}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {description && <p className="text-gray-500 mt-1">{description}</p>}

        {/* Image */}
        {image && <div className="relative mt-4">{image}</div>}

        {/* Button */}
        {buttonText && (
          <div className="mt-auto pt-4">
            <button
              onClick={onButtonClick}
              className={`flex items-center justify-center w-full py-3 rounded-lg ${
                icon
                  ? "bg-indigo-50 text-indigo-500"
                  : className.includes("bg-primary")
                  ? "bg-white text-indigo-500"
                  : "bg-white border border-gray-200 text-indigo-500"
              }`}
            >
              {icon && <span className="mr-2">{icon}</span>}
              <span>{buttonText}</span>
              {!icon && !className.includes("bg-primary") && (
                <ArrowRight className="ml-2 w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
