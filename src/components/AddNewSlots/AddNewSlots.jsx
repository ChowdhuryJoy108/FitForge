import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AddNewSlotsForm from "../AddNewSlotsForm/AddNewSlotsForm";

const AddNewSlots = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [trainer , setTrainer] = useState({})

  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const res = await axiosPublic.get(`/specific-trainer/${user.email}`);
          setTrainer(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      console.log("User is not authenticated or email is missing");
    }
  }, [user]);

  console.log(trainer)

  const {trainerId} = trainer;
  return (
  <div>
    <AddNewSlotsForm key={trainer._id} trainer={trainer} />
  </div>
  );
};

export default AddNewSlots;
