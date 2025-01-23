import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Radio,
} from "@material-tailwind/react";

import { Helmet } from "react-helmet-async";

const TrainerBooked = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { trainer, selectedSlot, day, classId } = location.state || {};
  const { name, profileImage, specialization = [] } = trainer || {};

  const membershipPlans = [
    {
      type: "Basic Membership",
      price: 10,
      benefits: ["Access to gym facilities during regular operating hours."],
    },
    {
      type: "Standard Membership",
      price: 50,
      benefits: [
        "All benefits of the basic membership.",
        "Access to group fitness classes such as yoga, spinning, and Zumba.",
        "Access to locker rooms and showers.",
      ],
    },
    {
      type: "Premium Membership",
      price: 100,
      benefits: [
        "All benefits of the standard membership.",
        "Access to personal training sessions with certified trainers.",
        "Use of additional amenities like a sauna or steam room.",
        "Discounts on additional services such as massage therapy or nutrition counseling.",
      ],
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState("");

  const handleJoinNow = () => {
    if (!selectedPlan) {
      alert("Please select a membership plan.");
      return;
    }
    navigate("/payment", {
      state: { trainer, selectedSlot, selectedPlan, classId },
    });
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>FitForge | Trainer Booking</title>
      </Helmet>
      <Card className="w-full max-w-[48rem] mx-auto shadow-lg">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-full flex items-center justify-between p-4 bg-gray-100"
        >
          <div className="flex items-center gap-4">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt={name || "Trainer"}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <Typography variant="h5" color="blue-gray">
                {name || "Trainer Name"}
              </Typography>
              <Typography color="gray" className="text-sm">
                Expertise: {specialization.join(", ") || "Not specified"}
              </Typography>
            </div>
          </div>
          <div>
            <Typography color="gray" className="text-sm">
              Selected Slot
            </Typography>
            <Typography variant="h6" color="blue-gray">
              {day}-{selectedSlot?.slotTime || "No slot selected"}
            </Typography>
          </div>
        </CardHeader>

        <CardBody>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-4 text-center"
          >
            Choose a Membership Plan
          </Typography>
          <div className="space-y-6">
            {membershipPlans.map((plan, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 flex items-start gap-4"
              >
                <Radio
                  id={plan.type}
                  name="membership"
                  value={plan.type}
                  onChange={(e) => setSelectedPlan(plan)}
                  checked={selectedPlan.type === plan.type}
                  className="mt-2"
                />
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {plan.type}
                  </Typography>
                  <Typography
                    color="gray"
                    className="text-sm mb-2"
                  >{`Price: $${plan.price}`}</Typography>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="gradient"
            className="w-full mt-6"
            onClick={handleJoinNow}
          >
            Join Now
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default TrainerBooked;

// import {
//   Card,
//   CardBody,
//   Typography,
//   Button,
//   Chip,
// } from "@material-tailwind/react";
// import { CardHeader, CardFooter } from "@material-tailwind/react";

// const TrainerBooking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { trainer, selectedSlot } = location.state || {};
//   console.log(trainer, selectedSlot);

//   function CheckIcon() {
//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={2}
//         stroke="currentColor"
//         className="h-3 w-3"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M4.5 12.75l6 6 9-13.5"
//         />
//       </svg>
//     );
//   }

//   if (!trainer || !selectedSlot) {
//     return (
//       <div className="container mx-auto p-6 text-center">
//         <Typography variant="h5" color="red" className="font-bold">
//           Error
//         </Typography>
//         <Typography variant="body1" color="gray">
//           Trainer details or selected slot is missing.
//         </Typography>
//         <Button
//           onClick={() => navigate("/")}
//           variant="gradient"
//           className="mt-4"
//         >
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   const packages = [
//     { name: "Basic", price: "$50" },
//     { name: "Standard", price: "$100" },
//     { name: "Premium", price: "$150" },
//   ];

//   return (
//     <div className="container mx-auto p-6">
//       <Card className="w-full shadow-md">
//         <CardBody>
//           <Typography
//             variant="h5"
//             color="blue-gray"
//             className="font-semibold mb-4"
//           >
//             Trainer: {trainer.name}
//           </Typography>
//           <Typography variant="body1" color="gray" className="mb-4">
//             <strong>Selected Slot:</strong> {selectedSlot.time}
//           </Typography>
//           <Typography variant="h6" className="mt-4">
//             Classes:
//           </Typography>
//           <ul className="list-disc ml-6 mt-2">
//             {/* {trainer.classes.map((cls, index) => (
//               <li key={index}>{cls}</li>
//             ))} */}
//           </ul>
//           <Typography variant="h6" className="mt-4">
//             Packages:
//           </Typography>
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             {packages.map((pkg, index) => (
//               <Card
//                 color="gray"
//                 variant="gradient"
//                 className="w-full max-w-[20rem] p-8"
//               >
//                 <CardHeader
//                   floated={false}
//                   shadow={false}
//                   color="transparent"
//                   className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
//                 >
//                   <Typography
//                     variant="small"
//                     color="white"
//                     className="font-normal uppercase"
//                   >
//                     standard
//                   </Typography>
//                   <Typography
//                     variant="h1"
//                     color="white"
//                     className="mt-6 flex justify-center gap-1 text-7xl font-normal"
//                   >
//                     <span className="mt-2 text-4xl">$</span>29{" "}
//                     <span className="self-end text-4xl">/mo</span>
//                   </Typography>
//                 </CardHeader>
//                 <CardBody className="p-0">
//                   <ul className="flex flex-col gap-4">
//                     <li className="flex items-center gap-4">
//                       <span className="rounded-full border border-white/20 bg-white/20 p-1">
//                         <CheckIcon />
//                       </span>
//                       <Typography className="font-normal">
//                         5 team members
//                       </Typography>
//                     </li>
//                     <li className="flex items-center gap-4">
//                       <span className="rounded-full border border-white/20 bg-white/20 p-1">
//                         <CheckIcon />
//                       </span>
//                       <Typography className="font-normal">
//                         200+ components
//                       </Typography>
//                     </li>
//                     <li className="flex items-center gap-4">
//                       <span className="rounded-full border border-white/20 bg-white/20 p-1">
//                         <CheckIcon />
//                       </span>
//                       <Typography className="font-normal">
//                         40+ built-in pages
//                       </Typography>
//                     </li>
//                     <li className="flex items-center gap-4">
//                       <span className="rounded-full border border-white/20 bg-white/20 p-1">
//                         <CheckIcon />
//                       </span>
//                       <Typography className="font-normal">
//                         1 year free updates
//                       </Typography>
//                     </li>
//                     <li className="flex items-center gap-4">
//                       <span className="rounded-full border border-white/20 bg-white/20 p-1">
//                         <CheckIcon />
//                       </span>
//                       <Typography className="font-normal">
//                         Life time technical support
//                       </Typography>
//                     </li>
//                   </ul>
//                 </CardBody>
//                 <CardFooter className="mt-12 p-0">
//                   <Button
//                     size="lg"
//                     color="white"
//                     className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
//                     ripple={false}
//                     fullWidth={true}
//                   >
//                     Buy Now
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//           {/* <Button variant="gradient" className="w-full mt-6">
//             Join Now
//           </Button> */}
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default TrainerBooking;
