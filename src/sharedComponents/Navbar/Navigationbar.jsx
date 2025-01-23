import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Logo from '../../assets/fitforge.png'
const Navigationbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user, logOut } = useAuth();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "successfully Logged out!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          footer: "Try again after sometimes!",
        });
      });
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/" className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/classes" className="flex items-center">
          All Classes
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/trainers" className="flex items-center">
          All Trainers
        </NavLink>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/forum" className="flex items-center">
          Forum
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/dashboard" className="btn flex items-center">
          Dashboard
        </NavLink>
      </Typography>
    </ul>
  );
  return (
    <div className="-m-2 mb-4 max-h-[768px]">
      {" "}
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
        
            <Avatar
              size="md"
              variant="circular"
              alt="logo of website"
              src={Logo}
              className="border-2 border-white hover:z-10"
            />
          
          {/* <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-bold"
          >
            FitForge
          </Typography> */}
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {user ? (
              <Button
                onClick={handleLogOut}
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Log Out</span>
              </Button>
            ) : (
              <div className="flex items-center gap-x-1">
                <Link to={"/login"}>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Log In</span>
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Register</span>
                  </Button>
                </Link>
              </div>
            )}

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}

          <div>
            {user ? (
              <>
                {" "}
                <Button
                  onClick={handleLogOut}
                  variant="text"
                  size="sm"
                  className="block lg:inline-block"
                >
                  <span>Log Out</span>
                </Button>{" "}
              </>
            ) : (
              <div className="flex items-center gap-x-1">
                {" "}
                <Link to={"/login"}>
                  <Button fullWidth variant="text" size="sm" className="">
                    <span>Log In</span>
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button fullWidth variant="gradient" size="sm" className="">
                    <span>Register</span>
                  </Button>
                </Link>{" "}
              </div>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
