'use client'
import React from 'react'
import { ChevronRight } from 'lucide-react'


export type RecentActivity = {
  id: number
  type: 'approval' | 'received' | 'purchased'
  name: string
  description: string
  status?: 'Approved' | 'Rejected'
  amount?: string
  date?: string
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

// Recent Activities Component
export const RecentActivities = ({ activities }: { activities: RecentActivity[] }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[#000000]">Recent Activities</h2>
        <ViewAllButton />
      </div>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center border-b border-dashed py-[14px] gap-3">
            <div className=" w-10 h-10 rounded-lg flex items-center justify-center">
            <img src="/recentPro.svg" alt="recent activity profile" className='w-10 h-10' />
            </div>
            
            <div className="flex-1">
              <div className="text-sm font-medium text-[#090914]">{activity.name}</div>
              <div className="text-sm text-[#7E8299]">{activity.description}</div>
            </div>
            
            {activity.status && (
              <div className={`text-sm font-semibold ${activity.status === 'Approved' ? 'text-[#50CD89] bg-[#E8FFF3] py-1 px-2 rounded-xl' : 'text-[#F1416C] py-1 px-2 rounded-xl bg-[#FFF5F8]'}`}>
                {activity.status}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export const generateRecentActivitiesData = (): RecentActivity[] => {
  return [
    { 
      id: 1, 
      type: 'approval',
      name: 'Land name or id', 
      description: 'Land Approval',
      status: 'Approved' 
    },
    { 
      id: 2, 
      type: 'received',
      name: 'ETH Received', 
      description: '0.025 ETH received by you'
    },
    { 
      id: 3, 
      type: 'approval',
      name: 'Land name or id', 
      description: 'Land Approval',
      status: 'Rejected' 
    },
    { 
      id: 4, 
      type: 'purchased',
      name: 'Name of land', 
      description: 'Purchased by you for 0.3 ETH'
    }
  ]
}