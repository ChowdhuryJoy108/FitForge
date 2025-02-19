import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useTrainer from "../hooks/useTrainer";
import { IoHomeSharp } from "react-icons/io5";
import { IoWalletSharp } from "react-icons/io5";
import { MdPostAdd, MdSettingsApplications, MdUnsubscribe } from "react-icons/md";
import { FaUserAlt, FaUserTag } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { FaCheckToSlot, FaFolderPlus } from "react-icons/fa6";
import { SiTrainerroad } from "react-icons/si";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RxActivityLog } from "react-icons/rx";
import { TbBrandBooking } from "react-icons/tb";
import { IoIosCreate } from "react-icons/io";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isTrainer] = useTrainer();

  return (
    <div className="px-2 flex flex-col h-auto lg:flex-row min-h-screen">
      <div className="bg-gray-800 dark:bg-gray-600 w-full lg:w-64 lg:min-h-screen">
        <div className="p-4">
          {isAdmin && (
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          )}
          {isTrainer && (
            <h1 className="text-xl font-bold text-white">Trainer Dashboard</h1>
          )}
          
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
                    ? "text-white font-bold inline-flex gap2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
                <IoHomeSharp /> Home
              </NavLink>
              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center  hover:text-gray-200"
                }
              >
                <IoHomeSharp /> Admin Home
              </NavLink>
              <NavLink
                to="/dashboard/balance"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
                <IoWalletSharp /> Balance Informations
              </NavLink>
              <NavLink
                to="/dashboard/subscribers"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
                <MdUnsubscribe /> Subscribers
              </NavLink>
              <NavLink
                to="/dashboard/allUsers"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
                <FaUserAlt /> Users
              </NavLink>

              <NavLink
                to="/dashboard/allClasses"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
               <MdOutlineClass /> classes
              </NavLink>
              <NavLink
                to="/dashboard/createClass"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
               <FaFolderPlus /> Add New Class
              </NavLink>
              <NavLink
                to="/dashboard/allTrainers"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
                <SiTrainerroad /> Trainers
              </NavLink>
              <NavLink
                to="/dashboard/applications"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
               <MdSettingsApplications /> Applications
              </NavLink>
              <NavLink
                to="/dashboard/forumPosts"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
                <BsFileEarmarkPost /> Forum Posts
              </NavLink>
              <NavLink
                to="/dashboard/createForumPost"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
               <MdPostAdd /> Create Forum Post
              </NavLink>
            </>
          )}
          {isTrainer && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
              <IoHomeSharp />  Home
              </NavLink>
              <NavLink
                to="/dashboard/clients"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
              <FaUserTag /> My client
              </NavLink>
              <NavLink
                to="/dashboard/trainerClasses"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
               <MdOutlineClass /> Classes
              </NavLink>

              <NavLink
                to="/dashboard/forumPosts"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
              <BsFileEarmarkPost />  Forum Posts
              </NavLink>
              <NavLink
                to="/dashboard/createForumPost"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
                <MdPostAdd /> Create Forum Post
              </NavLink>
              <NavLink
                to="/dashboard/manageSlots"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
               <FaCheckToSlot /> Manage Slots
              </NavLink>
              <NavLink
                to="/dashboard/addNewSlots"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
              <IoIosCreate />  Add New Slots
              </NavLink>
            </>
          )}

          {!isAdmin && !isTrainer && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
              <IoHomeSharp />  Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
               <CgProfile /> My Profile
              </NavLink>
              <NavLink
                to="/dashboard/trainerApplication"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
               <RxActivityLog /> Activity Log
              </NavLink>
              <NavLink
                to="/dashboard/bookedTrainers"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold inline-flex gap-2 items-center"
                    : "text-white inline-flex gap-2 items-center hover:text-gray-200"
                }
              >
               <TbBrandBooking /> Booked Trainers
              </NavLink>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-800 dark:text-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
