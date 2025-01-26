
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        profile: result.user?.photoURL || "",
        role: "member",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div>
      <hr />
      <div>
        <Button
          variant="outlined"
          size="lg"
          className="text-xs mt-6 flex h-12 items-center justify-center gap-2 lg:text-sm"
          fullWidth
          onClick={handleGoogleSignIn}
        >
          <img
            src={`https://www.material-tailwind.com/logos/logo-google.png`}
            alt="google"
            className="h-6 w-6"
          />{" "}
          log in with Google
        </Button>
       
      </div>
    </div>
  );
};

export default SocialLogin;
