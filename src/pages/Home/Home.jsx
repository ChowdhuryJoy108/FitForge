import { Helmet } from "react-helmet-async";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Banner from "./components/Banner/Banner";
import Testimonials from "./components/Testimonials/Testimonials";
import HomeLottie from '../../assets/lottie/homeLottie.json'
import Lottie from "lottie-react";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>FitForge | Home</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <div className="w-full mb-8 max-w-sm lg:w-96">
          <Lottie animationData={HomeLottie} />
        </div>
      </div>
      <Banner />
      {/* <h1>Testimonials</h1>
            <Testimonials /> */}

      <NewsLetter />
    </div>
  );
};

export default Home;
