import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Banner from "./components/Banner/Banner";
import Testimonials from "./components/Testimonials/Testimonials";


const Home = () => {
    return (
        <div>
            <Banner />
            {/* <h1>Testimonials</h1>
            <Testimonials /> */}

            <NewsLetter />
        </div>
    );
};

export default Home;