import Image from "next/image";
import Connector from "./components/utils/Connector";



export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full max-w-4xl text-center mt-10">
        <h1 className="text-4xl font-bold text-purple-700">
          Land Registry Protocol
        </h1>
        <p className="text-gray-600 mt-3">
          Secure, transparent, and efficient land registration powered by blockchain technology.
        </p>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-2xl mt-8 text-center">
        <h2 className="text-lg font-semibold text-purple-600">
          A Secure Platform for Land Registration, Inspection, and Validation on Starknet
        </h2>
        <ul className="mt-4 text-gray-700 space-y-2">
          <li> Effortless land registration with unique property IDs.</li>
          <li>Streamlined land inspection and verification for trusted records.</li>
          <li> Immutable, blockchain security for ownership and transactions.</li>
        </ul>
      </div>

      {/* Illustration */}
      <div className="mt-10">
        <Image 
          src="/images/wallet-illustration.png" 
          alt="Wallet Illustration" 
          width={400} 
          height={250} 
          className="rounded-lg"
        />
      </div>

      {/* Wallet Connection Section */}
      <div className="w-full max-w-md mt-10 text-center">
        <h2 className="text-2xl font-bold text-purple-700">Connect Your Wallet</h2>
        <p className="text-gray-600 mt-2">Connect a supported wallet to access Land Registry</p>

        {/* Wallet Modal (Connector) */}
        <div className="mt-6">
          <Connector />
        </div>
      </div>
    </div>
  );
}
