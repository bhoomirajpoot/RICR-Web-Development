import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/public/new-contact", formData);
      toast.success(res.data.message || "Message sent successfully");
      handleClearForm();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you 💬
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} onReset={handleClearForm}>
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-indigo-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-indigo-500"
              />

              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                maxLength="10"
                value={formData.mobileNumber}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-indigo-500"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                // rows="4"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>

              <button
                type="reset"
                disabled={isLoading}
                className="flex-1 bg-gray-300 font-bold py-3 rounded-lg hover:bg-gray-400 transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          We usually respond within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default Contact;
