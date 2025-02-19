import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import { Button, Card, Typography } from "@material-tailwind/react";
import SectionTitle from "../SectionTitle/SectionTitle";
const TABLE_HEAD = ["ID", "Email", ""];
const AllSubcribers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [], refetch } = useQuery({
    queryKey: ["subscribe"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscribe");
      return res.data;
    },
  });

  const [allSubscribers, setAllSubscriber] = useState([]);
  
    useEffect(() => {
      setAllSubscriber(subscribers);
    }, [subscribers]);
  
    const handleDeleteSubscriber = (id) =>{
      axiosSecure.delete(
        `/subscribe/${id}`
      );
      setAllSubscriber(
        allSubscribers.filter((sub) => sub._id !== id)
      );
      refetch();
    }



  return (
    <div>
       <SectionTitle
        title={"All subcriptions"}
        subtitle={"Track all the Subcriptions in one place with all necessary informations.."}
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
            {allSubscribers.map(({ _id, email}, index) => {
              const isLast = index === allSubscribers.length - 1;
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
                      {_id}
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
                   

                    <Button
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      onClick={() => handleDeleteSubscriber(_id)}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AllSubcribers;
