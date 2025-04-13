"use client"

import DataTable from "../../components/sections/dataTable"

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-[#090914]">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard count={230} label="Registration Request" iconSrc="/card.svg" />
        <StatCard count={130} label="Verified Land/Users" iconSrc="/card.svg" />
        <StatCard count={100} label="Transfer Request" iconSrc="/card.svg" />
        <StatCard count={30} label="Flagged Issues" iconSrc="/card.svg" />
      </div>
      <div className="w-full overflow-x-auto">
    <DataTable />
  </div>
    </main>
  )
}

function StatCard({ count, label, iconSrc }: { count: number; label: string; iconSrc: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 flex items-center gap-4">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
        <img src={iconSrc} alt={label} className="w-full h-full" />
      </div>
      <div>
        <p className="text-xl sm:text-2xl font-bold text-[#090914]">{count}</p>
        <p className="text-sm sm:text-base text-[#7E8299]">{label}</p>
      </div>
    </div>
  );
}