import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ClassCard from "../../components/ClassCard/ClassCard";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Lottie from "lottie-react";
import ClassLottie from '../../assets/lottie/classLottie.json'
import { Spinner } from "@material-tailwind/react";

const Classes = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: paginatedClasses = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classes", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/classes?limit=6&page=${currentPage}`);
      return res.data;
    },
  });

  const { classes = [], totalPages = 1 } = paginatedClasses;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      refetch();
    }
  };

  return (
    <div className="px-4">
      <Helmet>
        <title>FitForge | Classes</title>
      </Helmet>
     
    <div>
      <SectionTitle title={"Transform Your Body with Expert-Led Fitness Classes"} subtitle={"Achieve your health goals through personalized training programs."}/>
    </div>
    <div className="flex flex-col items-center">
        <div className="dark:hidden w-full max-w-sm dark:text-white lg:w-64">
          <Lottie animationData={ClassLottie} />
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((classItem) => (
              <ClassCard
                key={classItem._id}
                item={classItem}
                refetch={refetch}
              />
            ))}
          </div>

     
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 dark:text-black bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 rounded mr-2"
            >
              Previous
            </button>
            <span className="font-semibold mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 dark:text-black bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Classes;
