import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImageByKey } from "./service/api.js"; // API to fetch image
import styles from "./description.module.css";

function Courses() {
  const [picUrl, setPicUrl] = useState(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Get Started button clicked");
    navigate("/registrationPage");
  };

  useEffect(() => {
    getImageByKey("mainpic") // Fetch pic1 dynamically
      .then(res => {
        const imageData = res.data.data;
        if (res.data.status === "ok" && imageData?.image) {
          setPicUrl(`http://localhost:5000/uploads/${imageData.image}`);
        } else {
          console.warn("Main picture not found, using fallback");
          setPicUrl(null); // optional fallback
        }
      })
      .catch(err => console.error("Network or server error:", err));
  }, []);

  return (
    <div className={`container ${styles.containerMargin}`}>
      <div className="row align-items-center">

        {/* Text Section */}
        <div className="col-sm-12 col-md-6 text-center">
          <h2 className={styles.headingTop}>Learn Smarter,</h2>
          <h2 className={styles.headingBottom}>Achieve Faster</h2>
          <p className={styles.description}>
            Learnify is your smart study companion - create notes, generate
            quizzes, and learn from audio or video easily.
          </p>

          <div className={styles.buttonContainer}>
            <button
              className={styles.startButton}
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-sm-12 col-md-6 text-center">
          {picUrl ? (
            <img
              src={picUrl}
              alt="Main Pic"
              width="500"
              height="450"
              className="img-fluid"
            />
          ) : (
            <div style={{ width: 500, height: 450, backgroundColor: "#ccc" }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
