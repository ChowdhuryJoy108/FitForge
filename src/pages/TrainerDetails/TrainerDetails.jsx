import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAdmin from "../../hooks/useAdmin";
import useTrainer from "../../hooks/useTrainer";
import { FaArrowTurnDown } from "react-icons/fa6";
import { MdContactMail } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const TrainerDetails = () => {
  const { trainerId } = useParams();
  const [isAdmin] = useAdmin();
  const [isTrainer] = useTrainer();
  const location = useLocation();
  const navigate = useNavigate();
  const { classId } = location.state || {};

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
    email,
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
      navigate("/trainer-booked", {
        state: { trainer, selectedSlot: slot, day: day, classId: classId },
      });
    }
  };

  return (
    <div className="px-2">
      <Helmet>
        <title>FitForge | Trainers Details</title>
      </Helmet>
      <SectionTitle
        title={
          "Meet Your Fitness Trainer – Strength, Endurance, and Wellness Expert"
        }
        subtitle={
          "Discover a dedicated fitness trainer who tailors personalized workout plans to help you build strength, improve endurance, stay motivated, and achieve your ultimate health goals."
        }
      />
      <Card className="w-full mb-[50px] flex flex-col max-w-6xl mx-auto lg:flex-row">
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
          <Typography color="gray" className="mb-4 flex items-center">
            <MdContactMail className="text-xl mr-4" /> {email}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {bio}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            {additionalInfo}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Years of Experience : {yearsOfExperience}
          </Typography>
          <Typography
            color="gray"
            className="flex items-center mb-4 font-normal"
          >
            Specialized in <FaArrowTurnDown className="text-2xl ml-4" />
          </Typography>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {specialization.map((sp, index) => (
              <Typography
                key={index}
                color="gray"
                className="bg-[#eceff1] text-center py-2 font-bold rounded-xl"
              >
                {sp}
              </Typography>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) =>
                slot.days.length > 0 ? (
                  slot.days.map((day, dayIndex) => (
                    <Button
                      key={`${slot.slotId}-${dayIndex}`}
                      onClick={() => handleSlotClick(slot, day, classId)}
                      variant="gradient"
                      className="w-full"
                    >
                      {day} - {slot.slotTime}
                    </Button>
                  ))
                ) : (
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

      <div>
        {isAdmin || isTrainer ? (
          " "
        ) : (
          <div>
            <div className="flex flex-col items-center gap-2 bg-blue-gray-100 dark:bg-black my-8 py-4 rounded-lg">
              <SectionTitle
                title={
                  "Become a Fitness Trainer – Inspire, Train, and Transform Lives"
                }
                subtitle={
                  "Turn your passion for fitness into a career by helping others achieve their health and wellness goals."
                }
              />
              <Link to="/betrainer">
                <Button> Be a Trainer</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerDetails;
