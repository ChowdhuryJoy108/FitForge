import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import Select from "react-select";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const BeATrainerForm = () => {
  const axiosPublic = useAxiosPublic();
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosPublic.get("/allClasses");
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
  }, [axiosPublic]);

  console.log(classes);

  const specializationOptions = [
    { value: "Yoga", label: "Yoga" },
    { value: "Strength Training", label: "Strength Training" },
    { value: "Aqua Aerobics", label: "Aqua Aerobics" },
    { value: "Pilates", label: "Pilates" },
    { value: "Cardio", label: "Cardio" },
  ];

  const handleAddSlot = () => {
    setAvailableSlots([
      ...availableSlots,
      { slotName: "", slotTime: "", duration: "", days: [] },
    ]);
  };

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...availableSlots];
    newSlots[index][field] = value;
    setAvailableSlots(newSlots);
  };

  const handleSlotDaysChange = (index, selectedDays) => {
    const newSlots = [...availableSlots];
    newSlots[index].days = selectedDays;
    setAvailableSlots(newSlots);
  };

  const validateSlots = () => {
    return availableSlots.every(
      (slot) =>
        slot.slotName.trim() !== "" &&
        slot.slotTime.trim() !== "" &&
        slot.duration > 0 &&
        slot.days.length > 0
    );
  };

  const onSubmit = async (data) => {
    if (!validateSlots()) {
      Swal.fire("Please complete all slot details before submitting.");
      return;
    }

    try {
      const formattedData = {
        name: data.name,
        email: data.email,
        profileImage: data.profileImage,
        specialization: data.specialization.map((spec) => spec.value),
        bio: data.bio,
        yearsOfExperience: data.yearsOfExperience,
        socialIcons: {
          facebook: data.socialIcons.facebook,
          instagram: data.socialIcons.instagram,
          linkedin: data.socialIcons.linkedin,
        },

        availableSlots: availableSlots.map((slot, index) => ({
          slotId: `slot${Date.now()}-${index}`, 
          slotName: slot.slotName,
          slotTime: slot.slotTime,
          duration: slot.duration,
          days: slot.days.map((day) => day.value),
          classIds: selectedClasses.map((cls) => cls.value),
          bookings: [],
        })),
        createdAt: new Date(),
        status:"pending",
      };

      await axiosPublic.post("/applyTrainer", formattedData);
      Swal.fire("Application submitted successfully!");
      reset();
      setAvailableSlots([]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to submit the application.",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>FitForge | Be a Trainer</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto p-8 bg-white rounded-md shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center dark:text-black">Be a Trainer</h2>

       
        <div>
          <Input
            label="Name"
            value={user?.displayName}
            readOnly
            {...register("name")}
            className="cursor-not-allowed"
          />
        </div>
        <div>
          <Input
            type="email"
            label="Email"
            value={user?.email}
            readOnly
            {...register("email")}
            className="cursor-not-allowed"
          />
        </div>


        <div>
          <Input
            type="url"
            label="Profile Image URL"
            {...register("profileImage")}
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Specialization:</label>
          <Controller
            name="specialization"
            control={control}
            defaultValue={[]}
            rules={{ required: "At least one specialization is required" }}
            render={({ field }) => (
              <Select
                isMulti
                options={specializationOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                {...field}
              />
            )}
          />
          {errors.specialization && (
            <Typography color="red">{errors.specialization.message}</Typography>
          )}
        </div>

   
        <div>
          <Textarea
            label="Bio"
            {...register("bio", { required: "Bio is required" })}
          />
          {errors.bio && (
            <Typography color="red">{errors.bio.message}</Typography>
          )}
        </div>

        <div>
          <Input
            type="number"
            label="Years of Experience"
            {...register("yearsOfExperience", {
              required: "Years of experience is required",
              valueAsNumber: true,
            })}
          />
          {errors.yearsOfExperience && (
            <Typography color="red">
              {errors.yearsOfExperience.message}
            </Typography>
          )}
        </div>

        <div className="space-y-4">
          <Input
            type="url"
            label="Facebook URL"
            {...register("socialIcons.facebook")}
          />
          <Input
            type="url"
            label="Instagram URL"
            {...register("socialIcons.instagram")}
          />
          <Input
            type="url"
            label="LinkedIn URL"
            {...register("socialIcons.linkedin")}
          />
        </div>

        <div>
          <Typography variant="small" color="blue-gray" className="mb-1">
            Classes
          </Typography>
          <Select
            isMulti
            options={classes}
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

        <div>
          <Typography variant="small" color="blue-gray" className="mb-1">
            Available Slots
          </Typography>
          {availableSlots.map((slot, index) => (
            <div key={index} className="space-y-4">
              <Input
                type="text"
                placeholder="Slot Name"
                value={slot.slotName}
                onChange={(e) =>
                  handleSlotChange(index, "slotName", e.target.value)
                }
                required
              />
              <Input
                type="text"
                placeholder="Slot Time"
                value={slot.slotTime}
                onChange={(e) =>
                  handleSlotChange(index, "slotTime", e.target.value)
                }
                required
              />
              <Input
                type="number"
                placeholder="Duration (Minutes)"
                value={slot.duration}
                onChange={(e) =>
                  handleSlotChange(index, "duration", e.target.value)
                }
                required
              />
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
                ]}
                value={slot.days}
                onChange={(selectedDays) =>
                  handleSlotDaysChange(index, selectedDays)
                }
                placeholder="Select days for this slot"
              />
              {slot.days.length === 0 && (
                <Typography color="red">
                  At least one day must be selected
                </Typography>
              )}
            </div>
          ))}
          <Button type="button" color="black" onClick={handleAddSlot}>
            Add Another Slot
          </Button>
        </div>

        <Button type="submit" color="black" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BeATrainerForm;
