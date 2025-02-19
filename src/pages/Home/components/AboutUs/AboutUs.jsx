import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { FaDumbbell, FaRunning, FaHeartbeat } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 text-center dark:bg-gray-800">
      <div className="container mx-auto">
        <Typography variant="h2" color="blue-gray " className="font-bold mb-6 dark:text-[#DEE4E7]">
          About Us
        </Typography>
        <Typography variant="paragraph" className="text-lg w-full dark:text-gray-400 text-gray-700 mb-8 lg:w-[800px] mx-auto">
          We are committed to helping you achieve your fitness goals through
          expert coaching, tailored workouts, and a supportive community. Join
          us to take your health to the next level!
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-lg hover:shadow-xl transition">
            <CardBody className="flex flex-col items-center">
              <FaDumbbell className="text-5xl text-blue-600 mb-4" />
              <Typography variant="h5" color="blue-gray" className="font-semibold">
                Strength Training
              </Typography>
              <Typography className="text-gray-600 mt-2">
                Build muscle, improve endurance, and gain confidence with our
                expert-led strength programs.
              </Typography>
            </CardBody>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition">
            <CardBody className="flex flex-col items-center">
              <FaRunning className="text-5xl text-green-600 mb-4" />
              <Typography variant="h5" color="blue-gray" className="font-semibold">
                Cardio Workouts
              </Typography>
              <Typography className="text-gray-600 mt-2">
                Improve your stamina and heart health with our high-energy
                cardio sessions.
              </Typography>
            </CardBody>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition">
            <CardBody className="flex flex-col items-center">
              <FaHeartbeat className="text-5xl text-red-600 mb-4" />
              <Typography variant="h5" color="blue-gray" className="font-semibold">
                Wellness & Recovery
              </Typography>
              <Typography className="text-gray-600 mt-2">
                Balance your fitness journey with mindfulness, recovery, and
                self-care practices.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
