import { Menu } from "lucide-react";
import { useAppContext } from "@/app/context/appContext";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { balance ,status} = useAppContext();
console.log(status)
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200">
      {/* Left Section: Hamburger (Mobile) */}
      <button className="md:hidden p-2" onClick={toggleSidebar}>
        <Menu size={24} className="text-gray-700" />
      </button>
      {/* Center: Search Bar */}
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      {/* Right Section: Wallet & Profile */}
      <div className="flex items-center space-x-4">
        {/* Balance */}
        {
status==='connected'? <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
<img src="/icons/currencies/ether.svg" alt="ETH" className="w-4 h-4" />
<span className="text-gray-700 font-medium">{balance || "0.00 ETH"}</span>
</div>: <button className="bg-primary text-white p-2 rounded">Connect Wallet</button>
        }
       
        {/* Profile Avatar */}
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          {/* Replace with actual user image */}
          <span className="text-sm text-gray-600"></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
