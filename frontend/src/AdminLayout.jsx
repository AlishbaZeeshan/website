// AdminLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo1 from "./assets/images/logo3.png";
import {
  FaHome,
  FaUsers,
  FaCreditCard,
  FaFolder,
  FaBrain,
  FaChartLine,
  FaFileInvoice,
  FaCog,
} from "react-icons/fa";
import styles from "./admindashboard.module.css";

const AdminLayout = () => {
  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/admindashboard" },
    { icon: <FaUsers />, label: "Users", path: "/usersview" },
    { icon: <FaCreditCard />, label: "Subscriptions", path: "/MaintainSubscription" },
    { icon: <FaFolder />, label: "Content", path: "/ContentView" },
    { icon: <FaBrain />, label: "AI Control", path: "/AIControl" },
    { icon: <FaChartLine />, label: "Analytics", path: "/Analytics" },
    { icon: <FaFileInvoice />, label: "Reports", path: "/Reports" },
    { icon: <FaCog />, label: "Settings", path: "/Settings" },
  ];

  return (
    <div className={styles.appContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebarCol}>
        <div className={styles.sidebarInner}>
          <div className="d-flex align-items-center mb-3">
            <img
              src={logo1}
              alt="Logo"
              width="45"
              height="45"
              style={{ borderRadius: "50%" }}
              className="me-2"
            />
            <h1 className={styles.Name}>Learnify</h1>
          </div>

          <ul className={styles.menuList}>
            {menuItems.map((item, i) => (
              <li key={i} className={styles.menuItem}>
                <Link to={item.path} className={styles.menuLink}>
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainCol}>
        <Outlet /> {/* Child pages render here */}
      </main>
    </div>
  );
};

export default AdminLayout;
