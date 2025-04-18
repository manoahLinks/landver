"use client";
import React from "react";
import WalletModal from "../ui/walletModal";
import { useAppContext } from "@/app/context/appContext";
import { useBalance } from "@starknet-react/core";
import { useRouter } from "next/navigation";
import Button from "../ui/button";

// function parseAddress(addr: string | undefined) {
//   if (!addr) return "";
//   return ` ${addr?.slice(0, 8)}...${addr.slice(addr.length - 8, addr.length)}`;
// }
const Connector: React.FC = () => {
  const { address, status } = useAppContext();
  const { data } = useBalance({
    token: "0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D",
    address: address as "0x",
  });
  const router = useRouter();

  console.log(data);
  console.log(status);
  return (
    <div className="p-6 text-center">
      {status === "connected" && (
        <div>
          <p>Select User type</p>
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/owner")}
          >
            Owner
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/inspector")}
          >
            Inspector
          </Button>
        </div>
      )}
      {status === "connecting" && (
        <p className="text-lg font-medium text-gray-500">Connecting...</p>
      )}
      {status === "disconnected" && (
        <div>
          <WalletModal />
        </div>
      )}
    </div>
  );
};

export default Connector;
