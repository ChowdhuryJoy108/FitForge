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
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateSlotModal = ({ open, handleClose, slot, onUpdate }) => {
  console.log(slot);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    slotName: "",
    slotTime: "",
    duration: "",
    days: [],
    classIds: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slot) {
      console.log("Slot data:", slot);

      setFormData({
        slotName: slot.slotName || "",
        slotTime: slot.slotTime || "",
        duration: slot.duration || "",
        days: Array.isArray(slot.days)
          ? slot.days.map((day) =>
              typeof day === "string" ? { value: day, label: day } : day
            )
          : [],
      });
    }
  }, [slot]);

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

    setLoading(true);
    try {
      const response = await axiosSecure.put(
        `/trainer/slots/${slot.trainerId}/${slot.slotId}`, // Adjust the endpoint as needed
        updatedSlot
      );

      if (response.data.success) {
        Swal.fire({
          title: "Updated!",
          text: "Your Slots has been updated.",
          icon: "success",
        });
        onUpdate(response.data.updatedSlot);
        handleClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error updating slot!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating slot!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={handleClose} size="lg">
      <DialogHeader>
        <Typography variant="h5">Update Slot</Typography>
      </DialogHeader>
      <DialogBody divider>
        <div className="space-y-4">
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
          color="blue-gray"
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
