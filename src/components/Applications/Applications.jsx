import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TABLE_HEAD = ["Applicant Name", "Email", "Experience", ""];

const Applications = () => {
  const axiosPublic = useAxiosPublic();
  const { data: applications = [], refetch } = useQuery({
    queryKey: ["trainer-applications"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainer-applications");
      return res.data;
    },
  });

  const [remainingApplications, setRemainingApplications] = useState([]);

  useEffect(() => {
    setRemainingApplications(applications);
  }, [applications]);

  const handleApproveApplication = (applicationId) => {
    console.log(applicationId);
    const res = axiosPublic.post(
      `/trainer-applications/approve/${applicationId}`
    );
    alert(`Trainer approved!`);
    setRemainingApplications(
      applications.filter((app) => app._id !== applicationId)
    );
    refetch();
  };

  const handleRejectApplication = (applicationId) =>{
    console.log(applicationId)
    axiosPublic.delete(
      `/trainer-applications/reject/${applicationId}`
    );
    setRemainingApplications(
      applications.filter((app) => app._id !== applicationId)
    );
    refetch();
  }
  return (
    <div>
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
            {remainingApplications.map(
              ({ _id, name, email, yearsOfExperience }, index) => {
                const isLast = index === remainingApplications.length - 1;
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {yearsOfExperience}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Button
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        onClick={() => handleApproveApplication(_id)}
                      >
                        approve
                      </Button>
                      <Button
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium mx-2"
                        onClick={()=>handleRejectApplication(_id)}
                      >
                        Reject
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

export default Applications;
