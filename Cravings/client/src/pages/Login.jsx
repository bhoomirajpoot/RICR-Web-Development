import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setValidationError({});
  };

  const validate = () => {
    let Error = {};

    if (!formData.email) {
      Error.email = "Email is required";
    }

    if (!formData.password) {
      Error.password = "Password is required";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      toast.error("Fill the form correctly");
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);

      handleClearForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
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
            Login
          </h1>
        
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <form
            onSubmit={handleSubmit}
            onReset={handleClearForm}
            className="p-8 space-y-4"
          >
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
              />
              {validationError.email && (
                <span className="text-xs text-red-500">
                  {validationError.email}
                </span>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
              />
              {validationError.password && (
                <span className="text-xs text-red-500">
                  {validationError.password}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <button
                type="reset"
                disabled={isLoading}
                className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-bold"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
