"use client";

import { useState } from "react";
import { useContract, useAccount } from "@starknet-react/core";
import { ABI } from "../../abis/landRegistry.abi";
import { useAppContext } from "../../context/appContext";

const RegisterLandForm = () => {
  const { contactAddress } = useAppContext();
  const { account } = useAccount();
  const { contract } = useContract({
    abi: ABI,
    address: contactAddress as "0x",
  });

  const [formData, setFormData] = useState({
    landName: "",
    location: "",
    area: "",
    landUse: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toBigNumberish = (value: string) => BigInt(value) * BigInt("1000000000000000000");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) {
      alert("Please connect your Wallet.");
      return;
    }
    if (!contract) {
      alert("Contract not found.");
      return;
    }

    try {
      const args_0 = {
        latitude: toBigNumberish(formData.location),
        longitude: toBigNumberish(formData.location),
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

  const isFormValid = Object.values(formData).every((value) => value !== "");

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl relative">
      <div className="flex flex-col items-center mb-4">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary text-2xl">🛖</span>
        </div>
        <h2 className="text-xl font-semibold mt-2">Register New Land</h2>
        <p className="text-gray-500 text-sm">Please enter all details to register your land</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-700 font-medium">Land Name *</label>
          <input
            type="text"
            name="landName"
            value={formData.landName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Area *</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 font-medium">Land Use *</label>
          <select
            name="landUse"
            value={formData.landUse}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
            required
          >
            <option value="">Select</option>
            <option value="1">Residential</option>
            <option value="2">Commercial</option>
            <option value="3">Agricultural</option>
          </select>
        </div>

        <div>
          <label className="text-gray-700 font-medium">Price *</label>
          <select
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none"
            required
          >
            <option value="">Select</option>
            <option value="10000">10,000</option>
            <option value="50000">50,000</option>
            <option value="100000">100,000</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="w-1/2 text-gray-600 font-medium border border-gray-300 py-2 rounded-md hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`w-1/2 text-white font-medium py-2 rounded-md transition ${
              isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterLandForm;
