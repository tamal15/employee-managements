"use client";
import { useFormContext } from "react-hook-form";
import { Label, Input, Button } from "@/app/ui/Primitives";
import type { FullFormValues } from "@/app/formValidation/formvalidation";

function computeAge(dobStr?: string) {
  if (!dobStr) return 999;
  const d = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
}

const EmergencyContact = ({
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

  const dob = watch("personal.dob");
  const age = computeAge(dob);

  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
      
      {/* Contact Name */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Contact Name</Label>
        <Input
          {...register("emergency.contactName")}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
        />
        {errors.emergency?.contactName && (
          <p className="text-red-600 text-sm mt-1">
            {errors.emergency.contactName.message}
          </p>
        )}
      </div>

      {/* Relationship */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Relationship</Label>
        <select
          {...register("emergency.relationship")}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
          defaultValue=""
        >
          <option value="" disabled>
            -- Select Relationship --
          </option>
          <option value="Parent">Parent</option>
          <option value="Sibling">Sibling</option>
          <option value="Spouse">Spouse</option>
          <option value="Relative">Relative</option>
          <option value="Friend">Friend</option>
          <option value="Other">Other</option>
        </select>
        {errors.emergency?.relationship && (
          <p className="text-red-600 text-sm mt-1">
            {errors.emergency.relationship.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="transform transition-transform duration-300 hover:scale-[1.01]">
        <Label>Phone</Label>
        <Input
          {...register("emergency.contactPhone")}
          placeholder="+1-123-456-7890"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
        />
        {errors.emergency?.contactPhone && (
          <p className="text-red-600 text-sm mt-1">
            {errors.emergency.contactPhone.message} (Format: +1-123-456-7890)
          </p>
        )}
      </div>

      {/* Guardian Info for under 21 */}
      {age < 21 && (
        <div className="pt-4 border-t border-gray-200 space-y-4">
          <div className="font-semibold text-gray-700">
            Guardian Contact (required for under 21)
          </div>

          <div className="transform transition-transform duration-300 hover:scale-[1.01]">
            <Label>Guardian Name</Label>
            <Input
              {...register("emergency.guardianName")}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
            />
            {errors.emergency?.guardianName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.emergency.guardianName.message}
              </p>
            )}
          </div>

          <div className="transform transition-transform duration-300 hover:scale-[1.01]">
            <Label>Guardian Phone</Label>
            <Input
              {...register("emergency.guardianPhone")}
              placeholder="+1-123-456-7890"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
            />
            {errors.emergency?.guardianPhone && (
              <p className="text-red-600 text-sm mt-1">
                {errors.emergency.guardianPhone.message} (Format: +1-123-456-7890)
              </p>
            )}
          </div>
        </div>
      )}

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
          onClick={async () => {
            const ok = await trigger(["emergency", "personal"]);
            if (ok) onNext();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmergencyContact;
