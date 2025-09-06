This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

live site link https://employee-onboardings.netlify.app/

## Getting Started



Employee Onboarding (Starter)

Tech Stack

Next.js (TypeScript)

React Hook Form

Zod

Tailwind CSS

(Optional) shadcn/ui components

How to run

npm install
npm run dev


Open http://localhost:3000
 in your browser.

What I implemented (starter)

Project skeleton with MultiStepForm orchestrator.

Step 1: Personal Info fully implemented:

fullName (minimum 2 words)

email

phone (format: +X-XXX-XXX-XXXX)

dob (≥18 years old)

profile picture (JPG/PNG ≤ 2MB)

Validation integrated with Zod, connected to React Hook Form.

Progress bar + step navigation.

Auto-save of form state into React state (not using localStorage).

Unsaved changes warning using beforeunload.

Provided lib/mockData.ts for managers & skills (to use in Step 2/3).

How I planned complex logic

Use per-step Zod schemas with zodResolver per step to keep validation modular.

Use parent MultiStepForm to manage:

Current step

Accumulated form state

Final data transformation for submission

Business logic enforced:

Contract vs Full-time salary validation

Manager selection filtered by department

Start date restrictions for HR/Finance on weekends

Guardian fields for age < 21

Implementation via:

Zod .refine() for strict validation (dates, weekends, salary/hourly rules)

Conditional rendering (watch values using useFormContext().watch())

Cross-step state kept in React state (e.g., Step 4 reads age from Step 1)

Assumptions made

File upload stored client-side as File object; final submission will transform to base64 or multipart form-data for API.

Auto-save stored in local React state only (per requirement).

shadcn/ui components are optional; primitive UI components provided if shadcn is not initialized.

Next steps (to complete all requirements)

Implement Step 2–5 components following the same pattern.

Implement manager search (controlled dropdown filtered from mockManagers).

Implement conditional salary UI & validation (annual vs hourly).

Implement skills selection with experience per skill.

Implement guardian fields for users under 21.

Implement remote preference logic and Manager Approved checkbox.

Implement final review page (read-only) and confirmation checkbox.

