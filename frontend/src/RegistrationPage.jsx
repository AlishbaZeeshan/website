import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./registrationpage.module.css";
import { addUser, getImageByKey } from "./service/api.js";

const schema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  dob: z.string().nonempty({ message: "Date of Birth is required" }),
  field: z.string().nonempty({ message: "Select a field of study" }),
  education: z.string().nonempty({ message: "Select your education level" }),
});

function RegistrationForm() {
  const navigate = useNavigate();
  const [regImageUrl, setRegImageUrl] = useState(null);

  // ✅ Fetch registration image dynamically
  useEffect(() => {
    getImageByKey("regpage")
      .then(res => {
        if (res.data.status === "ok" && res.data.data?.image) {
          setRegImageUrl(`http://localhost:5000/uploads/${res.data.data.image}`);
        } else {
          console.warn("Registration image not found");
          setRegImageUrl(null);
        }
      })
      .catch(err => console.error("Network or server error:", err));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await addUser(data);
      console.log("Response from backend:", response.data);

      if (response.data.message) {
        alert(response.data.message); // show "User already exists" or error
        return;
      }

      alert("Registration successful!");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className={`container-fluid ${styles.mainContainer}`}>
      <div className={`row ${styles.formRow}`}>
        <div className="col-md-6 p-0">
          {regImageUrl ? (
            <img src={regImageUrl} alt="Registration" className={styles.formImage} />
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#ccc" }} />
          )}
        </div>

        <div className="col-md-6 p-4">
          <h3 className={styles.title}>Create Account</h3>
          <p className={styles.subtitle}>Learnify: Your study buddy for quizzes, notes & more</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input id="firstName" className="form-control mb-2" {...register("firstName")} />
            {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}

            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input id="lastName" className="form-control mb-2" {...register("lastName")} />
            {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}

            <label htmlFor="email" className="form-label">Email</label>
            <input id="email" type="email" className="form-control mb-2" {...register("email")} />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}

            <label htmlFor="password" className="form-label">Password</label>
            <input id="password" type="password" className="form-control mb-2" {...register("password")} />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}

            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input id="dob" type="date" className="form-control mb-2" {...register("dob")} />
            {errors.dob && <p className="text-danger">{errors.dob.message}</p>}

            <label htmlFor="field" className="form-label">Field of Study</label>
            <select id="field" className="form-control mb-2" {...register("field")}>
              <option value="">Select Field</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Biology</option>
              <option>Physics</option>
              <option>Other</option>
            </select>
            {errors.field && <p className="text-danger">{errors.field.message}</p>}

            <label htmlFor="education" className="form-label">Education Level</label>
            <select id="education" className="form-control mb-3" {...register("education")}>
              <option value="">Select Education</option>
              <option>School</option>
              <option>College</option>
              <option>University</option>
              <option>Other</option>
            </select>
            {errors.education && <p className="text-danger">{errors.education.message}</p>}

            <div className="d-flex justify-content-between">
              <button type="reset" className={styles.actionBtn}>Cancel</button>
              <button type="submit" className={styles.actionBtn}>Register</button>
            </div>

            <p className="mt-3">
              Already registered? <Link to="/login" style={{ color: "darkblue" }}>Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
