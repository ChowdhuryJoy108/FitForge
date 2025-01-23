import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ amount, selectedTrainer,selectedSlot, selectedPlan,classId  }) => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("")

  useEffect(() => {
    axiosSecure.post("/create-payment-intent",{amount:amount})
    .then(res =>{
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret);
    })
  }, [axiosSecure, amount]);

  const stripe = useStripe(); // Get the Stripe instance
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    // Example: Create a payment intent
    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Payment error:", error);
      setError(error.message)
    } else {
      console.log("Payment method created:", paymentMethod);
      setError("")
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })


    if (confirmError) {
        console.log('confirm error')
    }
    else {
        console.log('payment intent', paymentIntent)
        if (paymentIntent.status === 'succeeded') {
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);

            // now save the payment in the database
            const payment = {
                email: user.email,
                price: amount,
                transactionId: paymentIntent.id,
                selectedTrainer: selectedTrainer,
                selectedSlot:selectedSlot,
                selectedPlan:selectedPlan,
                classId:classId,
                date: new Date(), 
                status: 'pending'
            }

            const res = await axiosSecure.post('/payments', payment);
            console.log('payment saved', res.data);
         
            if (res.data?.result?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for the taka paisa",
                    showConfirmButton: false,
                    timer: 1500
                });
                // navigate('/dashboard/paymentHistory')
            }

        }
    }

  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn bg-blue-400" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
    </form>
  );
};

export default CheckoutForm;
