import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddNewSlotsForm = ({ trainer }) => {
  const { trainerId, name, specialization, bio } = trainer;
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [classes, setClasses] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  // Fetch available classes for the trainer
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosSecure.get("/allClasses");
        setClasses(
          response.data.map((cls) => ({
            value: cls.classId,
            label: cls.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, [axiosSecure]);

  // Form submission handler
  const onSubmit = async (data) => {
    const newSlot = {
      slotId: `slot${Date.now()}`, // Generate unique slot ID
      slotName: data.slotName,
      slotTime: data.slotTime,
      duration: data.duration,
      days: selectedDays.map((day) => day.value), // Extract 'value' from selectedDays
      classIds: selectedClasses.map((cls) => cls.value), // Extract 'value' from selectedClasses
      bookings: [], // Initialize empty bookings
    };

    try {
      await axiosSecure.post(`/trainer/slots/${trainerId}`, newSlot);
      alert("New slot added successfully!");
    } catch (error) {
      console.error("Error adding slot:", error);
      alert("Failed to add slot.");
    }
  };

  return (
    <div>
      <Card className="max-w-4xl mx-auto p-6 shadow-lg bg-gray-50">
        <CardHeader floated={false} shadow={false} className="mb-4">
          <Typography variant="h5" color="blue-gray" className="text-center">
            Add New Slot
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Trainer Info (Read-Only) */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Trainer Name
              </Typography>
              <Input type="text" value={name} readOnly className="bg-gray-100" />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Specialization
              </Typography>
              <Input
                type="text"
                value={specialization?.join(", ")}
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Bio
              </Typography>
              <Input type="text" value={bio} readOnly className="bg-gray-100" />
            </div>

            {/* Select Days */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Select Days
              </Typography>
              <Select
                isMulti
                options={[
                  { value: "Monday", label: "Monday" },
                  { value: "Tuesday", label: "Tuesday" },
                  { value: "Wednesday", label: "Wednesday" },
                  { value: "Thursday", label: "Thursday" },
                  { value: "Friday", label: "Friday" },
                  { value: "Saturday", label: "Saturday" },
                  { value: "Sunday", label: "Sunday" },
                ]}
                value={selectedDays} // Ensure selectedDays structure matches { value, label }
                onChange={(selectedOptions) => setSelectedDays(selectedOptions || [])}
                placeholder="Select days"
                className="basic-multi-select"
              />
              {errors.days && (
                <p className="text-red-500 text-sm">{errors.days.message}</p>
              )}
            </div>

            {/* Slot Name */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Slot Name
              </Typography>
              <Input
                type="text"
                placeholder="e.g., Morning Slot"
                {...register("slotName", { required: "Slot name is required" })}
                error={!!errors.slotName}
              />
              {errors.slotName && (
                <p className="text-red-500 text-sm">{errors.slotName.message}</p>
              )}
            </div>

            {/* Slot Time */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Slot Time
              </Typography>
              <Input
                type="text"
                placeholder="e.g., 10:00 AM - 11:00 AM"
                {...register("slotTime", { required: "Slot time is required" })}
                error={!!errors.slotTime}
              />
              {errors.slotTime && (
                <p className="text-red-500 text-sm">{errors.slotTime.message}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Duration (Minutes)
              </Typography>
              <Input
                type="number"
                placeholder="e.g., 60"
                {...register("duration", { required: "Duration is required" })}
                error={!!errors.duration}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Select Classes */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Classes
              </Typography>
              <Select
                isMulti
                options={classes} // Dynamically loaded classes
                value={selectedClasses}
                
                onChange={(selectedOptions) =>
                  setSelectedClasses(selectedOptions || [])
                }
                placeholder="Select classes"
              />
              {errors.classIds && (
                <p className="text-red-500 text-sm">{errors.classIds.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
              >
                Add Slot
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddNewSlotsForm;
