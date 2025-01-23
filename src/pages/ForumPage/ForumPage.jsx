import { useQuery } from "@tanstack/react-query";
import PostCard from "../../components/PostCard/PostCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

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
      const res = await axiosSecure.get(`/allForumPosts?limit=4&page=${currentPage}`);
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
    <div>
      This is forum Page! {forumPosts.length}
      <div className="grid gap-x-2 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {forumPosts.map((post) => (
          <PostCard key={post._id} post={post} refetch={refetch} />
        ))}
      </div>
      {/* Pagination */}
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

export default ForumPage;
