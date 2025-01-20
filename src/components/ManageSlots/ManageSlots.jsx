import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Card, Typography } from "@material-tailwind/react";
import UpdateSlotModal from "../UpdateSlotModal/UpdateSlotModal"; // Import the modal component

const TABLE_HEAD = ["Slot Name", "Slot Time", "Days", "Duration", ""];

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [trainer, setTrainer] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [trainerClasses, setTrainerClasses] = useState([]); // Selected slot

  // Fetch trainer data
  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const res = await axiosSecure.get(`/specific-trainer/${user.email}`);
          setTrainer(res.data);
          console.log(trainer?.trainerId)
        //   const classesRes = await axiosSecure.get(`/trainer/${trainer?.trainerId}/classes`);
        //   console.log(classesRes)
        //   const classOptions = classesRes.data.map((cls) => ({
        //     // value: cls.classId,
        //     label: cls.classId,
        //   }));
        //   setTrainerClasses(classOptions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      console.log("User is not authenticated or email is missing");
    }
  }, [user]);


  console.log(trainer)
  console.log(trainerClasses)

  // Handle opening the modal
  const handleOpenModal = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  // Handle updating the slot
  const handleUpdateSlot = (updatedSlot) => {
    // Update local state with the updated slot passed from the modal
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
        // Update local state to reflect deletion
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
                          {day}
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
                            // classIds,
                            // trainerClasses:trainerClasses
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

      {/* Update Slot Modal */}

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
