import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css"; 
import Navbar from '../Navbar/Navbar';

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "Donor", // Default to Donor, but user can change
    avatar: "https://via.placeholder.com/120", // Placeholder for avatar
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // Fetch user data from backend
    axios
      .get("https://api.example.com/user/1") // Replace with your API endpoint
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Handle user profile update
    axios
      .put("https://api.example.com/user/1", user) // Replace with your API endpoint
      .then(() => alert("Profile updated successfully!"))
      .catch((err) => console.error("Error updating profile:", err));
  };

  return (
    <div className="profile-container">
      <Navbar/>
      <div className="header-section">
        <div className="avatar-container">
          <img src={user.avatar} alt="Profile Avatar" />
          {isEditable && (
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="avatar-input"
            />
          )}
        </div>
        <div className="user-info">
          <h1>{user.fullName || "Full Name"}</h1>
          <p>{user.email || "Email"} - {user.userType}</p>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            disabled={!isEditable}
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!isEditable}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="New password"
            onChange={handleChange}
            disabled={!isEditable}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={handleChange}
            disabled={!isEditable}
          />

          <label>User Type</label>
          <select
            name="userType"
            value={user.userType}
            onChange={handleChange}
            disabled={!isEditable}
          >
            <option value="Donor">Donor</option>
            <option value="Admin">Admin</option>
            <option value="Campaign Creator">Campaign Creator</option>
          </select>

          <div className="form-actions">
            {!isEditable ? (
              <button type="button" onClick={() => setIsEditable(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button type="submit">Save</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsEditable(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export { UserProfile };
export default UserProfile;
