"use client";

import { useState } from "react";
import {useContract, useAccount } from "@starknet-react/core";
import { ABI } from "../abis/landRegistry.abi";
import { useAppContext } from "../context/appContext";

const Dashboard = () => {
  const {contactAddress}=useAppContext()
  const { account } = useAccount();
  const { contract } = useContract({
    abi: ABI,
    address: contactAddress as '0x',
  });

  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    area: "",
    landUse: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const toBigNumberish = (value: string) => BigInt(value) * BigInt("1000000000000000000");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) {
      alert("Please connect your  Wallet.");
      return;
    }
    if (!contract) {
      alert("Contract not found.");
      return;
    }

    try {
  
      const args_0 = {
        latitude: toBigNumberish(formData.latitude),
        longitude: toBigNumberish(formData.longitude),
      };
      const args_1 = BigInt(formData.landUse); 
      const args_2 = toBigNumberish(formData.area);

      console.log("Registering land with args:", { args_0, args_1, args_2 });


      await contract?.connect(account);
      const tx = await contract?.register_land(args_0, args_1, args_2);

      console.log("Transaction submitted:", tx);
      alert("Transaction submitted! Wait for confirmation.");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4">Register Land</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          required
        />
        <input
          type="text"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          required
        />
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          required
        />
        <input
          type="number"
          name="landUse"
          value={formData.landUse}
          onChange={handleChange}
          placeholder="Land Use ID"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
        >
          Register Land
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
