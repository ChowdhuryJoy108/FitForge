import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserCard = ({ item }) => {
  const [classTrainers, setClassTrainers] = useState([]);
  const { name, description, additionalDetails, trainers } = item;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainerRequests = trainers.map(async (trainerId) => {
          const response = await axiosSecure.get(`/class/${trainerId}`);
          return response.data;
        });

        const trainerData = await Promise.all(trainerRequests);

        setClassTrainers(trainerData);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, [trainers]);

  console.log(classTrainers);
  return (
    <div>
      <Card className="max-w-[24rem] max-h-[450px] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 h-[200px] rounded-none"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="ui/ux review check"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            {name}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            {description}
          </Typography>
          <Typography className="font-normal">{additionalDetails}</Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center -space-x-3">
            {classTrainers.map((trainer, index) => (
              <Link to={`/trainer/${trainer._id}`}>
                <Typography className="mr-4">{trainer.name}</Typography>
              </Link>
              // <Tooltip key={trainer.trainerId} content={trainer.name}>
              //   <Avatar
              //     size="sm"
              //     variant="circular"
              //     alt={trainer.name}
              //     src={trainer.profileImage}
              //     className="border-2 border-white hover:z-10"
              //   />
              // </Tooltip>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserCard;
