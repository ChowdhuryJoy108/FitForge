// import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";

import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  
  const [isAdmin] = useAdmin();
  console.log(isAdmin);

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu flex flex-col gap-4 p-4">
          {isAdmin ? (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/dashboard/subscribers">Subcribers</NavLink>
              <NavLink to="/dashboard/allUsers">Users</NavLink>
              <NavLink to="/dashboard/trainers">Trainers</NavLink>
              <NavLink to="/dashboard/applications">Applications</NavLink>
              <NavLink to="/dashboard/forumPosts">Forum Posts</NavLink>
              <NavLink to="/dashboard/createForumPost">Create Forum post</NavLink>
              <NavLink to="/dashboard/createClass">AddClass</NavLink>{" "}
            </>
          ): <> 
             <NavLink to="/">Home</NavLink>
             <NavLink to="/dashboard/forumPosts">Forum Posts</NavLink>
             <NavLink to="/dashboard/createForumPost">Create Forum post</NavLink>
          </>
          }
          
       

        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
