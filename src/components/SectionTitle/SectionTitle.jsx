import React from "react";
import { Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

const SectionTitle = ({ title, subtitle }) => {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <div className="flex w-full flex-col items-center text-center px-4 py-8 space-y-4 md:py-12">

      <Typography
        variant="h4"
        color="blue-gray"
        className={`text-xl w-full md:text-4xl font-bold leading-tight lg:w-[800px] dark:text-[#DEE4E7]`}
      >
        {title}
      </Typography>

  
      <Typography
        variant="h6"
        color="blue-gray"
        className="text-base w-full md:text-md font-medium dark:text-gray-400 text-gray-600 lg:w-[600px]"
      >
        {subtitle}
      </Typography>

      
    </div>
  );
};

export default SectionTitle;
