import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const Myclients = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clients/${"rohan@gmail.com"}`);
      return res.data;
    },
  });
  console.log(clients)
    return (
        <div>
            This is My client
        </div>
    );
};

export default Myclients;