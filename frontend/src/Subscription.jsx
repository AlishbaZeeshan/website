import  { useEffect, useState } from "react";
import styles from "./subscription.module.css";
import { displaysubscription ,createCheckoutSession} from "./service/api.js"; // import your API call

function Subscription() {
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await displaysubscription();
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        setMessage("Failed to load subscription plans. Please try again later.");
      }
    };

    fetchPlans();
  }, []);

 

const handleSelect = async (planId) => {
  try {
    // Check if user is logged in
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in to subscribe to a plan.");
      return;
    }

    const response = await createCheckoutSession(planId);

    // Stripe checkout link from backend
    window.location.href = response.data.url;

  } catch (error) {
    console.error("Error creating checkout session:", error);
    console.error("Error details:", error.response?.data);

    if (error.response?.status === 401) {
      setMessage("Please log in to subscribe to a plan.");
    } else {
      setMessage(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  }
};


  return (
    <div className={styles.subscriptionWrapper}>
      <div className={`${styles.subscriptionContainer} container-fluid`}>
        <h1 className={styles.heading}>Our Subscription Plans</h1>
        <p className={styles.subText}>
          Choose a plan that matches your study goals and learning style.
        </p>

        <div className="row justify-content-center">
          {plans.map((plan, index) => (
            <div key={index} className="col-12 col-sm-12 col-md-4 col-lg-4 mb-4">
              <div className={styles.planBox}>
                <h3 className={styles.planTitle}>{plan.planName}</h3>
                <h2 className={styles.planPrice}>${plan.price}</h2>
                <p className={styles.planDescription}>{plan.description}</p>

                <div className={styles.featuresList}>
                  {/* directly show feature1–3 */}
                  {plan.feature1 && <div>• {plan.feature1}</div>}
                  {plan.feature2 && <div>• {plan.feature2}</div>}
                  {plan.feature3 && <div>• {plan.feature3}</div>}
                </div>

                <button
  className={styles.selectButton}
  onClick={() => handleSelect(plan._id)}  // or plan.planId
>
  Select
</button>

              </div>
            </div>
          ))}
        </div>

        {message && <p className="text-white mt-3">{message}</p>}
      </div>
    </div>
  );
}

export default Subscription;
