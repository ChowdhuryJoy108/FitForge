import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import TrainerClass from '../TrainerClass/TrainerClass';

const TrainerClasses = () => {
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [trainer , setTrainer] = useState({})

  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const res = await axiosSecure.get(`/specific-trainer/${user.email}`);
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


    return (
        <div>
           <TrainerClass trainerId={trainer.trainerId} />
        </div>
    );
};

export default TrainerClasses;