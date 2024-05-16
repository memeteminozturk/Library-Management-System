import React from "react";
import "./AdminPage.css";

const AdminPage = () => {
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
