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
            <a href="#users">Users</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
          <li>
            <a href="#logout">Logout</a>
          </li>
        </ul>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <h1>Dashboard</h1>
        </header>
        <section id="dashboard" className="admin-section">
          <h2>Welcome to the Admin Dashboard</h2>
          <p>Here you can manage your application settings and user data.</p>
        </section>
        <section id="users" className="admin-section">
          <h2>User Management</h2>
          <p>Manage your users here.</p>
        </section>
        <section id="settings" className="admin-section">
          <h2>Application Settings</h2>
          <p>Configure application settings here.</p>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
