import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "@material-tailwind/react";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
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
  console.log(isAdmin);
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const { data: forumPosts = [], refetch } = useQuery({
    queryKey: ["forumPosts"],
    queryFn: async () => {
      const url = isAdmin
        ? "/forumPosts" // Admin fetches all posts
        : `/forumPost/${user?.email}`; // User fetches their own posts
      const res = await axiosSecure.get(url);
      const data = res.data;

      // Ensure data is an array
      return Array.isArray(data) ? data : [data];
    },
  });

  console.log(forumPosts);
  useEffect(() => {
    setPosts(forumPosts);
  }, [forumPosts]);

  const handleDeletePost = async (postId) => {
    console.log(postId);
    try {
      await axiosSecure.delete(`/forumPost/${postId}`); 
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId)); 
      alert("Post deleted successfully.");
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  return (
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
                  <tr key={email} className="even:bg-blue-gray-50/50">
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
      {/* <table className="w-full  table-auto text-left">
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
          {posts.map(({_id, email, title, createdAt, upvotes, downvotes }, index) => (
            <tr key={email} className="even:bg-blue-gray-50/50">
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
                  onClick={()=>handleDeletePost(_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </Card>
  );
};

export default ForumPosts;
