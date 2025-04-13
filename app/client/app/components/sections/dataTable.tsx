"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MoreVertical, ChevronDown } from "lucide-react"
import { Pagination } from "../ui/pagination"

export type Column<T> = {
  key: keyof T
  header: string
  width?: string
  render?: (value: T[keyof T], item: T) => React.ReactNode
  align?: "left" | "center" | "right"
}

type DataTableProps = {
  statusFilter?: boolean
}

export function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch (status) {
      case "Verified User":
      case "Verified Land":
        return "bg-green-100 text-green-600"
      case "Registration":
        return "bg-gray-100 text-gray-600"
      case "Transfer":
        return "bg-blue-100 text-blue-600"
      case "Flagged":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusStyles()}`}>{status}</span>
}

export default function DataTable({ statusFilter = true }: DataTableProps) {
  const [currentFilter, setCurrentFilter] = useState("Status")
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState("5")
  const [showRowsDropdown, setShowRowsDropdown] = useState(false)
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  const actionMenuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setShowActionMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const statusOptions = ["Status", "Verified", "Registration", "Transfer", "Flagged"]
  const rowsOptions = ["5", "10", "20", "50"]

  const columns: Column<typeof data[0]>[] = [
    { key: "id", header: "NO", width: "w-[60px]" },
    { key: "landId", header: "LAND ID" },
    {
      key: "owner",
      header: "OWNERS NAME",
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center overflow-hidden">
            <img src="/pro.svg" alt="" className="w-7 h-7" />
          </div>
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "price",
      header: "PRICE",
      render: (value) => (
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <img src="/ethIcon.svg" alt="" />
          </div>
          <span>{value}</span>
        </div>
      ),
    },
    { key: "date", header: "DATE" },
    {
      key: "status",
      header: "STATUS",
      render: (value) => <StatusBadge status={value as string} />,
    },
  ]

  const actionMenu = {
    label: "Approved/Bought",
    items: ["View", "Approve", "Reject", "Flag"],
    primaryItem: "View",
  }

  const data = [
    {
      id: 1,
      landId: "56037-XDER",
      owner: "Xeusthegreat",
      price: "0.2345",
      date: "20/11/24",
      status: "Verified User",
    },
    {
      id: 2,
      landId: "56037-XDER",
      owner: "Xeusthegreat",
      price: "0.2345",
      date: "20/11/24",
      status: "Registration",
    },
    {
      id: 3,
      landId: "56037-XDER",
      owner: "Xeusthegreat",
      price: "0.2345",
      date: "20/11/24",
      status: "Transfer",
    },
    {
      id: 4,
      landId: "56037-XDER",
      owner: "Xeusthegreat",
      price: "0.2345",
      date: "20/11/24",
      status: "Flagged",
    },
    {
      id: 5,
      landId: "56037-XDER",
      owner: "Xeusthegreat",
      price: "0.2345",
      date: "20/11/24",
      status: "Verified Land",
    },
  ]

  const toggleActionMenu = (id: number) => {
    setShowActionMenu(showActionMenu === id ? null : id)
  }

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 w-full">
      {statusFilter && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by land, location or others..."
                className="pl-10 w-full sm:w-[350px] h-10 px-3 py-4 placeholder:text-[#4B5675] bg-[#F9F9F9] rounded-xl"
              />
            </div>
          </div>

          <div className="relative w-full sm:w-[150px]">
            <div
              className="flex items-center justify-between w-full px-3 py-2 rounded-md bg-[#F9F9F9] cursor-pointer"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <span>{currentFilter}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
            {showStatusDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {statusOptions.map((option) => (
                  <div
                    key={option}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCurrentFilter(option)
                      setShowStatusDropdown(false)
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {data.map((item) => (
          <div key={item.id} className="mb-4 p-4 border rounded-lg bg-white shadow-sm">
            {columns.map((column) => (
              <div key={column.key as string} className="flex justify-between mb-3">
                <span className="font-medium text-gray-500">{column.header}</span>
                <span className="text-right">
                  {column.render 
                    ? column.render(item[column.key], item)
                    : item[column.key]}
                </span>
              </div>
            ))}
            {actionMenu && (
              <div className="pt-3 mt-3 border-t flex justify-end relative" ref={actionMenuRef}>
                <button
                  className="p-1 rounded-md bg-[#F9F9F9] hover:bg-[#cacad1]/85"
                  onClick={() => toggleActionMenu(item.id)}
                >
                  <MoreVertical className="h-4 w-4 text-[#7E8299] hover:text-[#6E62E5]" />
                </button>
                {showActionMenu === item.id && (
                  <div className="absolute right-0 mt-8 w-[160px] bg-white border rounded-md shadow-lg z-10">
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b">
                      {actionMenu.label}
                    </div>
                    {actionMenu.items.map((menuItem, i) => (
                      <div
                        key={i}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                          actionMenu.primaryItem === menuItem ? "text-primary" : ""
                        }`}
                        onClick={() => setShowActionMenu(null)}
                      >
                        {menuItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-dashed border-[#7E82994D]/30">
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className={`px-4 py-3 text-left text-sm font-medium text-[#7E8299] whitespace-nowrap ${
                    column.width ? column.width : ""
                  } ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                      ? "text-center"
                      : ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
              {actionMenu && (
                <th className="w-[80px] px-4 py-3 text-right text-sm font-medium text-gray-500">
                  ACTIONS
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-dashed border-[#7E82994D]/30 hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className={`px-4 py-6 text-md font-semibold2 text-[#3F4254] whitespace-nowrap ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                        ? "text-center"
                        : ""
                    }`}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </td>
                ))}
                {actionMenu && (
                  <td className="px-4 py-4 text-sm text-right relative">
                    <div className="inline-block relative" ref={actionMenuRef}>
                      <button
                        className="p-1 rounded-md bg-[#F9F9F9] hover:bg-[#cacad1]/85"
                        onClick={() => toggleActionMenu(index)}
                      >
                        <MoreVertical className="h-4 w-4 text-[#7E8299] hover:text-[#6E62E5]" />
                      </button>

                      {showActionMenu === index && (
                        <div className="absolute right-0 mt-1 w-[160px] bg-white border rounded-md shadow-lg z-10">
                          <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b">
                            {actionMenu.label}
                          </div>
                          {actionMenu.items.map((item, i) => (
                            <div
                              key={i}
                              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                                actionMenu.primaryItem === item ? "text-primary" : ""
                              }`}
                              onClick={() => setShowActionMenu(null)}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <div className="relative w-[70px]">
            <div
              className="flex items-center justify-between w-full px-3 py-1 rounded-md bg-[#F9F9F9] cursor-pointer"
              onClick={() => setShowRowsDropdown(!showRowsDropdown)}
            >
              <span>{rowsPerPage}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
            {showRowsDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                {rowsOptions.map((option) => (
                  <div
                    key={option}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-center"
                    onClick={() => {
                      setRowsPerPage(option)
                      setShowRowsDropdown(false)
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-3">
          <Pagination currentPage={currentPage} totalPages={4} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}