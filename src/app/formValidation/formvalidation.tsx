import { z } from "zod";

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

const fileOrUndefined = z.any().optional();

export const personalSchema = z.object({
  fullName: z.string().min(5).refine(v => v.trim().split(/\s+/).length >= 2, { message: "Provide at least 2 words" }),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, { message: "Format: +1-123-456-7890" }),
  dob: z.string().refine(val => {
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return false;
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    return age >= 18;
  }, { message: "Must be at least 18 years old" }),
  profilePicture: fileOrUndefined,
});

export const jobSchema = z.object({
  department: z.enum(["Engineering","Marketing","Sales","HR","Finance"]),
  positionTitle: z.string().min(3),
  startDate: z.string(), // will validate in superRefine
  jobType: z.enum(["Full-time","Part-time","Contract"]),
  annualSalary: z.number().nullable().optional(),
  hourlyRate: z.number().nullable().optional(),
  managerId: z.string().optional(),
});

// Skills step
export const skillsSchema = z.object({
  primarySkills: z.array(z.string()).min(3, "Choose at least 3 skills"),
  experience: z.record(z.string(), z.number().min(0)).optional(), // years per skill
  workingHours: z.object({
    start: z.string(),
    end: z.string(),
  }),
  remotePreference: z.number().min(0).max(100),
  extraNotes: z.string().max(500).optional(),
  managerApproved: z.boolean().optional(),
});

// Emergency
export const emergencySchema = z.object({
  contactName: z.string().min(1),
  relationship: z.string().min(1),
  contactPhone: z.string().regex(phoneRegex),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
});

// Full schema
export const fullSchema = z.object({
  personal: personalSchema,
  job: jobSchema,
  skills: skillsSchema,
  emergency: emergencySchema,
  confirm: z.boolean().refine(v => v === true, { message: "You must confirm the information is correct" }),
}).superRefine((data, ctx) => {
  // 1) Start date validations
  const sd = new Date(data.job.startDate);
  if (Number.isNaN(sd.getTime())) {
    ctx.addIssue({ path: ["job","startDate"], code: z.ZodIssueCode.custom, message: "Invalid date" });
  } else {
    const today = new Date(); today.setHours(0,0,0,0);
    if (sd < today) ctx.addIssue({ path: ["job","startDate"], code: z.ZodIssueCode.custom, message: "Start date cannot be in the past" });
    const maxFuture = new Date(); maxFuture.setDate(maxFuture.getDate() + 90);
    if (sd > maxFuture) ctx.addIssue({ path: ["job","startDate"], code: z.ZodIssueCode.custom, message: "Start date must be within 90 days" });

    // If department HR or Finance, disallow Friday (5) and Saturday (6)
    const dept = data.job.department;
    const day = sd.getDay(); // 0 Sun - 6 Sat
    if ((dept === "HR" || dept === "Finance") && (day === 5 || day === 6)) {
      ctx.addIssue({ path: ["job","startDate"], code: z.ZodIssueCode.custom, message: "HR/Finance cannot start on Friday or Saturday" });
    }
  }

  // 2) salary vs hourly
  if (data.job.jobType === "Contract") {
    if (typeof data.job.hourlyRate !== "number") {
      ctx.addIssue({ path: ["job","hourlyRate"], code: z.ZodIssueCode.custom, message: "Hourly rate required for contracts" });
    } else if (data.job.hourlyRate < 50 || data.job.hourlyRate > 150) {
      ctx.addIssue({ path: ["job","hourlyRate"], code: z.ZodIssueCode.custom, message: "Hourly rate must be $50 - $150" });
    }
  } else if (data.job.jobType === "Full-time") {
    if (typeof data.job.annualSalary !== "number") {
      ctx.addIssue({ path: ["job","annualSalary"], code: z.ZodIssueCode.custom, message: "Annual salary required for full-time" });
    } else if (data.job.annualSalary < 30000 || data.job.annualSalary > 200000) {
      ctx.addIssue({ path: ["job","annualSalary"], code: z.ZodIssueCode.custom, message: "Annual salary must be $30,000 - $200,000" });
    }
  }

  // 3) Remote preference -> managerApproved
  if (typeof data.skills.remotePreference === "number" && data.skills.remotePreference > 50) {
    if (!data.skills.managerApproved) {
      ctx.addIssue({ path: ["skills","managerApproved"], code: z.ZodIssueCode.custom, message: "Manager approval required for >50% remote" });
    }
  }

  // 4) Guardian requirement (age < 21)
  const dob = new Date(data.personal.dob);
  const today = new Date(); let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  if (age < 21) {
    if (!data.emergency.guardianName) ctx.addIssue({ path: ["emergency","guardianName"], code: z.ZodIssueCode.custom, message: "Guardian name required for under 21" });
    if (!data.emergency.guardianPhone) ctx.addIssue({ path: ["emergency","guardianPhone"], code: z.ZodIssueCode.custom, message: "Guardian phone required for under 21" });
  }

  // 5) skills experience must be present for selected skills
  if (Array.isArray(data.skills.primarySkills)) {
    const exp = data.skills.experience || {};
    data.skills.primarySkills.forEach(skill => {
      if (typeof exp[skill] !== "number") {
        ctx.addIssue({ path: ["skills","experience"], code: z.ZodIssueCode.custom, message: `Provide experience years for ${skill}` });
      }
    });
  }
});
export type FullFormValues = z.infer<typeof fullSchema>;
