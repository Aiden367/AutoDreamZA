// components/CheckoutSteps.tsx
import React from 'react';
//import styles from './CheckoutSteps.module.css';
import { Link, useLocation } from 'react-router-dom';

const steps = ['Cart', 'Delivery', 'Payment', 'Confirmation'];

const CheckoutSteps: React.FC = () => {
  const location = useLocation();

  const getActiveStep = () => {
    if (location.pathname.includes('delivery')) return 'Delivery';
    if (location.pathname.includes('payment')) return 'Payment';
    if (location.pathname.includes('confirmation')) return 'Confirmation';
    return 'Cart';
  };

  const activeStep = getActiveStep();

  return (
    <div className="checkout-steps">
      {steps.map((step, index) => (
        <Link to={`/checkout/${step.toLowerCase()}`} key={index} className={`step ${activeStep === step ? 'active' : ''}`}>
          <span>{step}</span>
          {index < steps.length - 1 && <span className="arrow">›</span>}
        </Link>
      ))}
    </div>
  );
};

export default CheckoutSteps;
