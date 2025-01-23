import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Helmet } from "react-helmet-async";

const Payment = () => {
  const location = useLocation();
  const { trainer, selectedSlot, selectedPlan, classId } = location.state || {};
  console.log(trainer, selectedSlot, selectedPlan, classId);
  const { price } = selectedPlan;

  const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);

  return (
    <div>
      <Helmet>
        <title>FitForge | Payment </title>
      </Helmet>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={price}
            selectedTrainer={trainer}
            selectedSlot={selectedSlot}
            classId={classId}
            selectedPlan={selectedPlan}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
