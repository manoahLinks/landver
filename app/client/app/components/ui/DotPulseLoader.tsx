import React from "react";
import Spinner from "./Spinner";

const DotPulseLoader = () => {
  return (
    <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
      <span>Fetching balance</span>
      <div>
        <Spinner />
      </div>
    </div>
  );
};

export default DotPulseLoader;
