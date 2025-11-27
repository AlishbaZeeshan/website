import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./loginpage.module.css";
import { postloginCredentials, getImageByKey } from "./service/api.js";

// ✅ Schema validation using Zod
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ Fetch logo dynamically
  useEffect(() => {
    getImageByKey("logo")
      .then(res => {
        if (res.data.status === "ok" && res.data.data?.image) {
          setLogoUrl(`http://localhost:5000/uploads/${res.data.data.image}`);
        } else {
          console.warn("Logo not found");
          setLogoUrl(null);
        }
      })
      .catch(err => console.error("Network or server error:", err));
  }, []);

  // ✅ Handle valid form submission
  const onSubmit = async (data) => {
    try {
      const response = await postloginCredentials(data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.role === "admin") {
        reset();
        navigate("/AdminDashboard");
      } else if (response.data.role === "user") {
        reset();
        navigate("/Dashboard");
      }
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className={`container-fluid ${styles.pageBackground}`}>
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className={styles.loginBox}>
            <div className={`mb-4 ${styles.logoRow}`}>
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo"
                  width="50"
                  height="50"
                  className={styles.logoImage}
                />
              ) : (
                <div style={{ width: 50, height: 50, backgroundColor: "#ccc" }} />
              )}
              <h2 className={styles.title}>LogIn</h2>
            </div>

            {/* ✅ Use handleSubmit from React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Username field */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label text-white">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Email"
                  className="form-control"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-danger">{errors.username.message}</p>
                )}
              </div>

              {/* Password field */}
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label htmlFor="password" className="form-label text-white">
                    Password
                  </label>
                  <a href="#" className={styles.forgotLink}>
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="form-control"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>

              {/* ✅ Correct button without Link */}
              <div className={`text-center ${styles.buttonContainer}`}>
                <button type="submit" className={styles.loginButton}>
                  Login
                </button>
              </div>
            </form>

            <p className={`text-center text-white mt-3 ${styles.signupText}`}>
              Don’t have an account?{" "}
              <Link to="/registrationpage" className={styles.signupLink}>
                Sign up right now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
