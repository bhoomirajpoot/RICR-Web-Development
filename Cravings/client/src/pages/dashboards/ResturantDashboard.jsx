import React, { useState, useEffect } from "react";
import RestaurantSideBar from "../../components/restaurantDashboard/RestaurantSideBar";
import RestaurantOverview from "../../components/restaurantDashboard/RestaurantOverview";
import RestaurantOrders from "../../components/restaurantDashboard/RestaurantOrders";
import RestaurantMenu from "../../components/restaurantDashboard/RestaurantHelpDesk";
import RestaurantProfile from "../../components/restaurantDashboard/RestaurantProfile";
import RestaurantHelpDesk from "../../components/restaurantDashboard/RestaurantEarnings";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ResturantDashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();

  const [active, setActive] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  if (role !== "manager") {
    return (
      <div className="p-3">
        <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
          <div className="text-5xl text-red-600">⊗</div>
          <div className="text-xl">
            You are not logged in as Restaurant Manager. Please login again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[90vh] flex">
   
      <div
        className={`bg-(--color-background) duration-300 ${
          isCollapsed ? "w-2/60" : "w-12/60"
        }`}
      >
        <RestaurantSideBar
          active={active}
          setActive={setActive}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      <div
        className={`${
          isCollapsed ? "w-58/60" : "w-48/60"
        } duration-300`}
      >
        {active === "overview" && <RestaurantOverview />}
        {active === "orders" && <RestaurantOrders />}
        {active === "menu" && <RestaurantMenu />}
        {active === "profile" && <RestaurantProfile />}
        {active === "helpdesk" && <RestaurantHelpDesk />}
      </div>
    </div>
  );
};

export default ResturantDashboard;
