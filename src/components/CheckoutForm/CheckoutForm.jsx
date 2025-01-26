import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({
  amount,
  selectedTrainer,
  selectedSlot,
  selectedPlan,
  classId,
}) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { amount })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [axiosSecure, amount]);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
            phone: phoneNumber,
            address: address,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        name: user?.displayName,
        email: user.email,
        price: amount,
        transactionId: paymentIntent.id,
        selectedTrainer,
        selectedSlot,
        selectedPlan,
        classId,
        date: new Date(),
        status: "pending",
        phone: phoneNumber,
        address: address,
      };

      const res = await axiosSecure.post("/payments", payment);
      console.log(res.data)
      if (res.data?.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payment successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">Complete Your Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label className="block text-sm font-bold text-gray-700" htmlFor="phone">
            Name
          </label>
          <input
            type="text"
            id="phone"
            value={user?.displayName}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-3 border rounded-lg w-full"
            placeholder="Enter your phone number"
          />
        </div>
      <div>
          <label className="block text-sm font-bold text-gray-700" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-3 border rounded-lg w-full"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 p-3 border rounded-lg w-full"
            placeholder="Enter your address"
          />
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#333",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#e3342f",
              },
            },
          }}
          className="p-3 border rounded-lg"
        />
        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-lg bg-gray-700 hover:bg-gray-800 transition ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!stripe || !clientSecret || isProcessing}
        >
          {isProcessing ? "Processing..." : `Pay $${amount}`}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      {transactionId && (
        <p className="mt-4 text-green-600 text-center">
          Payment Successful! Transaction ID: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;






// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect } from "react";
// import { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";

// const CheckoutForm = ({
//   amount,
//   selectedTrainer,
//   selectedSlot,
//   selectedPlan,
//   classId,
// }) => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const [clientSecret, setClientSecret] = useState("");
//   const [error, setError] = useState("");
//   const [transactionId, setTransactionId] = useState("");

//   useEffect(() => {
//     axiosSecure
//       .post("/create-payment-intent", { amount: amount })
//       .then((res) => {
//         console.log(res.data.clientSecret);
//         setClientSecret(res.data.clientSecret);
//       });
//   }, [axiosSecure, amount]);

//   const stripe = useStripe(); // Get the Stripe instance
//   const elements = useElements();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.error("Payment error:", error);
//       setError(error.message);
//     } else {
//       console.log("Payment method created:", paymentMethod);
//       setError("");
//     }

//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             email: user?.email || "anonymous",
//             name: user?.displayName || "anonymous",
//           },
//         },
//       });

//     if (confirmError) {
//       console.log("confirm error");
//     } else {
//       console.log("payment intent", paymentIntent);
//       if (paymentIntent.status === "succeeded") {
//         console.log("transaction id", paymentIntent.id);
//         setTransactionId(paymentIntent.id);

        
//         const payment = {
//           email: user.email,
//           price: amount,
//           transactionId: paymentIntent.id,
//           selectedTrainer: selectedTrainer,
//           selectedSlot: selectedSlot,
//           selectedPlan: selectedPlan,
//           classId: classId,
//           date: new Date(),
//           status: "pending",
//         };

//         const res = await axiosSecure.post("/payments", payment);
//         console.log("payment saved", res.data);

//         // if (res.data?.result?.insertedId) {
//         //     Swal.fire({
//         //         position: "top-end",
//         //         icon: "success",
//         //         title: "Thank you for the taka paisa",
//         //         showConfirmButton: false,
//         //         timer: 1500
//         //     });
//         //     // navigate('/dashboard/paymentHistory')
//         // }
//       }
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: "16px",
//               color: "#424770",
//               "::placeholder": {
//                 color: "#aab7c4",
//               },
//             },
//             invalid: {
//               color: "#9e2146",
//             },
//           },
//         }}
//       />
//       <button
//         className="btn bg-blue-400"
//         type="submit"
//         disabled={!stripe || !clientSecret}
//       >
//         Pay
//       </button>
//       <p className="text-red-600">{error}</p>
//     </form>
//   );
// };

// export default CheckoutForm;
