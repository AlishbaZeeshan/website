import { useEffect, useState } from "react";
import { getImageByKey } from "./service/api.js"; // API to fetch image by key
import styles from "./info.module.css";

function Info() {
  const [heroImg, setHeroImg] = useState(null);

  // Info.jsx (Change the .then() block)
 useEffect(() => {
  getImageByKey("info_section_image")
    .then(res => {
      const imageData = res.data.data;
      if (res.data.status === "ok" && imageData?.image) {
        setHeroImg(`http://localhost:5000/uploads/${imageData.image}`); // or use imported url
      } else {
        console.warn("Image not found", res.data);
      }
    })
    .catch(err => console.error("Network or server error:", err));
}, []);



  return (
    <div className={`container ${styles.infoContainer}`}>
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-12 col-md-7 text-center mb-4 mb-md-0">
          {heroImg ? (
            <img
              src={heroImg}
              alt="Info Section"
              className={styles.infoImage}
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>

        {/* Text Section */}
        <div className="col-12 col-md-5 text-center">
          <h2 className={styles.headingTop}>Study Smart,</h2>
          <h2 className={styles.headingBottom}>Not Hard</h2>

          <div className={styles.textBox}>
            <p>Organize your study material easily</p>
            <p>Save time with AI-powered summaries</p>
            <p>Revise faster with smart quizzes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
