import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TrainerDetails = () => {
  const { trainerId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { classId } = location.state || {};
  console.log(classId);

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

    availableSlots = [],
    additionalInfo,
  } = trainer;

  const handleSlotClick = (slot, day, classId) => {
    if (!classId) {
      Swal.fire({
        title: "You didn't select any class! Please select one",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate("/classes");
    } else {
      console.log(slot, day);
      navigate("/trainer-booked", {
        state: { trainer, selectedSlot: slot, day: day, classId: classId },
      });
    }
  };

  return (
    <div className="px-2">
      <h1>{trainerId}</h1>
      <Card className="w-full flex flex-col max-w-6xl mx-auto lg:flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-full shrink-0 rounded-r-none lg:w-2/5"
        >
          <img
            src={profileImage}
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
              availableSlots.map((slot, index) =>
                slot.days.length > 0 ? (
                  slot.days.map((day, dayIndex) => (
                    <Button
                      key={`${slot.slotId}-${dayIndex}`} // Ensure unique key for React
                      onClick={() => handleSlotClick(slot, day, classId)} // Pass slot and day to the handler
                      variant="gradient"
                      className="w-full"
                      // disabled={!classId}
                    >
                      {day} - {slot.slotTime}
                    </Button>
                  ))
                ) : (
                  // Render a fallback button for slots without selected days
                  <Typography
                    key={slot.slotId}
                    color="red"
                    className="col-span-2"
                  >
                    {slot.slotName} has no days assigned.
                  </Typography>
                )
              )
            ) : (
              <Typography color="gray" className="col-span-2">
                No available slots.
              </Typography>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TrainerDetails;
