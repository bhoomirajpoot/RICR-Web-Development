import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import UserSideBar from "../../components/userDashboard/UserSidebar";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserTransactions from "../../components/userDashboard/UserTransactions";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();

  // 🔹 Check if navigate sent a tab to open
  useEffect(() => {
    const tab = location.state?.openTab;
    if (tab) {
      setActive(tab);
      setIsCollapsed(false); // sidebar open
    }
  }, [location]);

  return (
    <div className="w-full h-screen flex overflow-hidden">

      {/* Sidebar */}
      <div
        className={`bg-(--color-background) duration-300 ${
          isCollapsed ? "w-2/60" : "w-12/60"
        }`}
      >
        <UserSideBar
          active={active}
          setActive={setActive}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Main Content */}
      <div className={`duration-300 p-6 overflow-y-auto ${
          isCollapsed ? "w-58/60" : "w-48/60"
        }`}>
        {active === "overview" && <UserOverview />}
        {active === "profile" && <UserProfile />}
        {active === "orders" && <UserOrders />}
        {active === "transactions" && <UserTransactions />}
        {active === "helpdesk" && <UserHelpDesk />}
      </div>

    </div>
  );
};

export default UserDashboard;
