import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TeamCard from "../TeamCard/TeamCard";
import SectionTitle from "../SectionTitle/SectionTitle";

const Teams = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainers");
      return res.data;
    },
  });

  const teams = trainers.slice(0, 3);

  return (
    <div>
        <SectionTitle title={"Meet Our Teams"} />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {teams.map((team) => (
          <TeamCard key={team._id} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Teams;
