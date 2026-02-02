import React, { useState } from "react";
import api from "../../../config/Api";
import toast from "react-hot-toast";

const AddMenuItemModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    isVeg: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/menu/add", formData); // backend route
      toast.success("Menu item added successfully");
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">

        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Add Menu Item</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Item Name *"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price *"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="category"
            placeholder="Category (Pizza, Burger...) *"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isVeg"
                checked={formData.isVeg === true}
                onChange={() => setFormData({ ...formData, isVeg: true })}
              />
              Veg
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isVeg"
                checked={formData.isVeg === false}
                onChange={() => setFormData({ ...formData, isVeg: false })}
              />
              Non-Veg
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-(--color-secondary) text-white rounded"
            >
              {loading ? "Saving..." : "Add Item"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddMenuItemModal;
