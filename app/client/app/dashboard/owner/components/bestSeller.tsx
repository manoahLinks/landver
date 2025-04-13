'use client'
import React from 'react'
import { ChevronRight } from 'lucide-react'

// Types
export type BestSellerItem = {
  id: number
  landId: string
  buyer: string
  price: number
  date: string
}


// Shared "View all" button with chevron
export const ViewAllButton = () => {
  return (
    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
      View all
      <ChevronRight className="w-4 h-4 ml-1" />
    </button>
  )
}

// Best Seller Table Component
export const BestSellerTable = ({ items }: { items: BestSellerItem[] }) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[#000000]">Best Seller</h2>
        <ViewAllButton />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[#7E8299] text-sm border-b border-dashed">
              <th className="pb-2">NO</th>
              <th className="pb-2">LAND ID</th>
              <th className="pb-2">BUYER/ LAND NAME</th>
              <th className="pb-2">PRICE</th>
              <th className="pb-2">DATE</th>
            </tr>
          </thead>
          <tbody className=''>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-dashed text-[#3F4254] border-[#7E82994D]/30">
                <td className="py-7">{item.id}</td>
                <td className="py-7">{item.landId}</td>
                <td className="py-7">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-500 w-6 h-6 rounded-full flex items-center justify-center">
                      <img src="/pro.svg" alt="" />
                    </div>
                    {item.buyer}
                  </div>
                </td>
                <td className="py-7">
                  <div className="flex items-center gap-1">
                    <div className=" w-5 h-5 rounded-full flex items-center justify-center">
                      <img src="/ethIcon.svg" alt="" />
                    </div>
                    {item.price}
                  </div>
                </td>
                <td className="py-4 text-[#B5B5C3]">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



export const generateBestSellerData = (): BestSellerItem[] => {
  return [
    { id: 1, landId: '56037-XDER', buyer: 'Tress1234', price: 0.2345, date: '20/11/24' },
    { id: 2, landId: '56037-XDER', buyer: 'Tress1234', price: 0.2345, date: '20/11/24' },
    { id: 3, landId: '56037-XDER', buyer: 'Tress1234', price: 0.2345, date: '20/11/24' },
    { id: 4, landId: '56037-XDER', buyer: 'Tress1234', price: 0.2345, date: '20/11/24' },
  ]
}
