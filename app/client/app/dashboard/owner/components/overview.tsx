"use client";
import Card from "@/app/components/ui/overviewcard";
import { PlusCircle } from "lucide-react";
import React from "react";
import OverviewSvg from "./overviewsvg";

const Overview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2 w-full">
      {/* Discover Now Card with SVG */}
      <Card
        title="Discover, transfer and register your lands!"
        buttonText="Discover Now"
        className="bg-primary text-white flex flex-col items-start"
        image={<OverviewSvg />}
        onButtonClick={() => alert("Discover Now Clicked")}
      />

      {/* Owned Land Card */}
      <Card
        title="Total Owned Land"
        value={24}
        buttonText="View Details"
        className="bg-white"
        badges={24}
        onButtonClick={() => alert("View Details Clicked")}
        svgColor="bg-green-100"
      />

      {/* Balance Card */}
      <Card
        title="My balance"
        value="15.64ETH"
        buttonText="Top Up Balance"
        className="bg-white"
        icon={<PlusCircle className="w-6 h-6 text-primary" />}
        onButtonClick={() => alert("Top Up Balance Clicked")}
        svgColor="bg-blue-100"
      />
    </div>
  );
};

export default Overview;
