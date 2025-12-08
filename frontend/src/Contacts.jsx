import { useEffect, useState } from "react";
import styles from "./contacts.module.css";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { postcontact, getImageByKey } from "./service/api"; // Import getImageByKey
import { useUsername } from "./UserContext.jsx";

// Validation imports
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Define validation schema with Zod
const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});

function Contacts() {
  const { username } = useUsername();
  const [success, setSuccess] = useState(false);
  const [contactImg, setContactImg] = useState(null);

  // ✅ Setup react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ Form submission handler
  const onSubmit = async (data) => {
    try {
      await postcontact(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.log("Not saved");
    }
  };

  // ✅ Fetch contact image dynamically
  useEffect(() => {
    getImageByKey("contact")
      .then(res => {
        const imageData = res.data.data;
        if (res.data.status === "ok" && imageData?.image) {
          setContactImg(`http://localhost:5000/uploads/${imageData.image}`);
        } else {
          console.warn("Contact image not found, using fallback");
          setContactImg(null);
        }
      })
      .catch(err => console.error("Network or server error:", err));
  }, []);

  return (
    <div className={styles.contactPage}>
      {/* Header Section */}
      <div className={styles.contactContainer}>
        <div className={styles.textCenter}>
          <h1 className={styles.heading}>Get in Touch</h1>
          {username && (
        <p className="text-center" style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          Hello {username}, what would you like to share with us today?
        </p>
      )}

          <Link to="/" className={styles.subheading}>
            Home {'>'} Contact
          </Link>
        </div>

        <div className={`${styles.emailBox} mx-auto col-10 col-sm-8 col-md-6 col-lg-4`}>
          <h5 className={styles.emailTitle}>
            <FaEnvelope className={styles.icon} /> E-mail
          </h5>
          <p className={styles.emailText}>support@learnify.ai</p>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left image */}
          <div className="col-md-6 text-center mb-4 mb-md-0">
            {contactImg ? (
              <img
                src={contactImg}
                alt="Contact Illustration"
                className="img-fluid"
                style={{ maxWidth: "80%" }}
              />
            ) : (
              <div style={{ width: "80%", height: 300, backgroundColor: "#ccc", margin: "0 auto" }} />
            )}
          </div>

          {/* Right form */}
          <div className="col-md-6">
            <h2 className={styles.formHeading}>Drop Us a Line</h2>
            <p>
              Reach out to us from our contact form and we will get back to you
              shortly.
            </p>

            {/* ✅ Hook Form */}
            <form className={styles.formBox} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="form-control"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-control"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  placeholder="Type your message"
                  className="form-control"
                  {...register("message")}
                ></textarea>
                {errors.message && (
                  <p className="text-danger">{errors.message.message}</p>
                )}
              </div>

              <button type="submit" className={styles.button}>
                Send Message
              </button>

              {success && <p className="text-success mt-2">Message Sent!</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
