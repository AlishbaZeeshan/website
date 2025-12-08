import React from "react";
import styles from "./faqs.module.css";
import {Link} from "react-router-dom";
import { useUsername } from "./UserContext.jsx"; 

function Faqs() {
  const { username } = useUsername(); 
  const faqs = [
    {
      question: "How does Learnify create AI-powered notes?",
      answer:
        "Learnify uses artificial intelligence to analyze your uploaded PDFs, lectures, or recordings and automatically generate summarized notes for easy studying.",
    },
    {
      question: "Can I upload both PDFs and audio files?",
      answer:
        "Yes! You can upload PDFs, images, or even voice recordings. The system extracts key points and converts them into readable study notes.",
    },
    {
      question: "Is my uploaded data safe and private?",
      answer:
        "Absolutely. All your uploaded documents and audio files are processed securely and not shared with anyone.",
    },
    {
      question: "Can I edit the AI-generated notes?",
      answer:
        "Yes, you can review and edit the notes anytime to personalize them according to your study preferences.",
    },
    {
      question: "Does Learnify work for all subjects?",
      answer:
        "Learnify is designed to handle various subjects—from science and literature to business and technology—making it useful for all students.",
    },
  ];

  return (
    <div className={styles.faqPage}>
      {username && (
        <p className="text-center" style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          Hello {username}, what problem are you facing today?
        </p>
      )}
      <h2 className={styles.heading}>Frequently Asked Questions ?</h2>
      <Link to="/" className={styles.backtohome} >Home</Link>

      <div className={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqCard}>
            <h4 className={styles.question}>{faq.question}</h4>
            <p className={styles.answer}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faqs;
