import { Outlet } from "react-router-dom";

import Footer from "../sharedComponents/Footer/Footer";
import Navigationbar from "../sharedComponents/Navbar/Navigationbar";

const MainLayout = () => {
  return (
    <div className="w-full lg:max-w-7xl mx-auto">
      <Navigationbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default MainLayout;
