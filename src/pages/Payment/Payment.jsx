import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import PaymentLottie from '../../assets/lottie/PaymentLottie.json'

const Payment = () => {
  const location = useLocation();
  const { trainer, selectedSlot, selectedPlan, classId } = location.state || {};
  console.log(trainer, selectedSlot, selectedPlan, classId);
  const { price } = selectedPlan;

  const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);

  return (
    <div className="px-2 py-16">
      <Helmet>
        <title>FitForge | Payment </title>
      </Helmet>
      <div className="flex flex-col items-center lg:flex-row">
      <div className="flex w-1/2 flex-col items-center">
        <div className="w-full mb-8 max-w-sm lg:w-96">
          <Lottie animationData={PaymentLottie} />
        </div>
      </div>
     
      <div className=" w-full lg:w-1/2">
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
    </div>
  );
};

export default Payment;
