import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "@material-tailwind/react";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SectionTitle from "../SectionTitle/SectionTitle";
const TABLE_HEAD = [
  "Email",
  "Title",
  "CreatedAt",
  "Upvotes",
  "Downvotes",
  "Action",
];

const ForumPosts = () => {
  const [isAdmin] = useAdmin();

  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const { data: forumPosts = [], refetch } = useQuery({
    queryKey: ["forumPosts"],
    queryFn: async () => {
      const url = isAdmin ? "/forumPosts" : `/forumPost/${user?.email}`;
      const res = await axiosSecure.get(url);
      const forums = res.data;

      return Array.isArray(forums) ? forums : [forums];
    },
  });

  console.log(forumPosts);
  useEffect(() => {
    setPosts(forumPosts);
  }, [forumPosts]);

  console.log(posts);
  const handleDeletePost = async (postId) => {
    try {
      await axiosSecure.delete(`/forumPost/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      Swal.fire({
        title: "Successfull!",
        text: "Post deleted successfully.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: "Failed to delete the post. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <SectionTitle title={"Community Posts"} subtitle={"Join the Conversation: Explore, Share, and Engage with the Community!🚀"} />
      <Card className="h-full w-full overflow-scroll">
        {posts && posts.length > 0 ? (
          <>
            <table className="w-full  table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map(
                  (
                    { _id, email, title, createdAt, upvotes, downvotes },
                    index
                  ) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {title}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {createdAt}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {upvotes}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {downvotes}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Button
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() => handleDeletePost(_id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <Typography>No Post Found</Typography>
          </>
        )}
      </Card>
    </div>
  );
};

export default ForumPosts;
