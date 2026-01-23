import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
//import EditProfileModal from "./modal/EditProfileModal"; // path fixed
import EditProfileModal from "../../components/userDashboard/modals/EditProfileModal"; // Correct path

const UserProfile = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const { user } = useAuth(); // get user data from Auth context

  return (
    <>
      <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-xl shadow-md max-w-md mx-auto mt-10">
        <div>
          <span className="font-bold">Name: </span>
          <span>{user.fullName}</span>
        </div>
        <div>
          <span className="font-bold">Email: </span>
          <span>{user.email}</span>
        </div>
        <div>
          <span className="font-bold">Phone: </span>
          <span>{user.mobileNumber}</span>
        </div>
        <div className="mt-4">
          <button
            className="bg-pink-500 px-6 py-2 rounded-2xl hover:bg-amber-400 transition"
            onClick={() => setIsEditProfileModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserProfile;
