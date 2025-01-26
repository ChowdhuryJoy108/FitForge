import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Textarea,
  Rating,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({ open, handleClose, user }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async () => {
    try {
      await axiosSecure.post("/review", {
        name: user?.displayName || "Anonymous",
        email: user?.email,
        Profile: user?.photoURL || "https://i.ibb.co.com/F3bGVHT/dummyprofile.webp",
        review: reviewText,
        rating,
      });

      Swal.fire({
        title: "Successfull!",
        text: "Review submitted successfully!",
        icon: "success",
      });

      handleClose();
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Error submitting review",
        icon: "error",
      });
      handleClose();
    }
  };

  return (
    <Dialog open={open} size="md">
      <DialogHeader>Submit a Review</DialogHeader>
      <DialogBody>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Rating
              value={rating}
              onChange={(value) => setRating(value)}
              total={5}
              className="text-yellow-500"
            />
          </div>
          <Textarea
            label="Write your feedback..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full border rounded-md"
            rows={4}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          color="gray"
          variant="text"
          onClick={handleClose}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ReviewModal;
