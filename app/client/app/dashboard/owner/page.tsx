'use client'
import React from "react";
import RegisterLandForm from "@/app/components/sections/registerLandForm";
import Overview from "./components/overview";
import Button from "@/app/components/ui/button";
import { X } from "lucide-react";
import { RecentActivities, generateRecentActivitiesData} from "./components/recentActivity";
import { BestSellerTable, generateBestSellerData} from "./components/bestSeller";


const OwnerDashboard = () => {
  const recentActivities = generateRecentActivitiesData();
  const bestSellerData = generateBestSellerData()

  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    React.useState<boolean>(false);
  async function handleRegisterButtonCLick() {

    setIsRegisterModalOpen(!isRegisterModalOpen);
  }

if (isRegisterModalOpen)
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => setIsRegisterModalOpen(false)}
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Register New Land
        </h2>
        <RegisterLandForm />
      </div>
    </div>
  );


  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between">
          <p className="text-bold text-2xl">Overview</p>
          <Button onClick={handleRegisterButtonCLick}>Register New Land</Button>
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
