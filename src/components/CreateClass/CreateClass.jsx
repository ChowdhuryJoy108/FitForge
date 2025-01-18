import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Textarea, Button } from '@material-tailwind/react'; // Material Tailwind components
import Select from 'react-select'; // React Select

const trainers = [
  { trainerId: 'trainer01', name: 'Alice Johnson' },
  { trainerId: 'trainer02', name: 'John Doe' },
  { trainerId: 'trainer03', name: 'Jane Smith' }
];

const CreateClass = () => {
  // Initialize useForm
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  // Trainer options for react-select dropdown (use trainerId as value)
  const trainerOptions = trainers.map((trainer) => ({
    label: trainer.name,
    value: trainer.trainerId
  }));

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);  // Log the form data
    // Here you will send the `data` to the backend to store it in your database
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Create New Class</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Class Name */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Class Name</label>
          <Input
            type="text"
            {...register('name', { required: 'Class name is required' })}
            error={errors.name ? true : false}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Class Description */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Description</label>
          <Textarea
            {...register('description', { required: 'Description is required' })}
            error={errors.description ? true : false}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Image URL */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Image URL</label>
          <Input
            type="text"
            {...register('image', { required: 'Image URL is required' })}
            error={errors.image ? true : false}
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Additional Details */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Additional Details</label>
          <Textarea
            {...register('additionalDetails', { required: 'Additional details are required' })}
            error={errors.additionalDetails ? true : false}
          />
          {errors.additionalDetails && <p className="text-red-500 text-sm">{errors.additionalDetails.message}</p>}
        </div>

        {/* Trainers Selection */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Select Trainers</label>
          <Controller
            control={control}
            name="trainers" // This will hold an array of selected trainerIds
            rules={{ required: 'At least one trainer must be selected' }}
            render={({ field }) => (
              <Select
                isMulti
                options={trainerOptions}
                {...field}
                className={errors.trainers ? 'border-red-500' : ''}
              />
            )}
          />
          {errors.trainers && <p className="text-red-500 text-sm">{errors.trainers.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <Button type="submit" color="blue" className="w-full md:w-1/3">
            Create Class
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateClass;
