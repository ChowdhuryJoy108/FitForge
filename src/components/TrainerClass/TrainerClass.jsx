import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card, Typography } from "@material-tailwind/react";
import SectionTitle from "../SectionTitle/SectionTitle";

const TABLE_HEAD = ["ClassID", "Name", "Details", ""];

const TrainerClass = ({ trainerId }) => {
  console.log(trainerId);
  const [trainerClasses, setTrainerClasses] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosSecure.get(`/trainer/${trainerId}/classes`);
        setTrainerClasses(response.data);
      } catch (err) {
        console.error("Error fetching trainer classes:", err);
      }
    };

    fetchClasses();
  }, [trainerId]);

  console.log(trainerClasses);
  return (
    <div>
      <SectionTitle title={"Assigned Classes"} subtitle={"Showcasing your assigned Training Classes with details.."} />
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trainerClasses.map(
              ({ classId, name, additionalDetails }, index) => {
                const isLast = index === trainerClasses.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {classId}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {additionalDetails}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
   
    </div>
  );
};

export default TrainerClass;
