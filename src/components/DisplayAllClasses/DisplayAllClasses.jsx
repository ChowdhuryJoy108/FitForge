import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Card, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

const TABLE_HEAD = ["ClassID", "Name", "Trainers", "Actions", ""];

const DisplayAllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allClasses");
      console.log(res.data);
      return res.data;
    },
  });

  const [allClasses, setAllClasses] = useState([]);

  useEffect(() => {
    setAllClasses(classes);
  }, [classes]);

  const handleDeleteClass = async (classId) => {
    try {
      await axiosSecure.delete(`/class/${classId}`);

      refetch();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Class deleted successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to delete Class",
      });
    }
  };

  return (
    <div>
      <SectionTitle
        title={"All Classes"}
        subtitle={"Showcasing your assigned Training Classes with details.."}
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
            {allClasses.map(({ _id, classId, name, trainers }, index) => {
              const isLast = index === allClasses.length - 1;
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
                      {classId}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {trainers?.map((trainer, index) => (
                      <Typography
                        key={index}
                        variant="small"
                        color="blue-gray"
                        className=" font-semibold"
                      >
                        {trainer}
                      </Typography>
                    ))}
                  </td>

                  <td className={classes}>
                    <Button
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      onClick={() => handleDeleteClass(_id)}
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

export default DisplayAllClasses;
