import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [ "Name", "Email", "Role", ""];
const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data;
    },
  });

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  const handleDeleteUser = (userId) =>{
    axiosSecure.delete(
      `/allUsers/${userId}`
    );
    setAllUsers(
      users.filter((app) => app._id !== userId)
    );
    refetch();
  }

  const handleMakeAdmin = async (id) => {
    console.log(id)
    try {
      await axiosSecure.patch(`/make-admin/${id}`);
      setAllUsers(
        allUsers.map((user) =>
          user._id === id ? { ...user, role: "admin" } : user
        )
      );
      refetch();
    } catch (error) {
      console.error("Error making user admin:", error);
    }
  };


  console.log(allUsers)
  return (
    <>
      <div className="text-center text-4xl my-4">
        <h1>ALL USERS</h1>
      </div>
      
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
            {allUsers.map(
              ({ _id, name, email, role }, index) => {
                const isLast = index === allUsers.length - 1;
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
                        {role}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button
                        variant="small"
                        color="blue-gray"
                        className="font-normal mr-2"
                        onClick={()=>handleMakeAdmin(_id)}
                      >
                        make admin
                      </Button>

                      <Button
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        onClick={()=>handleDeleteUser(_id)}
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
    </>
  );
};

export default Users;
