import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface RoleSelectionProps {
  connectedWallet: string;
  onRoleSelect: (role: string) => void;
}

// Function to truncate the wallet address
const truncateAddress = (address: string): string => {
  if (!address) return "";
  const firstPart = address.slice(0, 6); // First 6 characters
  const lastPart = address.slice(-4); // Last 4 characters
  return `${firstPart}...${lastPart}`;
};

const RoleSelection: React.FC<RoleSelectionProps> = ({ connectedWallet, onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<'owner'|'inspector'| null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role as "owner" | "inspector");
    setError(null); // Clear any previous error
    toast.success(`Selected Role: ${role}`);
  };

  const handleProceed = () => {
    if (!selectedRole) {
      setError("Please select a role before proceeding.");
      toast.error("Please select a role before proceeding.");
      return;
    }

    // Proceed to the dashboard
    onRoleSelect(selectedRole);
    toast.success("Proceeding to the dashboard...");
    
    // Navigate to dashboard page
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-16 text-center mb-10">
      <div className="md:w-[465px]">
        <h2 className="md:text-[45px] font-bold text-[#6E62E5]">Select Your Role</h2>
        <p className="mt-4 text-[#1F1F1F] text-[16px] font-medium">
          Connected Wallet: {truncateAddress(connectedWallet)}
        </p>

        {/* Role Selection Buttons */}
        <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <button
            className={`flex flex-col items-center p-4 bg-white border ${
              selectedRole === "owner" ? "border-[#6E62E5]" : "border-gray-300"
            } rounded-lg shadow-md hover:bg-gray-50 transition-transform duration-300`}
            onClick={() => handleRoleSelect("owner")}
          >
            <p className="mt-2 font-semibold text-[#6E62E5]">Land Owner</p>
            <p className="mt-1 text-gray-600">Manage and verify your land ownership</p>
          </button>

          <button
            className={`flex flex-col items-center p-4 bg-white border ${
              selectedRole === "inspector" ? "border-[#6E62E5]" : "border-gray-300"
            } rounded-lg shadow-md hover:bg-gray-50 transition-transform duration-300`}
            onClick={() => handleRoleSelect("inspector")}
          >
            <p className="mt-2 font-semibold text-[#6E62E5]">Land Inspector</p>
            <p className="mt-1 text-gray-600">Verify and validate land records</p>
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Proceed Button */}
        <button
          className="mt-8 px-6 py-3 bg-[#6E62E5] text-white font-semibold rounded-lg hover:bg-[#5a489e] transition-transform duration-300"
          onClick={handleProceed}
        >
          Proceed to Dashboard
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;