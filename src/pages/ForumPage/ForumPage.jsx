import { useQuery } from "@tanstack/react-query";
import PostCard from "../../components/PostCard/PostCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Lottie from "lottie-react";
import ForumPostLottie from "../../assets/lottie/postsLottie.json";

const ForumPage = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: paginatedForumPosts = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allForumPosts", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allForumPosts?limit=4&page=${currentPage}`
      );
      return res.data;
    },
  });

  const { forumPosts = [], totalPages = 1 } = paginatedForumPosts;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      refetch();
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>FitForge | Forum </title>
      </Helmet>

      <div className="mt-4">
        <SectionTitle
          title={"Join Discussions on Fitness, Health, and Wellness Tips"}
          subtitle={
            "Share insights, ask questions, and connect with fitness enthusiasts."
          }
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-sm lg:w-64">
          <Lottie animationData={ForumPostLottie} />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {forumPosts.map((post) => (
          <PostCard key={post._id} post={post} refetch={refetch} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 dark:text-black bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 rounded mr-2 mb-2 sm:mb-0"
        >
          Previous
        </button>
        <span className="font-semibold mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 dark:text-black bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 rounded mb-2 sm:mb-0"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ForumPage;
