import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Classes from "../pages/Classes/Classes";
import Trainers from "../pages/Trainers/Trainers";
import TrainerDetails from "../pages/TrainerDetails/TrainerDetails";
import TrainerBooking from "../pages/TrainerBooking/TrainerBooking";
import Payment from "../pages/Payment/Payment";
import CreateClass from "../components/CreateClass/CreateClass";
import Dashboard from "../layouts/Dashboard";
import Users from "../components/Users/Users";
import BeATrainerForm from "../components/BeATrainerForm/BeATrainerForm";
import Applications from "../components/Applications/Applications";
import CreateForumPost from "../components/CreateForumPost/CreateForumPost";
import ForumPosts from "../components/ForumPosts/ForumPosts";
import ForumPage from "../pages/ForumPage/ForumPage";
import PostDetails from "../pages/PostDetails/PostDetails";
import AddNewSlots from "../components/AddNewSlots/AddNewSlots";
import TrainerClasses from "../components/TrainerClasses/TrainerClasses";
import ManageSlots from "../components/ManageSlots/ManageSlots";
import AllSubcribers from "../components/AllSubcribers/AllSubcribers";
import AllTrainers from "../components/AllTrainers/AllTrainers";
import PrivateRoute from "./PrivateRoute";
import DisplayAllClasses from "../components/DisplayAllClasses/DisplayAllClasses";
import DisplayBalanceInformations from "../components/DisplayBalanceInformations/DisplayBalanceInformations";
import AdminHome from "../components/AdminHome/AdminHome";
import DashboardHome from "../components/DashboardHome/DashboardHome";
import BookedTrainers from "../components/BookedTrainers/BookedTrainers";
import ApplicationStatus from "../components/ApplicationStatus/ApplicationStatus";
import Myclients from "../components/Myclients/Myclients";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "trainers",
        element: <Trainers />,
      },
      {
        path: "trainer/:trainerId",
        element: (
          <PrivateRoute>
            <TrainerDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "trainer-booked",
        element: (
          <PrivateRoute>
            <TrainerBooking />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "createClass",
        element: <CreateClass />,
      },
      {
        path: "betrainer",
        element: (
          <PrivateRoute>
            <BeATrainerForm />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "forum",
        element: <ForumPage />,
      },
      {
        path: "/forum/:postId",
        element: (
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path:"/dashboard",
        element:<DashboardHome />
      },
      {
        path: "/dashboard/allUsers",
        element: <Users />,
      },
      {
        path: "/dashboard/adminHome",
        element: <AdminHome />,
      },
      {
        path: "/dashboard/createClass",
        element: <CreateClass />,
      },
      {
        path: "/dashboard/applications",
        element: <Applications />,
      },
      {
        path: "/dashboard/createForumPost",
        element: <CreateForumPost />,
      },
      {
        path: "/dashboard/forumPosts",
        element: <ForumPosts />,
      },
      {
        path: "/dashboard/addNewSlots",
        element: <AddNewSlots />,
      },
      {
        path: "/dashboard/trainerClasses",
        element: <TrainerClasses />,
      },
      {
        path: "/dashboard/manageSlots",
        element: <ManageSlots />,
      },
      {
        path: "/dashboard/subscribers",
        element: <AllSubcribers />,
      },
      {
        path: "/dashboard/allTrainers",
        element: <AllTrainers />,
      },
      {
        path: "/dashboard/allClasses",
        element: <DisplayAllClasses />,
      },
      {
        path: "/dashboard/balance",
        element: <DisplayBalanceInformations />,
      },
      {
        path:"/dashboard/bookedTrainers",
        element:<BookedTrainers />
      },
      {
        path:"/dashboard/trainerApplication",
        element:<ApplicationStatus />
      },
      {
        path:"/dashboard/clients",
        element:<Myclients />
      }
    ],
  },
]);

export default router;
