import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import EditProfileModal from './modals/EditProfileModalOpen';

const UserProfile = () => {

  const { isEditProfileModalOpen, setIsEditProfileModalOpen } = useState(false);

  const { user } = useAuth();

  return (
    <>
      <div className='flex gap-10'>
        <div>
          <span>Name:</span> <span>{user.fullName}</span>
        </div>
        <div>
          <span>Email:</span> <span>{user.email}</span>
        </div>
        <div>
          <span>MobileNumber:</span> <span>{user.mobileNumber}</span>
        </div>

        <button className='border px-5 py-2 bg-amber-400'
          onClick={() => setIsEditProfileModalOpen(true)}
        >
          Edit Profile</button>
      </div>

      {isEditProfileModalOpen && (<EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />)}

    </>
  );
};

export default UserProfile