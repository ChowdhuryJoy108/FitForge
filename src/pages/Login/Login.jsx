import { useContext, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/loginLottie/lottieLogin.json";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const { signInUser} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        Swal.fire({
          icon: "success",
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate(from, { replace: true });
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

  return (
    <>
      <Helmet>
        <title>FitForge | Login</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        <section className="grid place-items-center px-4 sm:px-8 lg:px-16">
          <div className="w-full max-w-[24rem] md:max-w-[28rem] mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
         
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-4 text-2xl sm:text-3xl lg:text-4xl text-start"
            >
              Log In
            </Typography>
            <Typography className="mb-10 text-gray-600 font-normal text-sm sm:text-base lg:text-lg text-justify">
              Enter your email and password to log in.
            </Typography>

         
            <form onSubmit={handleSubmit(onSubmit)} className="text-left">
             
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
                Log In
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
              <SocialLogin />
            
              <Typography
                variant="small"
                color="gray"
                className="mt-4 text-center font-normal"
              >
                Not registered yet?{" "}
                <Link to="/register" className="font-bold text-gray-900 ">
                  Create Account
                </Link>
              </Typography>
            </form>
          </div>
        </section>
        <div className="w-full  lg:w-1/2">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>
      </div>
    </>
  );
};

export default Login;
