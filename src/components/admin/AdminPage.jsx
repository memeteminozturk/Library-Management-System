import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [penalties, setPenalties] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const updatePenalty = async (id, qr, newPenalty) => {
    try {
      const response = await axios.put(
        `/api/library/updatePenalty/${id}/${qr}?newPenalty=${newPenalty}`
      );
      console.log(response.data);
      alert("Ceza başarıyla güncellendi!");
      getUsers(); // Kullanıcı listesini yeniden yükleyin
    } catch (err) {
      console.error(err.message);
      alert("Ceza güncellenirken bir hata oluştu!");
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/user");
      setUsers(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handlePenaltyChange = (userId, value) => {
    setPenalties((prevPenalties) => ({
      ...prevPenalties,
      [userId]: value,
    }));
  };

  const handleUpdateClick = (userId, qr) => {
    const newPenalty = penalties[userId];
    updatePenalty(userId, qr, newPenalty);
  };

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
          <p>
            Buradan uygulama ayarlarınızı ve kullanıcılarınızı yönetebilirsiniz.
          </p>
        </section>
        <section id="users" className="admin-section">
          <h2>Kullanıcı Yönetimi</h2>
          <p>Kullanıcıları buradan yönetebilirsiniz.</p>
          <div className="user-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <p>
                  <strong>Kullanıcı ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Adı:</strong> {user.name}
                </p>
                <p>
                  <strong>Mevcut Ceza:</strong> {user.penalty}
                </p>
                <input
                  type="number"
                  placeholder="Yeni Ceza"
                  value={penalties[user.id] || ""}
                  onChange={(e) => handlePenaltyChange(user.id, e.target.value)}
                />
                <button onClick={() => handleUpdateClick(user.id, user.qr)}>
                  Güncelle
                </button>
              </div>
            ))}
          </div>
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
