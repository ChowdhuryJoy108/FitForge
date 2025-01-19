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
  const { _id, title, description, email, upvotes, downvotes } = post;

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
      <Card className="mt-6 w-96 h-full">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            By : {email}
          </Typography>
          <Typography>{description}</Typography>
        </CardBody>
        <CardFooter className=" flex gap-2 pt-0">
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
