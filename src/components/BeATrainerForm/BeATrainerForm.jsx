import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Textarea, Button } from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";
import useAuth from '../../hooks/useAuth'

const BeATrainerForm = () => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const {user} = useAuth()

  // Options for specialization
  const specializationOptions = [
    { value: "Yoga", label: "Yoga" },
    { value: "Strength Training", label: "Strength Training" },
    { value: "Aqua Aerobics", label: "Aqua Aerobics" },
    { value: "Pilates", label: "Pilates" },
    { value: "Cardio", label: "Cardio" },
  ];

  // Options for available slots with slotDuration
  const slotOptions = [
    {
      value: { time: "Monday 10:00 AM", slotDuration: 60 },
      label: "Monday 10:00 AM (60 mins)",
    },
    {
      value: { time: "Wednesday 2:00 PM", slotDuration: 60 },
      label: "Wednesday 2:00 PM (60 mins)",
    },
    {
      value: { time: "Friday 4:00 PM", slotDuration: 90 },
      label: "Friday 4:00 PM (90 mins)",
    },
    {
      value: { time: "Saturday 9:00 AM", slotDuration: 45 },
      label: "Saturday 9:00 AM (45 mins)",
    },
  ];

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        status: "pending",
        specialization: data.specialization.map((spec) => spec.value),
        availableSlots: data.availableSlots.map((slot) => slot.value),
        createdAt: new Date(),
      };
      await axios.post("http://localhost:5000/applyTrainer", formattedData);
      alert("Application submitted successfully!");
      reset();
    } catch (error) {
      console.error("Failed to submit application", error);
      alert("Failed to submit the application.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-8 bg-white rounded-md shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center">Be a Trainer</h2>

      <div>
        <Input
          label="Name"
		  value={user?.displayName}
          readOnly
          {...register("name")}
          className="cursor-not-allowed"
        />
      </div>

      {/* Email */}
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
          type="number"
          label="Age"
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
          })}
          error={errors.age && true}
        />
        {errors.age && (
          <span className="text-red-500 text-sm">{errors.age.message}</span>
        )}
      </div>

      {/* Profile Image */}
      <div>
        <Input
          type="url"
          label="Profile Image URL"
          {...register("profileImage")}
        />
      </div>

      {/* Specialization */}
      <div>
        <label className="block font-medium mb-2">Specialization:</label>
        <Controller
          name="specialization"
          control={control}
          defaultValue={[]}
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
      </div>

      {/* Bio */}
      <div>
        <Textarea label="Bio" {...register("bio")} />
      </div>

      {/* Years of Experience */}
      <div>
        <Input
          type="number"
          label="Years of Experience"
          {...register("yearsOfExperience", { valueAsNumber: true })}
        />
      </div>

      {/* Social Links */}
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

      {/* Available Slots */}
      <div>
        <label className="block font-medium mb-2">Available Slots:</label>
        <Controller
          name="availableSlots"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Select
              isMulti
              options={slotOptions}
              className="react-select-container"
              classNamePrefix="react-select"
              {...field}
            />
          )}
        />
      </div>

      {/* Additional Info */}
      <div>
        <Textarea label="Additional Info" {...register("additionalInfo")} />
      </div>

      {/* Submit Button */}
      <Button type="submit" color="black" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default BeATrainerForm;
