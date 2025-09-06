"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Input, Label, Button } from "@/app/ui/Primitives";
import { FullFormValues } from "@/app/formValidation/formvalidation";

interface Step1PersonalProps {
  onNext: () => void;
}

const PersonalInfo = ({ onNext }: Step1PersonalProps) => {
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = useFormContext<FullFormValues>();

  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl">
      
      {/* Full Name */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Full Name</Label>
        <Input
          {...register("personal.fullName")}
          className="border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-md transition-all duration-300"
        />
        {errors.personal?.fullName && (
          <p className="text-red-600 text-sm mt-1">{errors.personal.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Email</Label>
        <Input
          type="email"
          {...register("personal.email")}
          className="border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-md transition-all duration-300"
        />
        {errors.personal?.email && (
          <p className="text-red-600 text-sm mt-1">{errors.personal.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Phone</Label>
        <Input
          {...register("personal.phone")}
          placeholder="+1-123-456-7890"
          className="border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-md transition-all duration-300"
        />
        {errors.personal?.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.personal.phone.message}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Date of Birth</Label>
        <Input
          type="date"
          {...register("personal.dob")}
          className="border border-gray-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-md transition-all duration-300"
        />
        {errors.personal?.dob && (
          <p className="text-red-600 text-sm mt-1">{errors.personal.dob.message}</p>
        )}
      </div>

      {/* Profile Picture */}
      <div className="space-y-2 transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Profile Picture</Label>
        <Controller
          name="personal.profilePicture"
          control={control}
          render={({ field }) => (
            <div
              className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-sky-500 hover:bg-gray-100 transition-all duration-300"
              onClick={() => document.getElementById("profile-upload")?.click()}
            >
              {field.value ? (
                <img
                  src={URL.createObjectURL(field.value as File)}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover shadow-md transition-all duration-300"
                />
              ) : (
                <p className="text-gray-500 text-sm">Click or drag file to upload</p>
              )}
              <input
                id="profile-upload"
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            </div>
          )}
        />
        {errors.personal?.profilePicture && (
          <p className="text-red-600 text-sm mt-1">
            {errors.personal.profilePicture.message?.toString()}
          </p>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-6">
        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={async () => {
            const ok = await trigger(["personal"]);
            if (ok) onNext();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
