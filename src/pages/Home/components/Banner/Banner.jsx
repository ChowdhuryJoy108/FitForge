import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Banner01 from "../../../../assets/banner/banner02.jpg";
import Banner02 from "../../../../assets/banner/banner03.png";
import Banner03 from "../../../../assets/banner/banner04.png";

const Banner = () => {
  return (
    <Carousel className="h-[600px] rounded-xl md:h-[500px] lg:h-[400px]">
      <div className="relative h-full w-full">
        <img
          src={Banner01}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-xl md:text-4xl lg:text-5xl"
            >
              Train. Transform. Thrive
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className=" text-base mb-12 opacity-80 lg:text-xl"
            >
              Unlock your full potential with expert-guided workouts,
              personalized fitness plans, and a supportive community. Train
              smarter, stay motivated, and achieve your dream physique with us
              today!
            </Typography>
            <div className="flex justify-center gap-2">
              <Link to="/classes">
                <Button size="lg" color="white">
                  Classes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={Banner02}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-xl md:text-4xl lg:text-5xl"
            >
              Stronger Every Day.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className=" text-base mb-12 opacity-80 lg:text-xl"
            >
              Transform your body and mind with dynamic workouts, nutrition
              guidance, and expert coaching. Build strength, endurance, and
              confidence with a fitness journey designed just for you.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Classes
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={Banner03}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-xl md:text-4xl lg:text-5xl"
            >
              Elevate Your Fitness.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="text-base mb-12  opacity-80 lg:text-xl"
            >
              Discover a new way to train with science-backed fitness programs,
              real-time tracking, and unwavering motivation. Join a community
              that inspires and supports your transformation every step of the
              way.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Classes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
