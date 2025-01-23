import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { Spinner } from "@material-tailwind/react";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <Spinner />
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace />
};

export default PrivateRoute;