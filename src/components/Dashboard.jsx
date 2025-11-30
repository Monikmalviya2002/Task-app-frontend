import React from 'react'
import Navbar from './Navbar'
import LeftSidebar from './leftSideBar'
import Task from './Tasks.jsx'

const Dashboard = () => {
  return (
      <div className="flex min-h-screen">
      <LeftSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 flex-1">
         <Task/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
