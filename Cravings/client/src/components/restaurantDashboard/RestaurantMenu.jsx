import React, { useState } from "react";
import AddMenuItemModal from "./modals/AddMenuItemModal";

const RestaurantMenu = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-6 h-full overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">

          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Menu Management
            </h2>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2 bg-(--color-secondary) text-white rounded-lg hover:bg-(--color-secondary-hover)"
            >
              ➕ Add Item
            </button>
          </div>

         
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">
              Menu items will be displayed and managed here
            </p>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddMenuItemModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </>
  );
};

export default RestaurantMenu;
