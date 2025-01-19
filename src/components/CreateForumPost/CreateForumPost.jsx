import React, { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
const CreateForumPost = () => {
  //   const [forums, setForums] = useState([]);
  const {user} = useAuth()
  console.log(user.email)
  const axiosSecure = useAxiosSecure()
  const [newPost, setNewPost] = useState({ title: "", description: "" });

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.description) {
      alert("Title and description are required.");
      return;
    }

    try {
        console.log("inside try", user.email)
      await axiosSecure.post("/forumPost", {
        email: user.email,
        ...newPost,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date(),
      });
    //   setForums((prev) => [response.data, ...prev]); // Add the new post to the list
      setNewPost({ title: "", description: "" }); // Reset the form
    } catch (error) {
      console.error("Failed to add forum post:", error);
    }
  };
  return (
    <div>
      <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <Typography className="text-xl font-bold mb-4">
          Create a New Forum Post
        </Typography>
        <div className="space-y-4">
          <Input
            label="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            label="Description"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
          />
          <Button onClick={handleAddPost}>Post</Button>
        </div>
      </section>
    </div>
  );
};

export default CreateForumPost;
