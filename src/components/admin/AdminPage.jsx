import React, { useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";
import { useSelector } from "react-redux";


const AdminPage = () => {

  const user = useSelector((state) => state.user.user);

  // id: user id
  // qr: book qr code
  // newPenalty: new penalty amount
  const updatePenalty = async (id, qr, newPenalty) => {
    try {
      const response = await axios.put("/api/library/updatePenalty/" + id + "/" + qr + "?newPenalty=" + newPenalty);
      console.log(response.data);
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      console.log(response.data);
    }
    catch (err) {
      console.error(err.message);
    }
  }

  // id: user id
  const getUserLoans = async (id) => {
    try {
      const response = await axios.get("/api/library/getLoan/" + id);
      console.log(response.data);
    }
    catch (err) {
      console.error(err.message);
    }
  }


  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <a href="#dashboard">Dashboard</a>
          </li>
          <li>
            <a href="#users">Kullanıcılar</a>
          </li>
          <li>
            <a href="#settings">Ayarlar</a>
          </li>
          <li>
            <a href="#logout">Çıkış Yap</a>
          </li>
        </ul>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <h1>Dashboard</h1>
        </header>
        <section id="dashboard" className="admin-section">
          <h2>Admin Paneline Hoşgeldiniz</h2>
          <p>Buradan uygulama ayarlarınızı ve kullanıcılarınızı yönetebilirsiniz.</p>
        </section>
        <section id="users" className="admin-section">
          <h2>Kullanıcı Yönetimi</h2>
          <p>Kullanıcıları buradan yönetebilirsiniz.</p>
        </section>
        <section id="settings" className="admin-section">
          <h2>Uygulama Ayarları</h2>
          <p>Uygulama ayarlarını buradan yapabilirsiniz.</p>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
