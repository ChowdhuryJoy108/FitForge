import { Outlet } from "react-router-dom";

import Footer from "../sharedComponents/Footer/Footer";
import Navigationbar from "../sharedComponents/Navbar/Navigationbar";

const MainLayout = () => {
  return (
    <div>
      <Navigationbar />
      <div className="w-full lg:max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
