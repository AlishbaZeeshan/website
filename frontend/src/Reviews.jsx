import React from "react";
import styles from "./reviews.module.css";

function Reviews() {
  const reviews = [
    {
      name: "Alishba Zeeshan",
      review:
        "This platform has helped me take better notes and save so much study time!",
    },
    {
      name: "Ayesha Nawaz",
      review:
        "The quizzes are amazing for practice. I feel much more confident in my exams.",
    },
    {
      name: "Maryam Mohsin",
      review:
        "Audio notes feature is a game-changer for me! I never miss anything in lectures now.",
    },
    {
      name: "Aneeza Farooq",
      review:
        "Video notes are so helpful, especially for revising before tests. Highly recommended!",
    },
    {
      name: "Palwasha Zeeshan",
      review:
        "Everything is so organized and easy to use. Makes studying much less stressful.",
    },
  ];

  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.heading}>What Students Say !</h2>
      <p className={styles.description}>
        Hear from our students about their learning journey, experiences, and the
        impact our platform has had on their studies.
      </p>

      <div className="container">
        <div className="row g-4">
          {reviews.map((item, index) => (
            <div key={index} className="col-sm-12 col-md-6 col-lg-4">
              <div className={styles.card}>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
