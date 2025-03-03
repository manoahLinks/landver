import { useState, useEffect } from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

// Define types for StarkNet and wallet providers
interface StarknetWindow extends Window {
  starknet?: {
    braavos?: any;
    isArgent?: boolean;
    enable?: () => Promise<any>;
    isPreauthorized?: () => Promise<boolean>;
    selectedAddress?: string; // Add selectedAddress to the StarkNet provider
  };
  braavos?: {
    enable?: () => Promise<any>;
    selectedAddress?: string; // Add selectedAddress to the Braavos provider
  };
  argentX?: {
    enable?: () => Promise<any>;
    selectedAddress?: string; // Add selectedAddress to the ArgentX provider
  };
  ethereum?: {
    request?: (request: { method: string }) => Promise<any>;
    selectedAddress?: string; // Add selectedAddress to the Ethereum provider
  };
}

// Define types for the wallet object
export interface Wallet {
  id: string;
  name: string;
  icon: string | null;
  detectProvider: () => Promise<any>; // Function to detect the wallet provider
  connect: () => Promise<string | null>; // Function to connect to the wallet and return the address
}

// Define props for FeatureItem component
export interface FeatureItemProps {
  text: string;
}

// Define props for WalletButton component
export interface WalletButtonProps {
  wallet: Wallet;
  onClick: (walletId: string) => void;
  isLoading: boolean;
  isConnected: boolean;
}

// Mock function to fetch supported wallets (replace with actual API call)
export const fetchSupportedWallets = async (): Promise<Wallet[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "braavos",
          name: "Braavos",
          icon: "/images/Braavos.png",
          detectProvider: async () => {
            console.log("Checking for Braavos wallet...");
            if (typeof window === "undefined") return null;

            const win = window as unknown as StarknetWindow;

            // Add a small delay to allow the provider to initialize
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Check for Braavos provider via StarkNet object
            if (win.starknet?.braavos) {
              console.log("Braavos wallet detected via StarkNet object");
              return win.starknet;
            }

            // Check for Braavos provider via direct injection
            if (win.braavos) {
              console.log("Braavos wallet detected via direct injection");
              return win.braavos;
            }

            // Check for StarkNet provider with preauthorization
            if (win.starknet && typeof win.starknet.isPreauthorized === "function") {
              try {
                const authorized = await win.starknet.isPreauthorized();
                if (authorized) {
                  console.log("StarkNet wallet detected (possibly Braavos)");
                  return win.starknet;
                }
              } catch (error) {
                console.error("Error checking preauthorization:", error);
              }
            }

            console.log("Braavos wallet not detected");
            return null;
          },
          connect: async () => {
            try {
              const win = window as unknown as StarknetWindow;

              // Connect via StarkNet object
              if (win.starknet?.braavos && typeof win.starknet.enable === "function") {
                await win.starknet.enable();
                return win.starknet.selectedAddress || null; // Return the wallet address
              }

              // Connect via direct injection
              if (win.braavos && typeof win.braavos.enable === "function") {
                await win.braavos.enable();
                return win.braavos.selectedAddress || null; // Return the wallet address
              }

              throw new Error("Braavos provider not found");
            } catch (error) {
              console.error("Error connecting to Braavos:", error);
              throw error;
            }
          },
        },
        {
          id: "argent-x",
          name: "Argent X",
          icon: "/images/Argent.png",
          detectProvider: async () => {
            console.log("Checking for Argent X wallet...");
            if (typeof window === "undefined") return null;
            const win = window as unknown as StarknetWindow;
            if (win.starknet?.isArgent) {
              console.log("Argent X wallet detected via StarkNet object");
              return win.starknet;
            }
            if (win.argentX) {
              console.log("Argent X wallet detected via direct injection");
              return win.argentX;
            }
            if (win.starknet) {
              console.log("StarkNet provider detected (might be Argent X)");
              return win.starknet;
            }
            console.log("Argent X wallet not detected");
            return null;
          },
          connect: async () => {
            try {
              const win = window as unknown as StarknetWindow;
              if (win.starknet && typeof win.starknet.enable === "function") {
                await win.starknet.enable();
                return win.starknet.selectedAddress || null; // Return the wallet address
              }
              if (win.argentX && typeof win.argentX.enable === "function") {
                await win.argentX.enable();
                return win.argentX.selectedAddress || null; // Return the wallet address
              }
              throw new Error("Argent X provider not found");
            } catch (error) {
              console.error("Error connecting to Argent X:", error);
              throw error;
            }
          },
        },
        {
          id: "web-wallet",
          name: "Web Wallet",
          icon: null,
          detectProvider: async () => {
            console.log("Checking for Web/Ethereum wallet...");
            if (typeof window === "undefined") return null;
            const win = window as unknown as StarknetWindow;
            if (win.starknet) {
              console.log("StarkNet wallet detected for web wallet");
              return win.starknet;
            }
            if (win.ethereum) {
              console.log("Ethereum wallet detected");
              return win.ethereum;
            }
            console.log("Web wallet not detected");
            return null;
          },
          connect: async () => {
            try {
              const win = window as unknown as StarknetWindow;
              if (win.starknet && typeof win.starknet.enable === "function") {
                await win.starknet.enable();
                return win.starknet.selectedAddress || null; // Return the wallet address
              }
              if (win.ethereum && typeof win.ethereum.request === "function") {
                const accounts = await win.ethereum.request({
                  method: "eth_requestAccounts",
                });
                return accounts[0] || null; // Return the first account address
              }
              throw new Error("Web wallet provider not found");
            } catch (error) {
              console.error("Error connecting to web wallet:", error);
              throw error;
            }
          },
        },
        {
          id: "argent-mobile",
          name: "Argent Mobile",
          icon: "/images/Argent.png",
          detectProvider: async () => {
            console.log("Checking for Argent Mobile wallet...");
            if (typeof window === "undefined") return null;
            const win = window as unknown as StarknetWindow;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            );
            if (isMobile && win.starknet) {
              console.log("Potential mobile wallet detected");
              return win.starknet;
            }
            console.log("Argent Mobile wallet not detected");
            return null;
          },
          connect: async () => {
            try {
              const win = window as unknown as StarknetWindow;
              if (win.starknet && typeof win.starknet.enable === "function") {
                await win.starknet.enable();
                return win.starknet.selectedAddress || null; // Return the wallet address
              }
              const mobileRedirectUrl = "https://www.argent.xyz/download/";
              window.open(mobileRedirectUrl, "_blank");
              throw new Error("Please install Argent Mobile from the opened link");
            } catch (error) {
              console.error("Error connecting to Argent Mobile:", error);
              throw error;
            }
          },
        },
      ]);
    }, 1000);
  });
};

