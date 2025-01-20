import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Assuming you're using a custom Axios hook

const UpdateSlotModal = ({
  open,
  handleClose,
  slot,
  onUpdate,

}) => {
  console.log(slot);
  const axiosSecure = useAxiosSecure(); // Your Axios instance for secure API calls
  const [formData, setFormData] = useState({
    slotName: "",
    slotTime: "",
    duration: "",
    days: [],
    // classIds: [],
  });

  const [loading, setLoading] = useState(false); // To manage loading state

  useEffect(() => {
    if (slot) {
      console.log("Slot data:", slot); // Debugging log
      console.log("Trainer classes:", slot.trainerClasses); // Debugging log
  
      setFormData({
        slotName: slot.slotName || "",
        slotTime: slot.slotTime || "",
        duration: slot.duration || "",
        days: Array.isArray(slot.days)
          ? slot.days.map((day) => ({ value: day, label: day }))
          : [],
        // classIds: Array.isArray(slot.classIds)
        //   ? slot.classIds.map((clsId) => ({
        //       value: clsId,
        //       label: slot.trainerClasses?.find((cls) => cls.lebel === clsId)?.label || clsId,
        //     }))
        //   : [],
      });
    }
  }, [slot]);
  

//   useEffect(() => {
//     if (slot) {
//       setFormData({
//         slotName: slot.slotName,
//         slotTime: slot.slotTime,
//         duration: slot.duration,
//         days: slot.days.map((day) => ({ value: day, label: day })),
//         classIds: slot.classIds.map((clsId) => ({
//           value: clsId,
//           label:
//             trainerClasses.find((cls) => cls.value === clsId)?.label || clsId,
//         })),
//       });
//     }
//   }, [slot, trainerClasses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selected, name) => {
    setFormData({ ...formData, [name]: selected });
  };

  const handleSubmit = async () => {
    const updatedSlot = {
      ...formData,
      days: formData.days.map((day) => day.value),
    };

    setLoading(true); // Start loading
    try {
      // Backend API call
      const response = await axiosSecure.put(
        `/trainer/slots/${slot.trainerId}/${slot.slotId}`, // Adjust the endpoint as needed
        updatedSlot
      );

      if (response.data.success) {
        // Notify parent component of the update
        onUpdate(response.data.updatedSlot);
        handleClose(); // Close modal after successful update
      } else {
        console.error("Error updating slot:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating slot:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Dialog open={open} handler={handleClose} size="lg">
      <DialogHeader>
        <Typography variant="h5">Update Slot</Typography>
      </DialogHeader>
      <DialogBody divider>
        <div className="space-y-4">
          {/* Slot Name */}
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1">
              Slot Name
            </Typography>
            <Input
              type="text"
              name="slotName"
              value={formData.slotName}
              onChange={handleInputChange}
              placeholder="Enter slot name"
            />
          </div>

          {/* Slot Time */}
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1">
              Slot Time
            </Typography>
            <Input
              type="text"
              name="slotTime"
              value={formData.slotTime}
              onChange={handleInputChange}
              placeholder="e.g., 10:00 AM - 11:00 AM"
            />
          </div>

          {/* Duration */}
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1">
              Duration (Minutes)
            </Typography>
            <Input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Enter duration"
            />
          </div>

          {/* Days */}
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1">
              Select Days
            </Typography>
            <Select
              isMulti
              name="days"
              options={[
                { value: "Monday", label: "Monday" },
                { value: "Tuesday", label: "Tuesday" },
                { value: "Wednesday", label: "Wednesday" },
                { value: "Thursday", label: "Thursday" },
                { value: "Friday", label: "Friday" },
              ]}
              value={formData.days}
              onChange={(selected) => handleSelectChange(selected, "days")}
              placeholder="Select days"
              className="basic-multi-select"
            />
          </div>

          {/* <div>
            <Typography variant="small" color="blue-gray" className="mb-1">
              Select Classes
            </Typography>
            <Select
              isMulti
              name="classIds"
              options={slot.trainerClasses.map((cls) => ({
                value: cls.value,
                label: cls.label || cls.value, // Ensure label is set correctly
              }))}
              value={formData.classIds}
              onChange={(selected) => handleSelectChange(selected, "classIds")}
              placeholder="Select classes"
              className="basic-multi-select"
            />
          </div> */}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="blue-gray"
          onClick={handleClose}
          className="mr-2"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="blue"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Slot"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateSlotModal;
