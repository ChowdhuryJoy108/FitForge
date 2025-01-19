import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrainerDetails = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate()

  const axiosSecure = useAxiosSecure();

  const { data: trainer = {} } = useQuery({
    queryKey: ["trainer", trainerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainer/${trainerId}`);
      return res.data;
    },
  });

 


  const {
    name,
    specialization = [],
    profileImage,
    bio,
    yearsOfExperience,
    socialIcons = {},
    availableSlots = [],
    additionalInfo,
  } = trainer;


  const handleSlotClick =(slot) =>{
    navigate("/trainer-booked", {
        state: { trainer, selectedSlot: slot },
      });
  }

  return (
    <div className="px-2">
      <h1>{trainerId}</h1>
      <Card className="w-full flex flex-col max-w-[48rem] mx-auto lg:flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-full shrink-0 rounded-r-none lg:w-2/5"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {name}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {bio}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            {additionalInfo}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Session Time : {availableSlots[0]?.slotDuration} minutes.
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => (
                <Button
                  key={index}
                  onClick={() => handleSlotClick(slot)}
                  variant="gradient"
                  className="w-full"
                >
                  {slot.time}
                </Button>
              ))
            ) : (
              <Typography color="gray" className="col-span-2">
                No available slots.
              </Typography>
            )}
          </div>
          {/* <a href="#" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a> */}
        </CardBody>
      </Card>
    </div>
  );
};

export default TrainerDetails;
