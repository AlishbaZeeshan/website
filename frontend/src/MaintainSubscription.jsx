import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./maintainsubscription.module.css";
import { addSubscription ,showSubscription,deleteSubscription} from "./service/api";

// Zod schema for validation
const schema = z.object({
  planName: z.string().min(2, { message: "Plan name must be at least 2 characters" }),
  price: z.number({ 
        invalid_type_error: "Price must be a number" 
    }).min(0, { message: "Price cannot be negative" }),
  description: z.string().min(1, { message: "Description is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  feature1: z.string().min(2, { message: "Features must be at least 2 characters" }),
  feature2: z.string().min(2, { message: "Features must be at least 2 characters" }),
  feature3: z.string().min(2, { message: "Features must be at least 2 characters" }),

});

function MaintainSubscription() {
  const [subscriptions, setSubscriptions] = useState([ ]);

  const [showForm, setShowForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async(data) => {
     try {
          console.log("Sending to backend:", data);
          await addSubscription(data); // POST to backend using Axios
          console.log("Data sent successfully!");
          await getsubscriptionData();
        } catch (error) {
          console.error("Error posting data:", error);
        }
    
    reset();
    setShowForm(false);
  };
useEffect(()=>{
 getsubscriptionData();
},[]);
const getsubscriptionData=async ()=>{
const result= await showSubscription();
setSubscriptions(result.data);
};
  const handleDelete = async (id) => {
  try {
    const result = await deleteSubscription(id);
    setSubscriptions(result.data); 
  } catch (error) {
    console.error("Error deleting:", error);
  }
};

   
  

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Subscription Plans</h2>

     
      {!showForm && (
        <button className={styles.addBtnTop} onClick={() => setShowForm(true)}>
          Add Subscription
        </button>
      )}

      
      {showForm && (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <h3>Add New Subscription</h3>

          <input
            type="text"
            
            placeholder="Plan Name"
            {...register("planName")}
            className={styles.formInput}
          />
          {errors.planName && <p className={styles.errorMsg}>{errors.planName.message}</p>}

          <input
            type="text"
            placeholder="Price ($)"
            {...register("price", { valueAsNumber: true })}
            className={styles.formInput}
          />
          {errors.price && <p className={styles.errorMsg}>{errors.price.message}</p>}


           <input
            type="text"
            placeholder="Description"
            {...register("description")}
            className={styles.formInput}
          />
          {errors.description && <p className={styles.errorMsg}>{errors.description.message}</p>}

          <input
            type="text"
            placeholder="Duration"
            {...register("duration")}
            className={styles.formInput}
          />
          {errors.duration && <p className={styles.errorMsg}>{errors.duration.message}</p>}
           
          <input
            type="text"
            placeholder="Feature 1"
            {...register("feature1")}
            className={styles.formInput}
          />
          {errors.feature1 && <p className={styles.errorMsg}>{errors.feature1.message}</p>}
          

           <input
            type="text"
            placeholder="Feature 2"
            {...register("feature2")}
            className={styles.formInput}
          />
          {errors.feature2 && <p className={styles.errorMsg}>{errors.feature2.message}</p>}


           <input
            type="text"
            placeholder="Feature 3"
            {...register("feature3")}
            className={styles.formInput}
          />
          {errors.feature3 && <p className={styles.errorMsg}>{errors.feature3.message}</p>}
          

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>Add</button>
          </div>
        </form>
      )}

      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Feature1</th>
            <th>Feature2</th>
            <th>Feature3</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub._id}>
              <td>{sub.planName}</td>
              <td>${sub.price}</td>
              <td>{sub.description}</td>
              <td>{sub.duration}</td>
              <td>{sub.feature1}</td>
              <td>{sub.feature2}</td>
              <td>{sub.feature3}</td>
              
              <td>
                <button className={styles.deleteBtn} onClick={() => handleDelete(sub._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MaintainSubscription;
