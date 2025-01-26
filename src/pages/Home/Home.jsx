import { Helmet } from "react-helmet-async";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Banner from "./components/Banner/Banner";
import Testimonials from "./components/Testimonials/Testimonials";
import HomeLottie from "../../assets/lottie/homeLottie.json";
import Lottie from "lottie-react";
import FeaturedClasses from "./components/FeaturedClasses/FeaturedClasses";
import LatestForumPosts from "../../components/latestForumPosts/LatestForumPosts";
import Teams from "../../components/Teams/Teams";
import AboutUs from "./components/AboutUs/AboutUs";

const Home = () => {
  return (
    <div className="px-2">
      <Helmet>
        <title>FitForge | Home</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <div className="w-full mb-8 max-w-sm lg:w-96">
          <Lottie animationData={HomeLottie} />
        </div>
      </div>
      <Banner />
      <FeaturedClasses />
      <LatestForumPosts />
      <Teams />
      <Testimonials />
      <NewsLetter />
      <AboutUs />
    </div>
  );
};

export default Home;
