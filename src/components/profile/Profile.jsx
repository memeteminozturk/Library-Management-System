import React from "react";
import "./Profile.css";
import { FaCircleUser } from "react-icons/fa6";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-icon">
          <FaCircleUser
            size={10}
            style={{
              color: "#f0f0f0",
              backgroundColor: "#333",
              borderRadius: "50%",
              alignItems: "center",
            }}
          />
        </div>
        <h2 className="profile-name">John Doe</h2>
      </div>
      <div className="profile-details">
        <div className="profile-detail">
          <strong>Email:</strong> johndoe@example.com
        </div>
        <div className="profile-detail">
          <strong>Membership:</strong> Premium
        </div>
        <div className="profile-detail">
          <strong>Joined:</strong> January 1, 2023
        </div>
        <div className="profile-detail">
          <strong>Books Borrowed:</strong> 12
        </div>
      </div>
    </div>
  );
};

export default Profile;
