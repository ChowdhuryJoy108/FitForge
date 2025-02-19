import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SectionTitle from "../SectionTitle/SectionTitle";

const TABLE_HEAD = ["Name", "Email", "Specialization", "Experience", "Actions"];

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allTrainers = [], refetch } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });

  const [allRegisteredTrainers, setAllRegisteredTrainers] = useState([]);

  useEffect(() => {
    setAllRegisteredTrainers(allTrainers);
  }, [allTrainers]);

  const handleDeleteTrainer = async (trainerId, userEmail) => {
    try {
      await axiosSecure.patch(`/users/role/${userEmail}`, {
        role: "member",
      });

      await axiosSecure.delete(`/trainer-delete/${trainerId}`);

      refetch()

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Trainer deleted successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to delete trainer",
      });
    }
  };

  return (
    <div>
      <SectionTitle
        title={"All Trainers"}
        subtitle={"Track all enlisted Trainers in one place with all necessary actions.."}
      />
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
            {allRegisteredTrainers.map(
              (
                {_id, trainerId, name, email, specialization, yearsOfExperience },
                index
              ) => {
                const isLast = index === allRegisteredTrainers.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {specialization?.map((sp, index) => (
                        <Typography
                          key={index}
                          variant="small"
                          color="blue-gray"
                          className=" font-semibold"
                        >
                          {sp}
                        </Typography>
                      ))}
                    </td>

                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {yearsOfExperience}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Button
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        onClick={() => handleDeleteTrainer(trainerId, email)}
                      >
                        delete
                      </Button>
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

export default AllTrainers;
