"use client";
import React from "react";
import WalletModal from "../ui/walletModal";
import { useAppContext } from "@/app/context/appContext";
import { useBalance } from "@starknet-react/core";
function parseAddress(addr:string| undefined){
  if(!addr) return ''
return ` ${addr?.slice(0,8)}...${addr.slice(addr.length-8,addr.length)}`
}
const Connector: React.FC = () => {
  const { disconnectWallet, address, status } = useAppContext();
  const { data } = useBalance({address:address as '0x'});
console.log(data)
  return (
    <div className="p-6 text-center">
      {status === "connected" && (
        <div>
          <p className="text-lg font-medium">Connected Address:</p>
          <p className="  text-center text-green-500">{parseAddress(address as string)}</p>
          
          <button
            onClick={disconnectWallet}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Disconnect
          </button>
        </div>
      )}
      {status === "connecting" && (
        <p className="text-lg font-medium text-gray-500">Connecting...</p>
      )}
      {status === "disconnected" && (
        
        <div>
          <p className="text-lg font-medium">Landver</p>
          <WalletModal />
        </div>
      )}
    </div>
  );
};

export default Connector;
