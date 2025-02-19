import React from "react";

import useAuth from "../../hooks/useAuth";

import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <div>
        <SectionTitle
        
          title={"Your Profile – Track Yourself"}
          subtitle={
            "Manage your fitness journey, update details, and stay motivated daily."
          }
        />
        <div class="flex w-full mx-auto p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-6">
          <div class="flex items-center gap-4 text-slate-800 dark:text-[#111111]">
            <img
              src={user?.photoURL || "https://i.ibb.co.com/F3bGVHT/dummyprofile.webp"}
              alt={user?.email}
              class="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
            />
            <div class="flex w-full flex-col">
              <div class="flex items-center justify-between">
                <h5 class="text-xl font-semibold text-slate-800 dark:text-[#111111]">
                  {user?.displayName || "No Name"}
                </h5>
              </div>
              <p class="text-xs  font-bold text-slate-500 dark:text-[#111111] mt-0.5">
                {user?.email}
              </p>
            </div>
          </div>
          <div class="mt-6">
            <p class="text-base text-slate-600 dark:text-[#111111] font-light leading-normal">
              Registration at : {user?.metadata?.creationTime}
            </p>
          </div>
          <div>
            <Link to={"/"}>
              <button
                className="font-semibold rounded-md dark:text-[#111111] border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Home
              </button>
            </Link>
            <Link to="/dashboard/bookedTrainers">
              <button
                className="font-semibold rounded-md border dark:text-[#111111] border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Booked Trainers
              </button>
            </Link>
            <Link to={"/dashboard/trainerApplication"}>
              <button
                className="font-semibold rounded-md border dark:text-[#111111] border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Activity Log
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
