import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './success.module.css';

const Success = () => {
  const location = useLocation();
  const [planName, setPlanName] = useState('');
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const demo = params.get('demo');
    const sessionId = params.get('session_id');

    if (plan) {
      setPlanName(plan);
    }
    if (demo) {
      setIsDemo(true);
    }
    if (sessionId) {
      setPlanName('Your Selected Plan'); // Real Stripe session
      setIsDemo(false);
    }
  }, [location]);

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.icon}>✅</div>
        <h1>Payment Successful!</h1>

        {isDemo && (
          <div className={styles.demoNotice}>
            <p><strong>Demo Mode:</strong> This is a test transaction</p>
          </div>
        )}

        <p>Thank you for subscribing to the plan!</p>

        <div className={styles.details}>
          <h3>What's Next?</h3>
          <ul>
            <li>Check your email for a confirmation receipt</li>
            <li>Your subscription is now active</li>
            <li>You have access to all premium features</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <a href="/" className={styles.homeButton}>
            Go to Dashboard
          </a>
          <a href="/subscription" className={styles.plansButton}>
            View Plans
          </a>
        </div>
      </div>
    </div>
  );
};

export default Success;