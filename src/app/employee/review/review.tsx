import { useFormContext } from "react-hook-form";
import { Button } from "@/app/ui/Primitives";

const Review=({ onBack, onSubmit, isSubmitting }:{ onBack:()=>void, onSubmit: ()=>void, isSubmitting:boolean }) => {
  const { getValues, register, formState:{errors} } = useFormContext();
  const v = getValues();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review</h2>
      <pre className="bg-gray-100 p-4 rounded max-h-80 overflow-auto">{JSON.stringify(v, null, 2)}</pre>

      <div className="mt-4 flex items-center gap-2">
        <input type="checkbox" {...register("confirm")} />
        <span>I confirm all information is correct</span>
      </div>
      {errors?.confirm && <p className="text-red-600">{errors.confirm.message as string}</p>}

      <div className="flex justify-between mt-4">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
      </div>
    </div>
  );
}
export default Review;