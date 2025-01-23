import React from "react";
import { Typography } from "@material-tailwind/react";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center text-center px-4 py-8 space-y-4 md:py-12">
      {/* Section Title */}
      <Typography
        variant="h4"
        color="blue-gray"
        className="text-xl w-full md:text-2xl font-bold leading-tight lg:w-[800px]"
      >
        {title}
      </Typography>

      {/* Section Subtitle */}
      <Typography
        variant="h6"
        color="blue-gray"
        className="text-base w-full md:text-md font-medium text-gray-600 lg:w-[600px]"
      >
        {subtitle}
      </Typography>

      
    </div>
  );
};

export default SectionTitle;
