import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const DisplayAllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
      queryKey: ["allClasses"],
      queryFn: async () => {
        const res = await axiosSecure.get("/allClasses");
        console.log(res.data)
        return res.data;
      },
    });
  
    return (
        <div>
            this display all Classes for admin
        </div>
    );
};

export default DisplayAllClasses;