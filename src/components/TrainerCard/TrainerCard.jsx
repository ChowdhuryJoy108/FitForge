import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Chip,
  CardFooter,
} from "@material-tailwind/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const TrainerCard = ({ trainer }) => {
  const {
    _id,
    name,
    specialization,
    profileImage,
    bio,
    yearsOfExperience,
    socialIcons,
  } = trainer;

  return (
    <div>
      <Card
        color="transparent"
        shadow={true}
        className="px-2 w-full  max-w-[26rem] h-full  flex flex-col justify-between dark:bg-[#DEE4E7] "
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 px-4 flex flex-1 items-center gap-4 pt-0 pb-8"
        >
          <Avatar
            size="lg"
            variant="circular"
            src={profileImage}
            alt="tania andrew"
          />
          <div className="flex w-full flex-col gap-4">
            <Typography className="line-clamp-2 text-xl font-bold">
              {name}
            </Typography>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                {Object.entries(socialIcons).map(([key, value]) => (
                  <Link
                    to={value}
                    key={key}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {key === "facebook" && <FaFacebook />}
                    {key === "linkedin" && <FaLinkedin />}
                    {key === "instagram" && <FaInstagram />}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-4 flex-1">
          <Typography className="font-bold my-4">{bio}</Typography>
          <div className="grid gap-2 md:grid-cols-2">
            {specialization.map((expert, index) => (
              <Chip key={index} variant="ghost" value={expert} />
            ))}
          </div>
          {/* <Typography className="font-bold my-4">
            Years of Experience: {yearsOfExperience}
          </Typography>
          <Typography className="font-bold my-4">Bio : {bio}</Typography> */}
        </CardBody>
        <CardFooter className="mt-auto">
          <Link to={`/trainer/${_id}`}>
            <Button className="w-full" variant="gradient">
              Know More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TrainerCard;
