"use client";
import React from "react";
import { ChevronRight } from "lucide-react";

// Types
export type BestSellerItem = {
  id: number;
  landId: string;
  buyer: string;
  price: number;
  date: string;
};

// Shared "View all" button with chevron
export const ViewAllButton = () => {
  return (
    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
      View all
      <ChevronRight className="w-4 h-4 ml-1" />
    </button>
  );
};

// Reusable Table Component
export const Table = ({
  headers,
  rows,
  title,
  actionButton,
}: {
  headers: { key: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Record<string, any>[];
  title?: string;
  actionButton?: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg p-6">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-[#000000]">{title}</h2>
          {actionButton}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[#7E8299] text-sm border-b border-dashed">
              {headers.map((header) => (
                <th key={header.key} className="pb-2">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-dashed text-[#3F4254] border-[#7E82994D]/30"
              >
                {headers.map((header) => (
                  <td key={`${rowIndex}-${header.key}`} className="py-7">
                    {row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Best Seller Table Component using the reusable Table
export const BestSellerTable = ({ items }: { items: BestSellerItem[] }) => {
  const headers = [
    { key: "id", label: "NO" },
    { key: "landId", label: "LAND ID" },
    { key: "buyer", label: "BUYER/ LAND NAME" },
    { key: "price", label: "PRICE" },
    { key: "date", label: "DATE" },
  ];

  const rows = items.map((item) => ({
    ...item,
    buyer: (
      <div className="flex items-center gap-2">
        <div className="bg-purple-500 w-6 h-6 rounded-full flex items-center justify-center">
          <img src="/pro.svg" alt="" />
        </div>
        {item.buyer}
      </div>
    ),
    price: (
      <div className="flex items-center gap-1">
        <div className="w-5 h-5 rounded-full flex items-center justify-center">
          <img src="/ethIcon.svg" alt="" />
        </div>
        {item.price}
      </div>
    ),
  }));

  return (
    <Table
      headers={headers}
      rows={rows}
      title="Best Seller"
      actionButton={<ViewAllButton />}
    />
  );
};

export const generateBestSellerData = (): BestSellerItem[] => {
  return [
    {
      id: 1,
      landId: "56037-XDER",
      buyer: "Tress1234",
      price: 0.2345,
      date: "20/11/24",
    },
    {
      id: 2,
      landId: "56037-XDER",
      buyer: "Tress1234",
      price: 0.2345,
      date: "20/11/24",
    },
    {
      id: 3,
      landId: "56037-XDER",
      buyer: "Tress1234",
      price: 0.2345,
      date: "20/11/24",
    },
    {
      id: 4,
      landId: "56037-XDER",
      buyer: "Tress1234",
      price: 0.2345,
      date: "20/11/24",
    },
  ];
};
