import { useEffect } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";

export default function useFieldAnalytics<TFormValues extends FieldValues>(
  methods: UseFormReturn<TFormValues>
) {
  useEffect(() => {
    void methods; // keep ESLint happy

    const focusTime: Record<string, number> = {};
    const startTime: Record<string, number> = {};

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null;
      if (target?.name) {
        startTime[target.name] = Date.now();
      }
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null;
      if (target?.name && startTime[target.name]) {
        const duration = Date.now() - startTime[target.name];
        focusTime[target.name] = (focusTime[target.name] || 0) + duration;
        console.log(
          `⏱ Field [${target.name}] total time: ${focusTime[target.name]}ms`
        );
      }
    };

    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("focusin", handleFocus);
    form.addEventListener("focusout", handleBlur);

    return () => {
      form.removeEventListener("focusin", handleFocus);
      form.removeEventListener("focusout", handleBlur);
    };
  }, [methods]);
}
