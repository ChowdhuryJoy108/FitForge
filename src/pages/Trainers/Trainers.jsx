import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import TrainerCard from '../../components/TrainerCard/TrainerCard';

const Trainers = () => {

    const axiosPublic = useAxiosPublic();
    const { data: trainers = [], refetch } = useQuery({
      queryKey: ["trainers"],
      queryFn: async () => {
        const res = await axiosPublic.get("/trainers");
        return res.data;
      },
    }); 

    return (
        <div className='px-4'>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    trainers.map(trainer => <TrainerCard key={trainer._id} 
                        trainer={trainer} />)
                }
            </div>
        </div>
    );
};

export default Trainers;