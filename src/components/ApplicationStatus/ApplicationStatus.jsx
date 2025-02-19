import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
const TABLE_HEAD = ["Application Status", "Name", "Email"];

const ApplicationStatus = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const { data: application = {} } = useQuery({
    queryKey: ["trainer-application", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainer-application/${user?.email}`);
      return res.data;
    },
  });
  const { data: applicant = {} } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  console.log(application, applicant);
  return (
    <div>
      <h2 className="text-2xl dark:text-black text-center font-bold">
        Track Your Be a Trainer Application.
      </h2>
      <div className="my-[50px]">
        {application.status === "pending" && (
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
                <tr>
                  <td className={"p-4 border-b border-blue-gray-50"}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" bg-yellow-100 p-2 rounded-lg text-center font-semibold"
                    >
                      {application.status}
                    </Typography>
                  </td>
                  <td
                    className={`p-4 border-b border-blue-gray-50 bg-blue-gray-50/50`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {application.name}
                    </Typography>
                  </td>
                  <td className={"p-4 border-b border-blue-gray-50"}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal "
                    >
                      {application.email}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        )}

        {!application && applicant.role === "member" && (
          <div class="flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg p-6 w-full lg:w-3xl">
            <div class="flex justify-between items-center mb-4">
              <h5 class="ml-3 text-slate-800 dark:text-black  text-xl font-semibold">
                Your Application not Accepted!
              </h5>
              <div>
                <Button onClick={handleOpen}><FaEye /></Button>
                <Dialog open={open} handler={handleOpen}>
                  <DialogHeader>
                    <Typography variant="h5" color="blue-gray">
                      Your Attention is Required!
                    </Typography>
                  </DialogHeader>
                  <DialogBody divider className="grid place-items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-16 w-16 text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <Typography color="red" variant="h4">
                      You should read this!
                    </Typography>
                    <Typography className="text-center font-normal">
                    "Thank you for your application. Unfortunately, we are unable to offer you a trainer position at this time. Please don’t hesitate to apply again in the future."
                    </Typography>
                  </DialogBody>
                  <DialogFooter className="space-x-2">
                    <Button
                      variant="text"
                      color="blue-gray"
                      onClick={handleOpen}
                    >
                      close
                    </Button>
                    <Button variant="gradient" onClick={handleOpen}>
                      Ok, Got it
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
