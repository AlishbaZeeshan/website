import { useEffect, useState } from "react";
import { getwholeuserData, deleteUserbyUser, UpdateUserByUser } from "./service/api.js";
import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";


function Profile() {
 

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      setLoading(true);
      const userdata = await getwholeuserData();
      console.log("Fetched User:", userdata);
      setUser(userdata);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data. Please log in again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await UpdateUserByUser(user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        await deleteUserbyUser(user._id);
        alert("Account deleted successfully!");
        navigate("/register");
      } catch (err) {
        console.error("Error deleting account:", err);
        alert("Failed to delete account.");
      }
    }
  };

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (error) return <div className={styles.center}>{error}</div>;
  if (!user) return <div className={styles.center}>User data not available.</div>;

  return (
    <div className={styles.center}>
      
      <form onSubmit={handleUpdate} style={{ maxWidth: "600px", width: "100%" }}> {/* Slightly bigger form */}
        <h2 style={{ marginBottom: "20px",color:"darkblue" }}>Profile Page</h2> {/* Added heading */}
        <input id="firstName" value={user.firstName || ""} onChange={handleChange} className="form-control mb-2" />
        <input id="lastName" value={user.lastName || ""} onChange={handleChange} className="form-control mb-2" />
        <input id="email" type="email" value={user.email || ""} onChange={handleChange} className="form-control mb-2" />
        <input id="dob" type="date" value={user.dob ? user.dob.split("T")[0] : ""} onChange={handleChange} className="form-control mb-2" />
        <select id="field" value={user.field || ""} onChange={handleChange} className="form-control mb-2">
          <option value="">Select Field</option>
          <option>Computer Science</option>
          <option>Mathematics</option>
          <option>Biology</option>
          <option>Physics</option>
          <option>Other</option>
        </select>
        <select id="education" value={user.education || ""} onChange={handleChange} className="form-control mb-3">
          <option value="">Select Education</option>
          <option>School</option>
          <option>College</option>
          <option>University</option>
          <option>Other</option>
        </select>
        <div className="d-flex justify-content-between">
          <button type="submit" className={styles.actionBtn}>Edit Profile</button>
          <button type="button" className={styles.actionBtn} onClick={handleDelete}>Delete User</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
