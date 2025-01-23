import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useTrainer from "../hooks/useTrainer";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isTrainer] = useTrainer();

  return (
    <div className="px-2 flex flex-col h-auto lg:flex-row min-h-screen">

      <div className="bg-gray-800 w-full lg:w-64 lg:min-h-screen">
        <div className="p-4">
         
           {isAdmin && (
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          )}
          {isTrainer && (
            <h1 className="text-xl font-bold text-white">Trainer Dashboard</h1>
          )},
          {!isAdmin && !isTrainer && (
            <h1 className="text-xl font-bold text-white">User Dashboard</h1>
          )}
         
        </div>
        <ul className="menu flex flex-col gap-4 p-4">
          {isAdmin && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Admin Home
              </NavLink>
              <NavLink
                to="/dashboard/balance"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Balance Informations
              </NavLink>
              <NavLink
                to="/dashboard/subscribers"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Subscribers
              </NavLink>
              <NavLink
                to="/dashboard/allUsers"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Users
              </NavLink>

              <NavLink
                to="/dashboard/allClasses"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                classes
              </NavLink>
              <NavLink
                to="/dashboard/createClass"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Add New Class
              </NavLink>
              <NavLink
                to="/dashboard/allTrainers"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Trainers
              </NavLink>
              <NavLink
                to="/dashboard/applications"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Applications
              </NavLink>
              <NavLink
                to="/dashboard/forumPosts"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Forum Posts
              </NavLink>
              <NavLink
                to="/dashboard/createForumPost"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Create Forum Post
              </NavLink>
              
            </>
          )}
          {isTrainer && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/trainerClasses"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Classes
              </NavLink>

              <NavLink
                to="/dashboard/forumPosts"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Forum Posts
              </NavLink>
              <NavLink
                to="/dashboard/createForumPost"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Create Forum Post
              </NavLink>
              <NavLink
                to="/dashboard/manageSlots"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Manage Slots
              </NavLink>
              <NavLink
                to="/dashboard/addNewSlots"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Add New Slots
              </NavLink>
            </>
          )}

          {!isAdmin && !isTrainer && (
            <>
             <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/userProfile"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/dashboard/bookedTrainers"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Booked Trainers
              </NavLink>
              <NavLink
                to="/dashboard/trainerApplication"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold"
                    : "text-white hover:text-gray-200"
                }
              >
                Applications Status
              </NavLink>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
