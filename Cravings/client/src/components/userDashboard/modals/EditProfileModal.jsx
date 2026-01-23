import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useAuth(); // assume setUser updates user in AuthContext

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    mobileNumber: user?.mobileNumber || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);

    // Update user context if setUser exists
    if (setUser) setUser({ ...user, ...formData });

    onClose();
  };

  const handleReset = () => {
    setFormData({
      fullName: user?.fullName || "",
      mobileNumber: user?.mobileNumber || "",
      email: user?.email || "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
      <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center bg-indigo-50 p-4">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
          >
            X
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition"
          />

          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition"
          />

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
