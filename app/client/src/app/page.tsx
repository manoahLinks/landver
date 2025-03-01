"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";

// Define types for StarkNet and wallet providers
interface StarknetWindow extends Window {
  starknet?: any;
  braavos?: any;
  argentX?: any;
  ethereum?: any;
}

// Define types for the wallet object
interface Wallet {
  id: string;
  name: string;
  icon: string | null;
  detectProvider: () => Promise<any>; // Function to detect the wallet provider
  connect: () => Promise<void>; // Function to connect to the wallet
}

// Define props for FeatureItem component
interface FeatureItemProps {
  text: string;
}

// Define props for WalletButton component
interface WalletButtonProps {
  wallet: Wallet;
  onClick: (walletId: string) => void;
  isLoading: boolean;
  isConnected: boolean;
}

// Mock function to fetch supported wallets (replace with actual API call)
const fetchSupportedWallets = async (): Promise<Wallet[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "braavos",
          name: "Braavos",
          icon: "/images/Braavos.png",
          detectProvider: async () => {
            console.log("Checking for Braavos wallet...");
            // Check if window is defined (for SSR compatibility)
            if (typeof window === "undefined") return null;

            // Cast window to our extended type
            const win = window as unknown as StarknetWindow;

            // Add a delay to ensure the provider is injected
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Check for StarkNet object first (most wallets inject here)
            if (win.starknet && win.starknet.braavos) {
              console.log("Braavos wallet detected via StarkNet object");
              return win.starknet;
            }

            // Some wallet injections work differently
            if (win.braavos) {
              console.log("Braavos wallet detected via direct injection");
              return win.braavos;
            }

            // Additional checks for wallet presence
            if (win.starknet && typeof win.starknet.isPreauthorized === 'function') {
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
            console.log("Window objects:", Object.keys(win));
            if (win.starknet) {
              console.log("StarkNet object found:", win.starknet);
            }

            return null;
          },
          connect: async () => {
            // Connect to Braavos wallet
            try {
              const win = window as unknown as StarknetWindow;
              if (win.starknet && win.starknet.braavos && typeof win.starknet.enable === 'function') {
                return await win.starknet.enable();
              }
              if (win.braavos && typeof win.braavos.enable === 'function') {
                return await win.braavos.enable();
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
            // Check if window is defined (for SSR compatibility)
            if (typeof window === "undefined") return null;

            // Cast window to our extended type
            const win = window as unknown as StarknetWindow;

            // Add a delay to ensure the provider is injected
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Check for StarkNet object first (most wallets inject here)
            if (win.starknet && win.starknet.isArgent) {
              console.log("Argent X wallet detected via StarkNet object");
              return win.starknet;
            }

            // Check for direct argentX injection
            if (win.argentX) {
              console.log("Argent X wallet detected via direct injection");
              return win.argentX;
            }

            // Check for any StarkNet provider (might be Argent X)
            if (win.starknet) {
              console.log("StarkNet provider detected (might be Argent X)");
              return win.starknet;
            }

            console.log("Argent X wallet not detected");
            console.log("Window objects:", Object.keys(win));
            if (win.starknet) {
              console.log("StarkNet object found:", win.starknet);
            }

            return null;
          },
          connect: async () => {
            // Connect to Argent X wallet
            try {
              const win = window as unknown as StarknetWindow;
              if (win.starknet && typeof win.starknet.enable === 'function') {
                return await win.starknet.enable();
              }
              if (win.argentX && typeof win.argentX.enable === 'function') {
                return await win.argentX.enable();
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
            // Check if window is defined (for SSR compatibility)
            if (typeof window === "undefined") return null;

            // Cast window to our extended type
            const win = window as unknown as StarknetWindow;

            // Add a delay to ensure the provider is injected
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Try to detect StarkNet wallet first
            if (win.starknet) {
              console.log("StarkNet wallet detected for web wallet");
              return win.starknet;
            }

            // Detect Ethereum-compatible wallets (e.g., Brave Wallet, MetaMask)
            if (win.ethereum) {
              console.log("Ethereum wallet detected");
              return win.ethereum;
            }

            console.log("Web wallet not detected");
            console.log("Window objects:", Object.keys(win));

            return null;
          },
          connect: async () => {
            // Connect to wallet
            try {
              const win = window as unknown as StarknetWindow;
              if (win.starknet && typeof win.starknet.enable === 'function') {
                return await win.starknet.enable();
              }
              if (win.ethereum && typeof win.ethereum.request === 'function') {
                return await win.ethereum.request({
                  method: "eth_requestAccounts",
                });
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
            // Mobile wallets typically use WalletConnect or similar
            // Check if running in mobile browser with wallet detection
            if (typeof window === "undefined") return null;

            // Cast window to our extended type
            const win = window as unknown as StarknetWindow;

            // Check if we're on mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            );

            if (isMobile) {
              // Check for StarkNet provider that might be injected by mobile wallet
              if (win.starknet) {
                console.log("Potential mobile wallet detected");
                return win.starknet;
              }
            }

            console.log("Argent Mobile wallet not detected");
            return null;
          },
          connect: async () => {
            // Connect to Argent Mobile wallet
            try {
              const win = window as unknown as StarknetWindow;
              if (win.starknet && typeof win.starknet.enable === 'function') {
                return await win.starknet.enable();
              }

              // If no direct injection, open deep link or redirect
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
const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="flex items-center justify-start gap-2">
    <div className="size-[30px] bg-[#E9E7F9] rounded-full flex items-center justify-center">
      <FaCheck className="text-[#6E62E5] text-[15px]" />
    </div>
    <p className="font-medium text-[16px] text-black">{text}</p>
  </li>
);

// WalletButton component
const WalletButton: React.FC<WalletButtonProps> = ({ wallet, onClick, isLoading, isConnected }) => (
  <button
    className={`flex items-center justify-center gap-2 w-full py-2 font-semibold
      ${isConnected ? "bg-green-500 text-white" : "bg-white text-[#6364D5]"}
      border-[1px] border-gray-300 rounded-lg transition-transform duration-300
      ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg hover:bg-[#E0D3F5]"}`}
    onClick={() => onClick(wallet.id)}
    disabled={isLoading}
  >
    {wallet.icon && <Image src={wallet.icon} alt={`${wallet.name} Icon`} width={24} height={24} />}
    <p>{isLoading ? "Connecting..." : isConnected ? "Connected" : wallet.name}</p>
  </button>
);

// Main component
const Next: React.FC = () => {
  const [supportedWallets, setSupportedWallets] = useState<Wallet[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const wallets = await fetchSupportedWallets();
        setSupportedWallets(wallets);
      } catch (err) {
        setError("Failed to load wallets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadWallets();
  }, []);

  // Function to handle wallet connection
  const handleWalletConnect = async (walletId: string) => {
    setConnectingWallet(walletId);
    setError(null);

    try {
      const wallet = supportedWallets.find((w) => w.id === walletId);
      if (!wallet) {
        throw new Error("Wallet not found.");
      }

      // Detect the wallet provider
      const provider = await wallet.detectProvider();
      if (!provider) {
        // Wallet not installed, show message
        setError(`${wallet.name} not installed.`);
        return; // Exit the function after showing the message
      }

      // Connect to the wallet
      await wallet.connect();
      setConnectedWallet(walletId);
      console.log(`Connected to ${wallet.name}`);
      alert(`Connected to ${wallet.name}`);
    } catch (err) {
      console.error("Connection error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to connect to wallet";
      setError(errorMessage);
    } finally {
      setConnectingWallet(null);
    }
  };

  return (
    <div className="flex flex-col md:items-start justify-center px-5 w-full min-h-screen overflow-auto">
      {/* Header */}
      <header>
        <Image src="/images/logo.png" alt="Land Registry Protocol Logo" width={100} height={100} priority />
      </header>

      {/* Main Section */}
      <main className="flex flex-col md:flex-row md:justify-between justify-center mt-10 w-full">
        <section className="text-center md:text-start">
          <h1 className="md:text-[48px] text-[30px] font-bold text-[#6E62E5]">
            Land Registry <br />Protocol
          </h1>
          <p className="text-gray-400 mt-2 text-[16px]">
            Secure, transparent, and efficient land registration <br /> powered by blockchain technology.
          </p>
          <h2 className="text-[#6B21A8] text-[20px] font-semibold mt-5">
            A Secure Platform for Land Registration, Inspection, and <br />Validation on Starknet
          </h2>
          <ul className="text-gray-600 mt-8 space-y-4">
            <FeatureItem text="Effortless land registration with unique property IDs." />
            <FeatureItem text="Streamlined land inspection and verification for trusted records." />
            <FeatureItem text="Immutable, blockchain security for ownership and transactions." />
          </ul>
        </section>
        <section className="flex justify-center md:mr-32">
          <Image src="/images/wallet-illustration.png" alt="Wallet Illustration" width={450} height={450} priority />
        </section>
      </main>

      {/* Wallet Connection Section */}
      <section className="flex items-center justify-center w-full mt-16 text-center mb-10">
        <div className="md:w-[465px]">
          <h2 className="md:text-[45px] font-bold text-[#6E62E5]">Connect Your Wallet</h2>
          <p className="mt-4 text-[#1F1F1F] text-[16px] font-medium">
            Connect a supported wallet to access Land Registry
          </p>
          <p className="my-8 text-[#6B21A8] font-semibold">Choose a wallet</p>

          {/* Loading / Error States */}
          {loading && <p className="text-gray-500">Loading wallets...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Wallet Buttons */}
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

          {/* Connected Message */}
          {connectedWallet && (
            <p className="mt-6 text-green-600 font-semibold">
              ✅ Connected to {supportedWallets.find(w => w.id === connectedWallet)?.name || connectedWallet}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Next;
