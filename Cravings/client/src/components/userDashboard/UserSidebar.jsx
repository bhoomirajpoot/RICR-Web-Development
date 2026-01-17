import React from 'react'
import { TbChartBubble } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { RiCustomerService2Fill } from "react-icons/ri";

const Sidebar = ({ active, setActive }) => {
  return (
    <div className='p-3'>
      <div className='text-xl font-bold'>
        User Dashboard
      </div>
      <hr />

      <div className='grid gap-3 p-6'>
        <button
          className={`
            flex gap-3 items-center p-3 rounded-xl
            ${active === "overview" ? "bg-blue-500 text-white" : "hover:bg-gray-100/70"}
          `}
          onClick={() => setActive('overview')}
        >
          <TbChartBubble />
          Overview
        </button>

        <button
          className={`
            flex gap-3 items-center p-3 rounded-xl
            ${active === "profile" ? "bg-blue-500 text-white" : "hover:bg-gray-100/70"}
          `}
          onClick={() => setActive('profile')}
        >
          <CgProfile />
          Profile
        </button>

        <button
          className={`
            flex gap-3 items-center p-3 rounded-xl
            ${active === "orders" ? "bg-blue-500 text-white" : "hover:bg-gray-100/70"}
          `}
          onClick={() => setActive('orders')}
        >
          <FaShoppingCart />
          Orders
        </button>

        <button
          className={`
            flex gap-3 items-center p-3 rounded-xl
            ${active === "transaction" ? "bg-blue-500 text-white" : "hover:bg-gray-100/70"}
          `}
          onClick={() => setActive('transaction')}
        >
          <GrTransaction />
          Transaction
        </button>

        <button
          className={`
            flex gap-3 items-center p-3 rounded-xl
            ${active === "helpDesk" ? "bg-blue-500 text-white" : "hover:bg-gray-100/70"}
          `}
          onClick={() => setActive('helpDesk')}
        >
          <RiCustomerService2Fill />
          Help Desk
        </button>
      </div>
    </div>
  )
}

export default Sidebar
