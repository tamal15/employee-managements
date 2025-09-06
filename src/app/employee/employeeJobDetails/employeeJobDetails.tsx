"use client";
import React, { useMemo } from "react";
import { useFormContext, FieldPath } from "react-hook-form";
import { Input, Label, Button } from "@/app/ui/Primitives";
import { mockManagers } from "@/app/data/mockManagers";
import { FullFormValues } from "@/app/formValidation/formvalidation";

const EmployeeJobDetails = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<FullFormValues>();

  const dept = watch("job.department");
  const jobType = watch("job.jobType");

  const managers = useMemo(
    () => mockManagers.filter((m) => m.department === dept),
    [dept]
  );

  const handleNext = async () => {
    const fields: FieldPath<FullFormValues>[] = [
      "job.department",
      "job.positionTitle",
      "job.startDate",
      "job.jobType",
      "job.managerId",
    ];
    if (jobType === "Full-time") fields.push("job.annualSalary");
    if (jobType === "Contract") fields.push("job.hourlyRate");

    const ok = await trigger(fields);
    if (ok) onNext();
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
      
      {/* Department */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Department</Label>
        <select
          {...register("job.department")}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
        >
          <option>Engineering</option>
          <option>Marketing</option>
          <option>Sales</option>
          <option>HR</option>
          <option>Finance</option>
        </select>
      </div>

      {/* Position Title */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Position Title</Label>
        <Input
          {...register("job.positionTitle")}
          className="border border-gray-300 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 rounded-md transition-all duration-300"
        />
        {errors.job?.positionTitle && (
          <p className="text-red-600 text-sm mt-1">{errors.job.positionTitle.message as string}</p>
        )}
      </div>

      {/* Start Date */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Start Date</Label>
        <Input
          type="date"
          {...register("job.startDate")}
          className="border border-gray-300 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 rounded-md transition-all duration-300"
        />
        {errors.job?.startDate && (
          <p className="text-red-600 text-sm mt-1">{errors.job.startDate.message as string}</p>
        )}
      </div>

      {/* Job Type */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Job Type</Label>
        <div className="flex gap-4 mt-1">
          {["Full-time", "Part-time", "Contract"].map((type) => (
            <label
              key={type}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                {...register("job.jobType")}
                value={type}
                className="accent-sky-500 w-4 h-4"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary / Hourly */}
      {jobType === "Full-time" && (
        <div className="transform transition-transform duration-300 hover:scale-[1.01]">
          <Label>Annual Salary ($)</Label>
          <Input
            type="number"
            {...register("job.annualSalary", { valueAsNumber: true })}
            className="border border-gray-300 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 rounded-md transition-all duration-300"
          />
          {errors.job?.annualSalary && (
            <p className="text-red-600 text-sm mt-1">{errors.job.annualSalary.message as string}</p>
          )}
        </div>
      )}

      {jobType === "Contract" && (
        <div className="transform transition-transform duration-300 hover:scale-[1.01]">
          <Label>Hourly Rate ($)</Label>
          <Input
            type="number"
            {...register("job.hourlyRate", { valueAsNumber: true })}
            className="border border-gray-300 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 rounded-md transition-all duration-300"
          />
          {errors.job?.hourlyRate && (
            <p className="text-red-600 text-sm mt-1">{errors.job.hourlyRate.message as string}</p>
          )}
        </div>
      )}

      {/* Manager */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Manager</Label>
        <select
          {...register("job.managerId")}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
        >
          <option value="">-- Select manager --</option>
          {managers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        {errors.job?.managerId && (
          <p className="text-red-600 text-sm mt-1">{errors.job.managerId.message as string}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmployeeJobDetails;
