import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Textarea, Button } from "@material-tailwind/react"; // Material Tailwind components
import Select from "react-select"; // React Select
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const CreateClass = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  // const [availableTrainers, setAvailableTrainers] = useState([])
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });

  const trainerOptions = trainers.map((trainer) => ({
    label: trainer.name,
    value: trainer.trainerId,
  }));

 
  const onSubmit = async (data) => {
    const formattedData = {
      classId: `class${Math.floor(Math.random() * 10000)}`,
      name: data.name,
      description: data.description,
      image: data.image,
      additionalDetails: data.additionalDetails,
      trainers: data.trainers.map((trainer) => trainer.value),
      noOfBooking: 0,
    };

    try {
      const response = await axiosSecure.post("/create-class", formattedData);
      console.log("Class created successfully:", response.data);

      Swal.fire({
        icon: "success",
        title: "Created!",
        text: "Class created successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Create Classes!",
        text: `${error.message}`,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Create New Class</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Class Name</label>
          <Input
            type="text"
            {...register("name", { required: "Class Name is required" })}
            error={errors.name ? true : false}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Description</label>
          <Textarea
            {...register("description", {
              required: "Description is required",
            })}
            error={errors.description ? true : false}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Image URL</label>
          <Input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            error={errors.image ? true : false}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Additional Details</label>
          <Textarea
            {...register("additionalDetails", {
              required: "Additional details are required",
            })}
            error={errors.additionalDetails ? true : false}
          />
          {errors.additionalDetails && (
            <p className="text-red-500 text-sm">
              {errors.additionalDetails.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Select Trainers</label>
          <Controller
            control={control}
            name="trainers" // This will hold an array of selected trainerIds
            rules={{ required: "At least one trainer must be selected" }}
            render={({ field }) => (
              <Select
                isMulti
                options={trainerOptions}
                {...field}
                className={errors.trainers ? "border-red-500" : ""}
              />
            )}
          />
          {errors.trainers && (
            <p className="text-red-500 text-sm">{errors.trainers.message}</p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <Button type="submit" color="black" className="w-full md:w-2/3">
            Create Class
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateClass;
