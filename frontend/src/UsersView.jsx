import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./userview.module.css";
import { getUsers, editUser, deleteUser } from "./service/api.js"; // ✅ added editUser & deleteUser

// Zod schema for validation
const schema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  dob: z.string().nonempty({ message: "Date of Birth is required" }),
  field: z.string().nonempty({ message: "Field of study is required" }),
  education: z.string().nonempty({ message: "Education level is required" }),
});

function UserView() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ✅ Fetch all users on mount
  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    try {
      const result = await getUsers();
      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ Handle delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      alert("User deleted successfully!");
      setUsers(users.filter((user) => user._id !== id)); // remove from UI
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user!");
    }
  };

  // ✅ Handle click to edit user
  const handleEditClick = (user) => {
    setEditingUser(user);
    reset(user); // fill form with existing data
  };

  // ✅ Handle submit after editing
  const onSubmit = async (data) => {
    try {
      await editUser(editingUser._id, data);
      alert("User updated successfully!");
      setEditingUser(null); // close edit form
      getUsersData(); // refresh list
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>User Management</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
            <th>Field of Study</th>
            <th>Education Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.dob}</td>
              <td>{user.field}</td>
              <td>{user.education}</td>
              <td>
                <button className={styles.editBtn} onClick={() => handleEditClick(user)}>
                  Edit
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>Edit User</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.formLabel}>First Name</label>
            <input className={styles.formInput} {...register("firstName")} />
            {errors.firstName && <p className={styles.errorMsg}>{errors.firstName.message}</p>}

            <label className={styles.formLabel}>Last Name</label>
            <input className={styles.formInput} {...register("lastName")} />
            {errors.lastName && <p className={styles.errorMsg}>{errors.lastName.message}</p>}

            <label className={styles.formLabel}>Email</label>
            <input type="email" className={styles.formInput} {...register("email")} />
            {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}

            <label className={styles.formLabel}>Password</label>
            <input type="password" className={styles.formInput} {...register("password")} />
            {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}

            <label className={styles.formLabel}>Date of Birth</label>
            <input type="date" className={styles.formInput} {...register("dob")} />
            {errors.dob && <p className={styles.errorMsg}>{errors.dob.message}</p>}

            <label className={styles.formLabel}>Field of Study</label>
            <select className={styles.formSelect} {...register("field")}>
              <option value="">Select Field</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Biology</option>
              <option>Physics</option>
              <option>Other</option>
            </select>
            {errors.field && <p className={styles.errorMsg}>{errors.field.message}</p>}

            <label className={styles.formLabel}>Education Level</label>
            <select className={styles.formSelect} {...register("education")}>
              <option value="">Select Education</option>
              <option>School</option>
              <option>College</option>
              <option>University</option>
              <option>Other</option>
            </select>
            {errors.education && <p className={styles.errorMsg}>{errors.education.message}</p>}

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setEditingUser(null)}>
                Cancel
              </button>
              <button type="submit" className={styles.submitBtn}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserView;
