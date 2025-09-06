import { useFormContext } from "react-hook-form";
import { Label, Input, TextArea, Button } from "@/app/ui/Primitives";
import { useMemo } from "react";
import { skillsByDepartment } from "@/app/data/mockManagers";
import { FullFormValues } from "@/app/formValidation/formvalidation";

const SkillPerferences=({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<FullFormValues>();

  const dept = watch("job.department");
  const availSkills = useMemo(
    () => skillsByDepartment[dept as keyof typeof skillsByDepartment] || [],
    [dept]
  );

  const selected = watch("skills.primarySkills") || [];
  const remote = watch("skills.remotePreference") ?? 0;

  return (
    <div className="space-y-4">
      {/* Primary Skills */}
      <div>
        <Label>Primary Skills (choose at least 3)</Label>
        <div className="grid grid-cols-2 gap-2">
          {availSkills.map((s) => (
            <label key={s} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={s}
                {...register("skills.primarySkills")}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
        {errors.skills?.primarySkills && (
          <p className="text-red-600">
            {errors.skills.primarySkills.message as string}
          </p>
        )}
      </div>

      {/* Experience per skill */}
      <div>
        <Label>Experience (years) for selected skills</Label>
        <div className="grid gap-2">
          {selected.map((s: string) => (
            <div key={s} className="flex gap-2 items-center">
              <div className="w-40">{s}</div>
              <Input
                type="number"
                {...register(`skills.experience.${s}` as const, {
                  valueAsNumber: true,
                })}
              />
            </div>
          ))}
        </div>
        {typeof errors.skills?.experience === "object" && (
          <p className="text-red-600 text-sm">
            {/* show first error */}
            {Object.values(errors.skills.experience)[0]?.message as string}
          </p>
        )}
      </div>

      {/* Working hours */}
      <div>
        <Label>Preferred Working Hours</Label>
        <div className="flex gap-2">
          <Input type="time" {...register("skills.workingHours.start")} />
          <Input type="time" {...register("skills.workingHours.end")} />
        </div>
      </div>

      {/* Remote preference */}
      <div>
        <Label>Remote Work Preference: {remote}%</Label>
        <input
          type="range"
          min={0}
          max={100}
          {...register("skills.remotePreference", { valueAsNumber: true })}
        />
      </div>

      {/* Manager approval */}
      {remote > 50 && (
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("skills.managerApproved")} />
          <span>Manager Approved</span>
          {errors.skills?.managerApproved && (
            <p className="text-red-600">
              {errors.skills.managerApproved.message as string}
            </p>
          )}
        </div>
      )}

      {/* Notes */}
      <div>
        <Label>Extra Notes</Label>
        <TextArea {...register("skills.extraNotes")} rows={4} />
        {errors.skills?.extraNotes && (
          <p className="text-red-600">
            {errors.skills.extraNotes.message as string}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          onClick={async () => {
            const ok = await trigger(["skills"]);
            if (ok) onNext();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default SkillPerferences;