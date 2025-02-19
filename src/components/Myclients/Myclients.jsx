import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Card, Typography } from "@material-tailwind/react";
import SectionTitle from "../SectionTitle/SectionTitle";

const TABLE_HEAD = [
  "Client Name",
  "Email",
  "Package Enrolled",
  "paid",
  "Slot Name",
  "Slot Days",
];

const Myclients = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clients/${user?.email}`);
      return res.data;
    },
  });
  
  return (
    <div>
      <SectionTitle title={"Enrolled Clients"} subtitle={"These are the clients who booked you as their trainer.."} />
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
            {clients.map(
              ({ name, email, price, selectedPlan, selectedSlot }, index) => {
                const isLast = index === clients.length - 1;
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
                        {name || email}
                      </Typography>
                    </td>
                    <td className={classes}>
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
                        {selectedPlan.type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {selectedSlot.slotName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {selectedSlot?.days.map((day, i) => (
                        <Typography
                          key={i}
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {day}
                        </Typography>
                      ))}
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

export default Myclients;
