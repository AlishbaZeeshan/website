import { useEffect, useState } from "react";
import styles from "./footer.module.css";
import { getImageByKey } from "./service/api";

function Footer() {
  const [fbUrl, setFbUrl] = useState(null);
  const [instaUrl, setInstaUrl] = useState(null);
  const [twitterUrl, setTwitterUrl] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  // Fetch all images dynamically
  useEffect(() => {
    getImageByKey("fb")
      .then(res => {
        if (res.data.status === "ok" && res.data.data?.image) {
          setFbUrl(`http://localhost:5000/uploads/${res.data.data.image}`);
        }
      })
      .catch(err => console.error("FB image fetch error:", err));

    getImageByKey("insta")
      .then(res => {
        if (res.data.status === "ok" && res.data.data?.image) {
          setInstaUrl(`http://localhost:5000/uploads/${res.data.data.image}`);
        }
      })
      .catch(err => console.error("Insta image fetch error:", err));

    getImageByKey("twitter")
      .then(res => {
        if (res.data.status === "ok" && res.data.data?.image) {
          setTwitterUrl(`http://localhost:5000/uploads/${res.data.data.image}`);
        }
      })
      .catch(err => console.error("Twitter image fetch error:", err));

    getImageByKey("logo")
      .then(res => {
        if (res.data.status === "ok" && res.data.data?.image) {
          setLogoUrl(`http://localhost:5000/uploads/${res.data.data.image}`);
        }
      })
      .catch(err => console.error("Logo image fetch error:", err));
  }, []);

  return (
    <div className={styles.footerContainer}>
      <div>
        <h5>Company</h5>
        <p>About us</p>
        <p>Career</p>
        <p>Blog</p>
        <p>Contact</p>
      </div>

      <div>
        <h5>Resources</h5>
        <p>Notes Generator</p>
        <p>Quiz Generator</p>
        <p>Audio Learning</p>
        <p>Video Learning</p>
      </div>

      <div>
        <h5>Legal</h5>
        <p>Privacy Policy</p>
        <p>Terms and Conditions</p>
      </div>

      <div className={styles.brandContainer}>
        <div className={styles.logoRow}>
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" width="50" height="50" className={styles.logoImage} />
          ) : (
            <div style={{ width: 50, height: 50, backgroundColor: "#ccc" }} />
          )}
          <span className={styles.logoText}>Learnify</span>
        </div>

        <div className={styles.socialIcons}>
          {fbUrl ? <img src={fbUrl} alt="Facebook" className={styles.icon} /> : <div style={{ width: 24, height: 24, backgroundColor: "#ccc" }} />}
          {instaUrl ? <img src={instaUrl} alt="Instagram" className={styles.icon} /> : <div style={{ width: 24, height: 24, backgroundColor: "#ccc" }} />}
          {twitterUrl ? <img src={twitterUrl} alt="Twitter" className={styles.icon} /> : <div style={{ width: 24, height: 24, backgroundColor: "#ccc" }} />}
        </div>
      </div>
    </div>
  );
}

export default Footer;
