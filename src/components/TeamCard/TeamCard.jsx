import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function TeamCard({ team }) {
  const { _id, name, profileImage, bio } = team;
  return (
    <Card
      shadow={false}
      className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
        style={{ backgroundImage: `url(${profileImage})` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.2]"
        >
          {bio}
        </Typography>
        <Link to={`/trainer/${_id}`}>
          <Typography variant="h5" className="mb-4 text-gray-400">
            {name}
          </Typography>
          <Avatar
            size="xl"
            variant="circular"
            alt="tania andrew"
            className="border-2 border-white"
            src={profileImage}
          />
        </Link>
      </CardBody>
    </Card>
  );
}

export default TeamCard;
