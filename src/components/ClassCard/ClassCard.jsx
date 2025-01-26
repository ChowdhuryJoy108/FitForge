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
import { Link} from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ClassCard = ({ item , refetch}) => {

  const [classTrainers, setClassTrainers] = useState([]);
  const { name, description, image, additionalDetails, trainers, classId } =
    item;
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



  return (
    <div>
      <Card className="w-full h-[450px] flex flex-col justify-between overflow-hidden lg:max-w-[24rem]">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 h-[200px] rounded-none"
        >
          <img
            src={image}
            alt="ui/ux review check"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="flex flex-col justify-start items-start flex-grow p-4">
          <Typography variant="h4" color="blue-gray" className="truncate">
            {name}
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-3 font-normal line-clamp-2 text-sm"
          >
            {description}
          </Typography>
          <Typography className="font-normal text-xs line-clamp-3 mt-2">
            {additionalDetails}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="flex items-center -space-x-3">
            {classTrainers.map((trainer, index) => (
              <Link
                to={`/trainer/${trainer._id}`}
                state={{ classId }}
                key={index}
              >
                <Tooltip content={trainer.name}>
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt={trainer.name}
                    src={trainer.profileImage}
                    className="border-2 border-white hover:z-10"
                  />
                </Tooltip>
              </Link>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClassCard;
