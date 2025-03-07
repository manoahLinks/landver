"use client";

import Image from "next/image";
import { WalletConnection, FeatureItem } from "@/components/Connector";
import { useState } from "react";
import RoleSelection from "@/components/RoleSelection";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLoginStore } from "@/store/loginStore";

const Next: React.FC = () => {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [role, setRole] = useState<"owner" | "inspector" | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const loginStore = useLoginStore();
  const handleWalletConnect = (walletId: string, address: string | null) => {
    setConnectedWallet(walletId);
    setWalletAddress(address);
    toast.success(`Connected to wallet: ${walletId}`);
  };

  const handleRoleSelect = async (role: "owner" | "inspector") => {
    setRole(role);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("user-type", role);
      loginStore.setUserType(role);
      console.log(
        `Role selected: ${loginStore.userType}, proceeding to dashboard...`
      );
      toast.success("Redirecting to dashboard...");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error proceeding to dashboard:", error);
      toast.error("Failed to proceed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col md:items-start justify-center p-7 w-full min-h-screen overflow-auto">
      {/* Header */}
      <header>
        <Image
          src="/logo-and-name.svg"
          alt="Land Registry Protocol Logo"
          width={120}
          height={120}
          priority
        />
      </header>
      {/* Main Section */}
      <main className="flex flex-col md:flex-row md:justify-between justify-center mt-10 w-full p-4">
        <section className="text-center md:text-start">
          <h1 className="md:text-[30px] text-[30px] font-bold text-[#6E62E5]">
            Land Registry <br />
            Protocol
          </h1>
          <p className="text-gray-400 mt-2 text-[16px]">
            Secure, transparent, and efficient land registration <br /> powered
            by blockchain technology.
          </p>
          <h2 className="text-[#6B21A8] text-[20px] font-semibold mt-5">
            A Secure Platform for Land Registration, Inspection, and <br />
            Validation on Starknet
          </h2>
          <ul className="text-gray-600 mt-8 space-y-4">
            <FeatureItem text="Effortless land registration with unique property IDs." />
            <FeatureItem text="Streamlined land inspection and verification for trusted records." />
            <FeatureItem text="Immutable, blockchain security for ownership and transactions." />
          </ul>
        </section>
        <section className="flex justify-center md:mr-32">
          <Image
            src="/images/wallet-illustration.png"
            alt="Wallet Illustration"
            width={450}
            height={450}
            priority
          />
        </section>
      </main>

      {/* Wallet Connection or Role Selection Section */}
      <section className="flex items-center justify-center w-full mt-16 text-center mb-10">
        {connectedWallet ? (
          <RoleSelection
            connectedWallet={walletAddress || connectedWallet} // Show wallet address if available
            onRoleSelect={handleRoleSelect}
          />
        ) : (
          <WalletConnection onWalletConnect={handleWalletConnect} />
        )}
      </section>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <PulseLoader size={15} color="#6E62E5" />
          <p className="ml-3 text-white text-lg">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default Next;
