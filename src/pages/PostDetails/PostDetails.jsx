import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const PostDetails = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: forumPost = {}, refetch } = useQuery({
    queryKey: ["forumPosts", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forumPosts/${postId}`);
      return res.data;
    },
  });

  const { title, email, imageUrl, description, createdAt, upvotes, downvotes } =
    forumPost;
  const dateString = createdAt;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div>
      <Helmet>
        <title>FitForge | ForumPost Details </title>
      </Helmet>

      <SectionTitle
        title={
          "Get insights, share experiences, and engage with our fitness community"
        }
      />
      <div>
        <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg max-w-6xl mx-auto dark:bg-[#DEE4E7]">
          <div class="p-4 flex flex-col  justify-between lg:flex-row gap-8">
            <div>
              <h6 class="mb-2 text-slate-800 text-xl font-semibold dark:text-[#111111]">{title}</h6>
              <p className="dark:text-[#111111]">By:{email}</p>
            </div>
           
          </div>
          <div class="relative h-auto w-5xl m-2.5 overflow-hidden dark:text-[#111111] text-white rounded-md lg:h-[400px] ">
            <img
              src={imageUrl}
              alt="card-image"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-slate-600 dark:text-[#111111] leading-normal font-light">
              {description}
            </p>

            <button
              className="rounded-md border border-transparent py-2 px-4 dark:text-[#111111] text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Created At : {formattedDate}
            </button>
            <button
              className="rounded-md border border-transparent py-2 dark:text-[#111111] px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Likes : {upvotes}
            </button>
            <button
              className="rounded-md border border-transparent dark:text-[#111111] py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Dislikes : {downvotes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
