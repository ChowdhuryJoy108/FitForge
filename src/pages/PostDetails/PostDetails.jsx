import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PostDetails = () => {
  const { postId } = useParams();
  console.log(postId);

  const axiosSecure = useAxiosSecure();

  const { data: forumPost = {}, refetch } = useQuery({
    queryKey: ["forumPosts", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forumPosts/${postId}`);
      return res.data;
    },
  });

  console.log(forumPost);
  const {title, email} = forumPost
  return (
    <div>
      This post Details page || {postId} {forumPost.length}
      <div>
        <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg max-w-6xl mx-auto">
          <div class="p-4">
            <h6 class="mb-2 text-slate-800 text-xl font-semibold">
              {title}
            </h6>
            <p>By:{email}</p>
          
          </div>
          <div class="relative h-56 w-96 m-2.5 overflow-hidden text-white rounded-md">
            <img
              src="https://images.unsplash.com/photo-1725610588086-b9e38da987f7?q=80&w=1200"
              alt="card-image"
              className="object-fit"
            />
          </div>
          <div className="p-4">
          <p class="text-slate-600 leading-normal font-light">
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to &quot;Naviglio&quot; where you can enjoy the main
              night life in Barcelona.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
