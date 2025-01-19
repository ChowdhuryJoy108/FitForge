import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import UserCard from '../UserCard/UserCard';
import DemoClassCard from '../UserCard/DemoClassCard/DemoClassCard';

const DemoClasses = () => {

    const axiosPublic = useAxiosPublic()
    const { data: classes = [], refetch } = useQuery({
        queryKey: ["allDemoClasses"],
        queryFn: async () => {
          const res = await axiosPublic.get("/allDemoClasses");
          return res.data;
        },
      }); 
    return (
        <div>
            Classes : {classes.length}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((classItem) => (
              <DemoClassCard key={classItem._id} item={classItem} />
            ))}
          </div>
        </div>
    );
};

export default DemoClasses;