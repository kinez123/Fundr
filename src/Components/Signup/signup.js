import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabaseClient/supabase"; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, and numbers";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.userType) {
      newErrors.userType = "Please select a User Type";
    }

    // Terms and Conditions
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must agree to the Terms and Conditions";
    }

    // If there are any errors, display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      // Sign up the user with supabase.auth
      const { user, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        throw signUpError;
      }

      // Insert user data into the public.users table
      const { data, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            user_id: user.id,  // Use the auto-generated user ID from supabase.auth
            name: formData.name,
            email: formData.email,
            role: formData.userType,  // Assuming userType is stored as role in users table
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      alert("Registration successful!");
      navigate('/home');

      // Clear form after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
        termsAccepted: false,
      });

    } catch (error) {
      console.error("Error: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-800">
      <div className="w-full max-w-md bg-gray-100 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-purple-600 mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="form-group">
            <label className="block text-sm font-medium text-black mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-purple-500 hover:ring-2 hover:ring-purple-300"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="block text-sm font-medium text-black mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-purple-500 hover:ring-2 hover:ring-purple-300"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-purple-500 hover:ring-2 hover:ring-purple-300"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="block text-sm font-medium text-black mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-purple-500 hover:ring-2 hover:ring-purple-300"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* User Type */}
          <div className="form-group">
            <label className="block text-sm font-medium text-black mb-1">
              User Type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-purple-500 hover:ring-2 hover:ring-purple-300"
            >
              <option value="">Select User Type</option>
              <option value="donor">Donor</option>
              <option value="campaign creator">Campaign Creator</option>
              <option value="admin">Administrator</option>
            </select>
            {errors.userType && (
              <p className="text-red-600 text-sm mt-1">{errors.userType}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="form-group flex items-center space-x-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label className="text-sm text-black">
              I agree to the{" "}
              <Link to="/terms" className="text-purple-600 hover:underline">
                Terms and Conditions
              </Link>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-600 text-sm mt-1">{errors.termsAccepted}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-black">
            Already have an account?{" "}
            <Link to="/" className="text-purple-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
