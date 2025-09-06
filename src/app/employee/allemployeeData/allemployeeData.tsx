"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FullFormValues, fullSchema } from "@/app/formValidation/formvalidation";
import useFieldAnalytics from "../useFieldAnalytics/useFieldAnalytics";
import PersonalInfo from "../personalInfo/personalInfo";
import EmployeeJobDetails from "../employeeJobDetails/employeeJobDetails";
import SkillPerferences from "../skillPerferences/skillPerferences";
import EmergencyContact from "../emergencyContact/emergencyContact";
import Review from "../review/review";

// ErrorBoundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2 className="text-red-600">
          ⚠️ Something went wrong. Please reload.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default function MultiStepForm() {
  const methods = useForm<FullFormValues>({
    resolver: zodResolver(fullSchema),
    mode: "onBlur",
    defaultValues: {
      personal: {
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        profilePicture: undefined,
      },
      job: {
        department: "Engineering",
        positionTitle: "",
        startDate: "",
        jobType: "Full-time",
        annualSalary: null,
        hourlyRate: null,
        managerId: "",
      },
      skills: {
        primarySkills: [],
        experience: {},
        workingHours: { start: "09:00", end: "17:00" },
        remotePreference: 0,
        extraNotes: "",
        managerApproved: false,
      },
      emergency: {
        contactName: "",
        relationship: "",
        contactPhone: "",
        guardianName: "",
        guardianPhone: "",
      },
      confirm: false,
    },
  });

  const [step, setStep] = useState<number>(1);
  const [autosaveState, setAutosaveState] = useState<FullFormValues | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchAll = methods.watch();

  useFieldAnalytics(methods);

  useEffect(() => {
    const t = setTimeout(() => setAutosaveState(methods.getValues()), 250);
    return () => clearTimeout(t);
  }, [JSON.stringify(watchAll)]);

  //Warn unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Step validation
  const stepFields: Record<1 | 2 | 3 | 4 | 5, (keyof FullFormValues)[]> = {
    1: ["personal"],
    2: ["job"],
    3: ["skills"],
    4: ["emergency"],
    5: ["confirm"],
  };

  const next = async () => {
    const fields = stepFields[step as 1 | 2 | 3 | 4 | 5];
    const ok = await methods.trigger(fields);
    if (!ok) return;
    setStep((s) => Math.min(5, s + 1));
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  //Final Submit
  const onFinalSubmit = async (vals: FullFormValues) => {
    setIsSubmitting(true);

    const personal = {
      ...vals.personal,
      profilePicture: vals.personal.profilePicture
        ? vals.personal.profilePicture.name || "uploaded-file"
        : undefined,
    };

    const payload = { ...vals, personal };

    console.log("Optimistic Payload:", payload);
    alert("Submitting... (optimistic)");

    await new Promise((r) => setTimeout(r, 1200));

    setIsSubmitting(false);
    alert("✅ Submitted Successfully! Check console.");
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (step < 5) next();
      } else if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        if (step > 1) back();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step]);

  return (
    <ErrorBoundary>
      <FormProvider {...methods}>
        <form className="max-w-4xl mx-auto p-3">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Employee Onboarding</h1>
              <div className="text-sm text-gray-600">Step {step} / 5</div>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div
                className="h-2 bg-sky-600 rounded"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            {step === 1 && <PersonalInfo onNext={next} />}
            {step === 2 && <EmployeeJobDetails onNext={next} onBack={back} />}
            {step === 3 && <SkillPerferences onNext={next} onBack={back} />}
            {step === 4 && <EmergencyContact onNext={next} onBack={back} />}
            {step === 5 && (
              <Review
                onBack={back}
                onSubmit={methods.handleSubmit(onFinalSubmit)}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </ErrorBoundary>
  );
}
