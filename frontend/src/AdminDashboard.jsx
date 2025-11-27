import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo1 from "./assets/images/logo3.png";
import { getUsers, showSubscription } from "./service/api.js";
import {
  FaHome,
  FaUsers,
  FaCreditCard,
  FaFolder,
  FaBrain,
  FaChartLine,
  FaFileInvoice,
  FaCog,
  FaBell,
  FaUserCircle,
  FaBookOpen,
  FaFileAlt,
} from "react-icons/fa";
import styles from "./admindashboard.module.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  // API function to fetch subscriptions
  const fetchSubscriptions = async () => {
    try {
      const response = await showSubscription();
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setError('Failed to fetch subscriptions');
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchSubscriptions()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Calculate stats from real data
  const calculateStats = () => {
    const totalUsers = users.length;
    const activeSubscriptions = users.filter(user => user.isSubscribed).length;
    const totalSubscriptionPlans = subscriptions.length;

    return {
      totalUsers,
      activeSubscriptions,
      totalSubscriptionPlans,
      // Keep some placeholder stats for now
      aiCalls: "40,320",
      monthlyRevenue: "PKR 152,000",
      notesGenerated: "12,540",
      reports: "32"
    };
  };

  const stats = calculateStats();

  // ✅ Added path for each sidebar item (for routing)
  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/AdminDashboard" },
    { icon: <FaUsers />, label: "Users", path: "/UsersView" },
    { icon: <FaCreditCard />, label: "Subscriptions", path: "/MaintainSubscription" },
    { icon: <FaFolder />, label: "Content", path: "/ContentView" },
    { icon: <FaBrain />, label: "AI Control", path: "/AIControl" },
    { icon: <FaChartLine />, label: "Analytics", path: "/Analytics" },
    { icon: <FaFileInvoice />, label: "Reports", path: "/Reports" },
    { icon: <FaCog />, label: "Settings", path: "/Settings" },
  ];

  const statsArray = [
    { title: "Total Users", value: stats.totalUsers.toString(), icon: <FaUsers /> },
    { title: "Active Subscriptions", value: stats.activeSubscriptions.toString(), icon: <FaCreditCard /> },
    { title: "AI Calls", value: stats.aiCalls, icon: <FaBrain /> },
    { title: "Monthly Revenue", value: stats.monthlyRevenue, icon: <FaChartLine /> },
    { title: "Notes Generated", value: stats.notesGenerated, icon: <FaBookOpen /> },
    { title: "Reports", value: stats.reports, icon: <FaFileAlt /> },
  ];

  return (
    <div className={`container-fluid ${styles.appContainer}`}>
      <div className="row g-0">
        
        <aside className={`col-12 col-md-3 col-lg-2 ${styles.sidebarCol}`}>
          <div className={styles.sidebarInner}>
            <div className="col-sm-12 col-md-3 d-flex justify-content-center justify-content-md-start align-items-center ">
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

       
        <main className={`col-12 col-md-9 col-lg-10 ${styles.mainCol}`}>
         
          <div className={styles.topbar}>
            <h5 className={styles.topbarTitle}>Dashboard</h5>
            <div className={styles.topbarRight}>
              <FaBell className={styles.topIcon} />
              <FaUserCircle className={styles.topIcon} />
            </div>
          </div>

        
          <div className="row mt-4 text-center">
          
            <div className="col-12 col-md-8 ">
              <div className={styles.largeCard}>
                <div className={styles.largeCardHeader}>
                  <h5>Platform Overview</h5>
                  <span className={styles.largeCardBadge}>October 2025</span>
                </div>
                <p className={styles.largeCardText}>
                  Welcome to admin dashboard! Track user engagement, AI calls, and financial performance here.
                </p>

                <div className={styles.largeCardStats}>
                  <div>
                    <h6>Users</h6>
                    <p>{loading ? "Loading..." : stats.totalUsers}</p>
                  </div>
                  <div>
                    <h6>Revenue</h6>
                    <p>{loading ? "Loading..." : stats.monthlyRevenue}</p>
                  </div>
                  <div>
                    <h6>AI Calls</h6>
                    <p>{loading ? "Loading..." : stats.aiCalls}</p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="col-12 col-md-4">
              <div className={styles.shortCard}>
                <h6>Server Status</h6>
                <p>All Systems Operational</p>
              </div>
              <div className={styles.shortCard}>
                <h6>Active Subscriptions</h6>
                <p>{loading ? "Loading..." : `${stats.activeSubscriptions} active`}</p>
              </div>
            </div>
          </div>


          <div className="container mt-4">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="row g-3">
              {statsArray.map((s, idx) => (
                <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className={styles.cardBox}>
                    <div className={styles.cardIcon}>{s.icon}</div>
                    <div>
                      <h6 className="mb-1">{s.title}</h6>
                      <h5 className="fw-bold">{s.value}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
