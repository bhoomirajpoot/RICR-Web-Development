import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    qualification: "",
    score: "",
    course: "",
    batch: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBatchChange = (e) => {
    const value = e.target.value;
    if (formData.batch.includes(value)) {
      setFormData({
        ...formData,
        batch: formData.batch.filter((b) => b !== value),
      });
    } else {
      setFormData({
        ...formData,
        batch: [...formData.batch, value],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="bg-light min-vh-100">
    
      <div className="container-fluid bg-primary text-white p-3 d-flex justify-content-between">
        <h4>Coaching Registration</h4>
        <button className="btn btn-info">Student Login</button>
      </div>

      <div className="container bg-white p-4 mt-4 shadow rounded">
        <form onSubmit={handleSubmit}>

          <h5 className="text-primary">Personal Information</h5>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="mobile"
            placeholder="Mobile Number"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="dob"
            className="form-control mb-4"
            onChange={handleChange}
            required
          />

          <h5 className="text-primary">Academic Details</h5>

          <select
            name="qualification"
            className="form-select mb-3"
            onChange={handleChange}
            required
          >
            <option value="">Select Qualification</option>
            <option>10th</option>
            <option>12th</option>
            <option>Graduation</option>
            <option>Post Graduation</option>
          </select>

          <input
            type="text"
            name="score"
            placeholder="Percentage / Grade"
            className="form-control mb-4"
            onChange={handleChange}
            required
          />

          <h5 className="text-primary">Course Information</h5>

          <select
            name="course"
            className="form-select mb-3"
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option>Full Stack Development</option>
            <option>Data Science</option>
            <option>Java DSA</option>
            <option>Python DSA</option>
          </select>

          <div className="mb-4">
            <label className="me-3">
              <input type="checkbox" value="Morning" onChange={handleBatchChange} /> Morning
            </label>
            <label className="me-3">
              <input type="checkbox" value="Evening" onChange={handleBatchChange} /> Evening
            </label>
            <label>
              <input type="checkbox" value="Weekend" onChange={handleBatchChange} /> Weekend
            </label>
          </div>

          <button className="btn btn-success w-100">
            Submit Registration
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
