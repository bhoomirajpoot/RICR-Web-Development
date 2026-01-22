import React from 'react'

const EditProfileModal = ({ onClose }) => {
  return (
    <>
      <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-100'>

        <div className='bg-white w-5xl max-h-[85vh] overflow-y-auto'>
          <div>EditProfileModal</div>
          <button onClick={() => onClose()}></button>
        </div>

      </div>
    </>
  )
}

export default EditProfileModal