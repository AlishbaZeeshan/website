import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaUpload, FaBook, FaChartLine, FaBolt } from "react-icons/fa";
import styles from "./dashboard.module.css";
import { useUsername } from "./UserContext.jsx";

import { fetchUsername, getImageByKey } from "./service/api"; // import getImageByKey

function Dashboard() {
  const { username, setUsername } = useUsername(); 
  const [message, setMessage] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);
  const navigate = useNavigate();

  // Fetch logged-in user's first name
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUsername();
        if (data.firstName) {
          setUsername(data.firstName); // store firstName in context
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };
    getUser();
  }, [navigate, setUsername]);


  // Fetch logo dynamically
  useEffect(() => {
    getImageByKey("logo")
      .then(res => {
        const imageData = res.data.data;
        if (res.data.status === "ok" && imageData?.image) {
          setLogoUrl(`http://localhost:5000/uploads/${imageData.image}`);
        } else {
          console.warn("Logo not found, using fallback");
          setLogoUrl(null);
        }
      })
      .catch(err => console.error("Network or server error:", err));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Button clicked");
    setMessage("Generating your notes...");
  };

  return (
    <div className={styles.dashboard}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container-fluid">
          <div className={styles.logoSection}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className={styles.logoImage} />
            ) : (
              <div style={{ width: 60, height: 55, backgroundColor: "#ccc" }} />
            )}
            <span className={styles.logoText}>Learnify</span>
          </div>
          <div className="ms-auto d-flex align-items-center">
            <a href="#" className={styles.navLink}>My Notes</a>
            <span
              className={styles.navLink}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            >
              Profile
            </span>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="container text-center mt-5">
        <h2 className={styles.welcome}>
           Welcome back, {username ? username : "User"}!
        </h2>
        <p className={styles.subtitle}>
          Ready to explore? Choose how you'd like to get started today.
        </p>
      </div>

      {/* Stats Section */}
      <div className="container my-5">
        <div className="row text-center justify-content-center">
          <div className="col-md-3 mb-3">
            <div className={styles.statBox}>
              <h4>0</h4>
              <p><FaBook /> Total Notes</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className={styles.statBox}>
              <h4>0</h4>
              <p><FaBolt /> Study Sessions</p>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className={styles.statBox}>
              <h4>0</h4>
              <p><FaChartLine /> Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4">
            <div className={styles.cardBox}>
              <FaMicrophone className={styles.iconBlue} size={40} />
              <h4>Record Lecture</h4>
              <p>Record and transcribe your lectures with AI-powered note-taking.</p>
              <button className={styles.blueBtn} onClick={handleClick}>
                Get Started 
              </button>
            </div>
          </div>

          <div className="col-md-5 mb-4">
            <div className={styles.cardBox}>
              <FaUpload className={styles.iconGreen} size={40} />
              <h4>Upload Document</h4>
              <p>Upload PDFs or images to extract text and generate study notes.</p>
              <button className={styles.greenBtn} onClick={handleClick}>
                Get Started
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className="text-center mt-3">
            <p className="text-primary">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