// FeatureItem component
export const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="flex items-center justify-start gap-2">
    <div className="size-[30px] bg-[#E9E7F9] rounded-full flex items-center justify-center">
      <FaCheck className="text-[#6E62E5] text-[15px]" />
    </div>
    <p className="font-medium text-[16px] text-black">{text}</p>
  </li>
);

// WalletButton component
export const WalletButton: React.FC<WalletButtonProps> = ({ wallet, onClick, isLoading, isConnected }) => (
  <button
    className={`flex items-center justify-center gap-2 w-full py-2 font-semibold
      ${isConnected ? "bg-green-500 text-white" : "bg-white text-[#6364D5]"}
      border-[1px] border-gray-300 rounded-lg transition-transform duration-300
      ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg hover:bg-[#E0D3F5]"}`}
    onClick={() => onClick(wallet.id)}
    disabled={isLoading}
    aria-label={`Connect to ${wallet.name}`}
  >
    {wallet.icon && <Image src={wallet.icon} alt={`${wallet.name} Icon`} width={24} height={24} />}
    <p>{isLoading ? "Connecting..." : isConnected ? "Connected" : wallet.name}</p>
  </button>
);

// WalletConnection component
export const WalletConnection: React.FC<{ onWalletConnect: (walletId: string, address: string | null) => void }> = ({ onWalletConnect }) => {
  const [supportedWallets, setSupportedWallets] = useState<Wallet[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to truncate the wallet address
  const truncateAddress = (address: string | null): string => {
    if (!address) return "";
    const firstPart = address.slice(0, 6); // First 6 characters
    const lastPart = address.slice(-4); // Last 4 characters
    return `${firstPart}...${lastPart}`;
  };

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const wallets = await fetchSupportedWallets();
        setSupportedWallets(wallets);
      } catch (err) {
        setError("Failed to load wallets. Please try again later.");
        toast.error("Failed to load wallets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadWallets();
  }, []);

  const handleWalletConnect = async (walletId: string) => {
    setConnectingWallet(walletId);
    setError(null);

    try {
      const wallet = supportedWallets.find((w) => w.id === walletId);
      if (!wallet) {
        throw new Error("Wallet not found.");
      }

      const provider = await wallet.detectProvider();
      if (!provider) {
        setError(`${wallet.name} not installed.`);
        toast.error(`${wallet.name} not installed.`);
        return;
      }

      const address = await wallet.connect();
      setConnectedWallet(walletId);
      setWalletAddress(address);
      toast.success(`Connected to ${wallet.name}`);
      onWalletConnect(walletId, address);
    } catch (err) {
      console.error("Connection error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to connect to wallet";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setConnectingWallet(null);
    }
  };

  return (
    <div className="md:w-[465px]">
      <h2 className="md:text-[45px] font-bold text-[#6E62E5]">Connect Your Wallet</h2>
      <p className="mt-4 text-[#1F1F1F] text-[16px] font-medium">
        Connect a supported wallet to access Land Registry
      </p>
      <p className="my-8 text-[#6B21A8] font-semibold">Choose a wallet</p>

      {loading && <PulseLoader size={10} color="#6E62E5" />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4 space-y-3">
        {supportedWallets.map((wallet) => (
          <WalletButton
            key={wallet.id}
            wallet={wallet}
            onClick={handleWalletConnect}
            isLoading={connectingWallet === wallet.id}
            isConnected={connectedWallet === wallet.id}
          />
        ))}
      </div>

      {walletAddress && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700">Connected Address:</p>
          <p className="font-mono text-sm text-gray-900 break-all">
            {truncateAddress(walletAddress)}
          </p>
        </div>
      )}
    </div>
  );
};