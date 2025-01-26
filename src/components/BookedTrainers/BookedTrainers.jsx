import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import { Button, Card, Typography } from "@material-tailwind/react";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";
import { useState } from "react";
import ReviewModal from "../ReviewModal/ReviewModal.jsx";

const TABLE_HEAD = [
  "Transaction ID",
  "ClassID",
  "Trainer",
  "Trainer Email",
  "Slot Name",
  "slot Time",
  "Package",

];
const BookedTrainers = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [open, setOpen] = useState(false);

  const { data: bookingInfo = [], refetch } = useQuery({
    queryKey: ["bookingInfo"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookingInfo/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center mb-[50px]">
        <SectionTitle
          title={
            "Your Fitness Journey: Bookings, Transactions, and Trainer Sessions"
          }
          subtitle={
            "Manage your classes, track payments, and connect with trainers easily."
          }
        />

        <Button
          as="a"
          onClick={() => setOpen(true)}
          variant="small"
          color="gray"
          className="font-medium"
        >
          Write a Review
        </Button>
        <ReviewModal open={open} handleClose={() => setOpen(false)} user={user}/>
      </div>
      <Card className="h-full w-full lg:w-[1050px] overflow-scroll">
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
            {bookingInfo.map(
              (
                {
                  transactionId,
                  classId,
                  selectedTrainer,
                  selectedSlot,
                  selectedPlan,
                },
                index
              ) => {
                const isLast = index === bookingInfo.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={transactionId}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {transactionId}
                      </Typography>
                    </td>
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
                        {selectedTrainer.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {selectedTrainer.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {selectedSlot.slotName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {selectedSlot.slotTime}
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
                        {selectedPlan?.type || "Not Selected"}
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

export default BookedTrainers;
