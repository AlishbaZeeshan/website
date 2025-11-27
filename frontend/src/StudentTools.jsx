import { useEffect, useState } from "react";
import { getImageByKey } from "./service/api.js";
import styles from "./studenttools.module.css";

function StudentReviews() {
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const keys = ["note", "quiz", "home_audiocard_image", "video"];
      const fetchedImages = {};

      for (let key of keys) {
        try {
          const res = await getImageByKey(key);
          if (res.data.status === "ok" && res.data.data?.image) {
            fetchedImages[key] = `http://localhost:5000/uploads/${res.data.data.image}`;
          }
        } catch (err) {
          console.error(`Error fetching image for ${key}:`, err);
        }
      }

      setImages(fetchedImages);
    };

    fetchImages();
  }, []);

  const tools = [
    {
      title: "Notes",
      key: "note",
      description:
        "Automatically generate clear, concise notes from PDFs, uploaded files, or copied content. Organized in bullet points for easy understanding.",
    },
    {
      title: "Quizzes",
      key: "quiz",
      description:
        "Create customized quizzes based on your notes to reinforce concepts and improve preparation. Ideal for testing understanding and tracking progress.",
    },
    {
      title: "Audio Notes",
      key: "home_audiocard_image",
      description:
        "Record audio or upload audio files and transform them into structured notes. Perfect for capturing lectures or discussions on the go.",
    },
    {
      title: "Video Notes",
      key: "video",
      description:
        "Upload videos or provide a YouTube link and instantly generate notes. Summarizes lectures into bullet points for efficient learning and review.",
    },
  ];

  return (
    <div className={`container ${styles.studentContainer}`}>
      <h2 className={styles.heading}>Student Learning Tools</h2>
      <p className={styles.description}>
        Enhance your study experience with smart tools designed to simplify
        note-taking, practice quizzes, and efficient learning from audio or
        video lectures.
      </p>

      <div className="row g-4">
        {tools.map((tool, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-3">
            <div className={`${styles.cardBox} card h-100`}>
              {images[tool.key] ? (
                <img
                  src={images[tool.key]}
                  alt={tool.title}
                  className={styles.cardImage}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    backgroundColor: "#eee",
                  }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{tool.title}</h5>
                <p className="card-text">{tool.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentReviews;
