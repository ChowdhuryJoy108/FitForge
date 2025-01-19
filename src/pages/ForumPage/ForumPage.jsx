
import { useQuery } from '@tanstack/react-query';
import PostCard from '../../components/PostCard/PostCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ForumPage = () => {

    const axiosSecure = useAxiosSecure()

    const { data: forumPosts = [], refetch } = useQuery({
        queryKey: ["forumPosts"],
        queryFn: async () => {
        
          const res = await axiosSecure.get('/forumPosts');
          console.log(res.data)
          return res.data;
        
      }});
    return (
        <div>
            This is forum Page! {forumPosts.length}
            <div className='grid gap-x-2 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    forumPosts.map(post => <PostCard key={post._id}  post={post} refetch={refetch} />)
                }
            </div>
        </div>
    );
};

export default ForumPage;