import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PostCard = ({ post, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, title, imageUrl, description, email, upvotes, downvotes } = post;

  const handleVote = async (postId, voteType) => {
    try {
      await axiosSecure.patch(`/forumPost/vote/${postId}`, { voteType });

      if (refetch) {
        refetch();
      }
    } catch (error) {
      console.error(`Failed to ${voteType}:`, error);
      alert(`Failed to ${voteType}. Please try again.`);
    }
  };

  return (
    <div>
    
      <Card className="mt-6 w-full h-[500px] flex flex-col justify-between lg:w-96">
        <CardHeader color="blue-gray" className="relative h-[200px]">
          <img
            src={imageUrl}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="flex flex-col flex-grow p-4">
          <Typography variant="h5" color="blue-gray" className="mb-2 truncate">
            {title}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            By: {email}
          </Typography>
          <Typography className="text-sm text-gray-600 line-clamp-3">
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="flex gap-2 pt-4">
          <Button
            onClick={() => handleVote(_id, "upvotes")}
            className="inline-flex gap-1 justify-center"
          >
            <FaRegThumbsUp /> {upvotes}
          </Button>
          <Button
            onClick={() => handleVote(_id, "downvotes")}
            className="inline-flex gap-1 justify-center"
          >
            <FaRegThumbsDown /> {downvotes}
          </Button>
          <Link to={`/forum/${_id}`}>
            <Button>Read More</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
