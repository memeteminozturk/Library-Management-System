import React from "react";
import "./Profile.css";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setUser({}));
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-icon">
          <FaCircleUser
            size={145}
            style={{
              color: "#f0f0f0",
              backgroundColor: "#333",
              borderRadius: "50%",
              alignItems: "center",
            }}
          />
        </div>
        <h2 className="profile-name">{user?.username2}</h2>
      </div>
      <div className="profile-details">
        <div className="profile-detail">
          <strong>E-posta:</strong> {user?.email2}
        </div>
        <div className="profile-detail">
          <strong>Üyelik Türü:</strong> {user?.membershipType}
        </div>
        <div className="profile-detail">
          <strong>Katılma Tarihi:</strong> {formatDateTime(user?.membershipDate)}
        </div>
        {/* <div className="profile-detail">
          <strong>Ödünç Alınan Kitaplar:</strong> 12
        </div> */}
        <button className="profile-button" onClick={logout}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Profile;
