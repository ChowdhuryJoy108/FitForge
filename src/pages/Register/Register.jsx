import { Typography, Input, Button } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { Helmet } from "react-helmet-async";


const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.profile)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            profile: data.profile,
            role: "member",
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };
  return (
    <div>
       <Helmet>
        <title>FitForge | Register</title>
      </Helmet>
      <section className="grid place-items-center px-4 sm:px-8 lg:px-16">
        <div className="w-full max-w-[24rem] md:max-w-[28rem] mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-4 text-2xl sm:text-3xl lg:text-4xl text-start"
          >
            Register
          </Typography>
          <Typography className="mb-10 text-gray-600 font-normal text-sm sm:text-base lg:text-lg text-justify">
            Enter your Info below to Register yourself.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="text-left">
            <div className="mb-6">
              <label htmlFor="name">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Your Name
                </Typography>
              </label>
              <Input
                id="name"
                color="gray"
                size="lg"
                type="text"
                name="name"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="username"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="profile">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Your Photo
                </Typography>
              </label>
              <Input
                id="profile"
                color="gray"
                size="lg"
                type="url"
                name="profile"
                {...register("profile", {
                  required: "Profile is required",
                })}
                placeholder="User Profile"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.profile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profile.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="name@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>


            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Password
                </Typography>
              </label>
              <Input
                size="lg"
                name="password"
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisibility}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              className="rounded-md bg-gradient-to-tr from-slate-800 to-slate-700 py-2 px-4 border border-transparent text-center text-sm sm:text-base lg:text-lg text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              fullWidth
            >
              Register
            </Button>

    
            <div className="mt-4 flex justify-end">
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                variant="small"
                className="font-medium"
              >
                Forgot password
              </Typography>
            </div>
     
            <Typography
              variant="small"
              color="gray"
              className="mt-4 text-center font-normal"
            >
              Already registered ?{" "}
              <Link to="/Login" className="font-bold text-gray-900">
                Login Now
              </Link>
            </Typography>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
