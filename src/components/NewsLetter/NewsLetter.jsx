import { Button, Input, Typography } from "@material-tailwind/react";

import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const NewsLetter = () => {
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      return;
    }

    try {
      await axiosPublic.post("/subscribe", { email });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Subscription successful! Thank you for subscribing.",
        showConfirmButton: false,
        timer: 1500,
      });

      setEmail("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to subscribe!",
      });
    }
  };
  return (
    <div>
      <SectionTitle
        title={"Stay Fit, Strong & Inspired – Join Our Newsletter!"}
        subtitle={""}
      />
      <div className="bg-[#eceff1] w-full rounded-lg my-[50px]">
        <section className="py-20 mx-auto container max-w-4xl px-8">
          <div className="flex flex-col gap-4 items-center">
            <Typography className="text-gray-800 !font-semibold text-center lg:text-2xl">
              Stay in the Know <br /> Subscribe for Exclusive Updates on our
              plans and classes.
            </Typography>
            <div className="flex items-start flex-col gap-4 md:flex-row">
              <Input
                label="Enter your email"
                type="email"
                value={email} // Bind the state to the input
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
              />
              <Button
                onClick={handleSubscribe}
                className="flex-shrink-0 md:w-fit w-full"
              >
                subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsLetter;
