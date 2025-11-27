import React, { useEffect, useState } from "react";
import { getImageByKey } from "./service/api.js"; // API call to fetch image
import styles from "./navigation.module.css";
import { Link } from "react-router-dom";

function Navigation() {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    // Fetch the logo image dynamically
    getImageByKey("logo")
      .then(res => {
        const imageData = res.data.data;
        if (res.data.status === "ok" && imageData?.image) {
          setLogoUrl(`http://localhost:5000/uploads/${imageData.image}`);
        } else {
          console.warn("Logo image not found, using fallback");
          setLogoUrl(null); // fallback can be added
        }
      })
      .catch(err => console.error("Network or server error:", err));
  }, []);

  return (
    <nav className={`bg-body-tertiary ${styles.navBar}`}>
      <div className="container-fluid">
        <div className="row align-items-center text-center">

          {/* Logo Section */}
          <div className="col-sm-12 col-md-3 d-flex justify-content-center justify-content-md-start align-items-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                width="60"
                height="55"
                className="me-2"
              />
            ) : (
              <div className="me-2" style={{ width: 60, height: 55, background: "#ccc" }} />
            )}
            <h1 className={styles.brandName}>Learnify</h1>
          </div>

          {/* Navigation Links */}
          <div className="col-sm-12 col-md-6 mt-2 mt-md-0">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a className={`nav-link ${styles.customLink}`} href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link to="/faqs" className={`nav-link ${styles.customLink}`}>
                  Faqs
                </Link>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.customLink}`} href="#">
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${styles.customLink}`} to="/contacts">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Login Button */}
          <div className="col-sm-12 col-md-3 mt-2 mt-md-0 text-center text-md-end">
            <Link to="/login">
              <button className={styles.loginButton}>Log in</button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navigation;
