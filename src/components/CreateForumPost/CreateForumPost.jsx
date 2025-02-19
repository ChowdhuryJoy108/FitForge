import React, { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
const CreateForumPost = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.description) {
      Swal.fire({
        title: "Opps!",
        text: "Title and description are required.",
        icon: "error",
      });

      return;
    }

    try {
      await axiosSecure.post("/forumPost", {
        // email: user.email,
        // ...newPost,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date(),
        email: user.email,
        title: newPost.title,
        description: newPost.description,
        imageUrl: newPost.imageUrl,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Post successfully Added!",
        showConfirmButton: false,
        timer: 1500,
      });
      setNewPost({ title: "", description: "", imageUrl: "" });
    } catch (error) {
      Swal.fire({
        title: "Opps!",
        text: "Failed to add forum post.",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <Typography className="text-xl font-bold mb-4 dark:text-black">
          Create a New Forum Post
        </Typography>
        <div className="space-y-4">
          <Input
            label="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Input
            label="Image URL"
            type="url"
            value={newPost.imageUrl}
            onChange={(e) =>
              setNewPost({ ...newPost, imageUrl: e.target.value })
            }
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
