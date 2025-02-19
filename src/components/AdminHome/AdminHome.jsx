import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { BsFileEarmarkPost } from "react-icons/bs";
import { SiTrainerroad } from "react-icons/si";
import { IoMdFitness } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import  SectionTitle from '../SectionTitle/SectionTitle'

import { MdUnsubscribe } from "react-icons/md";
import CustomBarChart from "../CustomBarChart/CustomBarChart";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data;
    },
  });
  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });
  const { data: classes = [] } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allClasses");
      return res.data;
    },
  });
  const { data: posts = [] } = useQuery({
    queryKey: ["forumPosts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/forumPosts");
      return res.data;
    },
  });

  const { data: subscribers= [] } = useQuery({
    queryKey: ["subscribe"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscribe");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const totalPrice = payments.reduce((sum, payment) => sum + payment.price, 0);

  const chartData = [
    { name: "Revenue ($)", value: totalPrice },
    { name: "Users", value: users.length },
    { name: "Trainers", value: trainers.length },
    { name: "Classes", value: classes.length },
    { name: "Posts", value: posts.length },
    { name: "Subscribers", value: subscribers.length },
  ];

  return (
    <div>
      <div>
        <SectionTitle title={"Manage Users, Trainers, Transactions and more.."} subtitle={"Fitness Admin Dashboard: Manage Users, Trainers, and Transactions"} /> 
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div class="relative flex flex-col gap-4 my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full p-6 lg:w-64">
          <div class="flex items-center mb-4">
            <RiMoneyDollarCircleFill className="text-3xl dark:text-black" />
            <h5 class="ml-3 text-slate-800 text-sm font-semibold dark:text-black">
              Total Balance
            </h5>
          </div>
          <h1 className="text-6xl text-center text-orange-500">
            {totalPrice} <span className="text-3xl  text-yellow-800">$</span>
          </h1>
          <div>
            <Link
              to={"/dashboard/balance"}
              className="text-slate-800 dark:text-black font-semibold text-sm hover:underline flex items-center"
            >
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div class="relative flex flex-col gap-4  my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full p-6  lg:w-64">
          <div class="flex items-center mb-4">
            <FaUsers className="text-3xl dark:text-black" />
            <h5 class="ml-3 text-slate-800 dark:text-black text-sm font-semibold">
              Number of Users
            </h5>
          </div>
          <h1 className="text-6xl text-center text-yellow-800">
            {users.length}
          </h1>
          <div>
            <Link
              to={"/dashboard/allUsers"}
              class="text-slate-800 dark:text-black font-semibold text-sm hover:underline flex items-center"
            >
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div class="relative flex flex-col gap-4  my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-6  w-full  lg:w-64">
          <div class="flex items-center mb-4">
            <SiTrainerroad className="text-3xl dark:text-black" />
            <h5 class="ml-3 text-slate-800 dark:text-black text-sm font-semibold">
              Number of Trainers
            </h5>
          </div>
          <h1 className="text-6xl text-center text-green-600">
            {trainers.length}
          </h1>
          <div>
            <Link
              to={"/dashboard/allTrainers"}
              class="text-slate-800 dark:text-black font-semibold text-sm hover:underline flex items-center"
            >
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div class="relative flex flex-col gap-4  my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-6  w-full  lg:w-64">
          <div class="flex items-center mb-4">
            <IoMdFitness className="text-3xl dark:text-black" />
            <h5 class="ml-3 text-slate-800 dark:text-black text-sm font-semibold">
              Number of Classes
            </h5>
          </div>
          <h1 className="text-6xl text-center text-light-blue-600">
            {classes.length}
          </h1>
          <div>
            <Link
              to={"/dashboard/allClasses"}
              class="text-slate-800 dark:text-black font-semibold text-sm hover:underline flex items-center"
            >
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div class="relative flex flex-col gap-4  my-6 bg-white shadow-sm border border-slate-200 rounded-lg  p-6  w-full  lg:w-64">
          <div class="flex items-center mb-4">
            <BsFileEarmarkPost className="text-3xl dark:text-black" />
            <h5 class="ml-3 text-slate-800 dark:text-black text-sm font-semibold">
              Number of Posts
            </h5>
          </div>
          <h1 className="text-6xl text-center text-purple-500">
            {posts.length}
          </h1>
          <div>
            <Link
              to={"/dashboard/forumPosts"}
              class="text-slate-800 dark:text-black font-semibold text-sm hover:underline flex items-center"
            >
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div class="relative flex flex-col gap-4  my-6 bg-white shadow-sm border border-slate-200 rounded-lg  p-6  w-full  lg:w-64">
          <div class="flex items-center mb-4">
            <MdUnsubscribe className="text-3xl dark:text-black" />
            <h5 class="ml-3 text-slate-800 dark:text-black text-sm font-semibold">
              Number of Subcribers
            </h5>
          </div>
          <h1 className="text-6xl text-center text-purple-500">
            {subscribers.length}
          </h1>
          <div>
            <Link
              to={"/dashboard/subscribers"}
              class="text-slate-800 dark:text-black font-semibold text-sm hover:underline flex items-center"
            >
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div>
      <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default AdminHome;
