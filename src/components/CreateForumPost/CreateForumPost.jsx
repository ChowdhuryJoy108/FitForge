import React, { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
const CreateForumPost = () => {
  //   const [forums, setForums] = useState([]);
  const {user} = useAuth()
  console.log(user.email)
  const axiosSecure = useAxiosSecure()
  const [newPost, setNewPost] = useState({ title: "", description: "", imageUrl: "" });

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.description) {
      Swal.fire({
        title: "Opps!",
        text: "Title and description are required.",
        icon: "error"
      });
    
      return;
    }

    try {
       
      await axiosSecure.post("/forumPost", {
        email: user.email,
        ...newPost,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date(),
      });
    //   setForums((prev) => [response.data, ...prev]); // Add the new post to the list
      setNewPost({ title: "", description: "", imageUrl: "" }); // Reset the form
    } catch (error) {
      Swal.fire({
        title: "Opps!",
        text: "Failed to add forum post.",
        icon: "error"
      });
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
           <Input
            label="Image URL"
            type="url"
            value={newPost.imageUrl}
            onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
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
