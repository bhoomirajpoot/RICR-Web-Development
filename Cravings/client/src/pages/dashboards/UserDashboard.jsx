import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from '../../components/userDashboard/userSidebar'
import UserOverview from '../../components/userDashboard/UserOverview';


const UserDeshboard = () => {
  const [active, setActive] = useState();

  return (
    <>
      <div>
        <div className="w-full h-[90vh] flex"></div>
        <div className='bg-(--color-background) w-10/50'>
          <UserSidebar active={active} setActive={setActive} />
        </div>
        <div className='border border-amber-700 w-8/10'>
          {active === 'overview' && <UserOverview />}
          {active === 'profile' && <UserProfile />}
          {active === 'orders' && <UserOrders />}
          {active === 'transaction' && <UserTransaction />}
          
          
          
        </div>
      </div>
    </>
  )
}

export default UserDeshboard