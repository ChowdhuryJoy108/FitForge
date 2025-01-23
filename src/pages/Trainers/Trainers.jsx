import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import TrainerCard from "../../components/TrainerCard/TrainerCard";

const Trainers = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: paginatedTrainers = {},
  isLoading, refetch } = useQuery({
    queryKey: ["allTrainers", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allTrainers?limit=6&page=${currentPage}`);
      return res.data;
    },
  });

  const { trainers = [], totalPages = 1 } = paginatedTrainers;
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      refetch(); 
    }
  };
  return (
    <div className="px-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 rounded mr-2"
        >
          Previous
        </button>
        <span className="font-semibold mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Trainers;
