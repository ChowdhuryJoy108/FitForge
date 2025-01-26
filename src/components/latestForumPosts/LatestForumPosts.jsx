import React from "react";
import PostCard from "../PostCard/PostCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const LatestForumPosts = () => {
  const axiosPublic = useAxiosPublic();
  const { data: posts = [] } = useQuery({
    queryKey: ["latest-forum-posts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/latest-forum-posts");
      return res.data;
    },
  });

  return (
    <div className="my-16">
      <div>
        <SectionTitle title={"Explore Our Latest Discussions"} subtitle={""} />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default LatestForumPosts;
