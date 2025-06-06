"use client";
import React from "react";
import Overview from "./components/overview";
import {
  RecentActivities,
  generateRecentActivitiesData,
} from "./components/recentActivity";
import {
  BestSellerTable,
  generateBestSellerData,
} from "./components/bestSeller";
import RegisterLandButton from "./components/registerLandButton";

const OwnerDashboard = () => {
  const recentActivities = generateRecentActivitiesData();
  const bestSellerData = generateBestSellerData();

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between">
          <p className="text-bold text-2xl">Overview</p>
          <RegisterLandButton />
        </div>
        <Overview />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <BestSellerTable items={bestSellerData} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivities activities={recentActivities} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
