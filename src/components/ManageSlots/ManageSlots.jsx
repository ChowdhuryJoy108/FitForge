import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Card, Typography } from "@material-tailwind/react";
import UpdateSlotModal from "../UpdateSlotModal/UpdateSlotModal"; // Import the modal component
import Swal from "sweetalert2";
import SectionTitle from "../SectionTitle/SectionTitle";

const TABLE_HEAD = ["Slot Name", "Slot Time", "Days", "Duration", ""];

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [trainer, setTrainer] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const res = await axiosSecure.get(`/specific-trainer/${user.email}`);
          setTrainer(res.data);
       
        } catch (error) {
          // console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      // console.log("User is not authenticated or email is missing");
    }
  }, [user]);


  const handleOpenModal = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };


  const handleUpdateSlot = (updatedSlot) => {
  
    setTrainer((prev) => ({
      ...prev,
      availableSlots: prev.availableSlots.map((slot) =>
        slot.slotId === updatedSlot.slotId ? updatedSlot : slot
      ),
    }));
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const res = await axiosSecure.delete(
        `/trainer/slots/${trainer.trainerId}/${slotId}`
      );
      if (res.data.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        setTrainer((prev) => ({
          ...prev,
          availableSlots: prev.availableSlots.filter(
            (slot) => slot.slotId !== slotId
          ),
        }));
      } else {
        console.error("Failed to delete slot:", res.data.message);
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <div>
      <SectionTitle
        
        title={"Manage Your Slots"}
        subtitle={
          "Manage Slots - Update Classes timelines and others information.."
        }
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
            {trainer?.availableSlots?.map(
              (
                { slotId, slotName, slotTime, duration, days, classIds },
                index
              ) => {
                const isLast = index === trainer?.availableSlots?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={slotId}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {slotName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {slotTime}
                      </Typography>
                    </td>

                    <td className={classes}>
                      {days.map((day, index) => (
                        <Typography
                          key={index}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {typeof day === "string" ? day : day.value}{" "}
                          
                        </Typography>
                      ))}
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {duration} min
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button
                        variant="small"
                        color="blue-gray"
                        className="font-normal mr-2"
                        onClick={() =>
                          handleOpenModal({
                            trainerId: trainer.trainerId,
                            slotId,
                            slotName,
                            slotTime,
                            duration,
                            days,
                            
                          })
                        }
                      >
                        Update
                      </Button>

                      <Button
                        variant="small"
                        color="red"
                        className="font-normal"
                        onClick={() => handleDeleteSlot(slotId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>

    

      {isModalOpen && selectedSlot && (
        <UpdateSlotModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          slot={selectedSlot}
          onUpdate={handleUpdateSlot}
          //   trainerClasses={trainerClasses} // Pass trainer classes as a prop
        />
      )}
    </div>
  );
};

export default ManageSlots;
