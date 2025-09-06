This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

live site link https://employee-onboardings.netlify.app/

## Getting Started



# Employee Onboarding (Starter)

## Tech
- Next.js (TypeScript)
- React Hook Form
- Zod
- Tailwind CSS
- (optional) shadcn/ui components

## How to run
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## What I implemented (starter)
- Project skeleton with MultiStepForm orchestrator
- Full **Step 1: Personal Info** implemented:
  - fullName (≥2 words)
  - email
  - phone (+X-XXX-XXX-XXXX)
  - dob (≥18 years)
  - profile picture (JPG/PNG ≤ 2MB)
- Validation with **Zod**, connected to React Hook Form.
- Progress bar + step navigation.
- Auto-save of form state **into React state** (not localStorage).
- Unsaved changes warning using `beforeunload`.
- Provided `lib/mockData.ts` for managers & skills (to use in Step 2/3).

## How I planned complex logic
- Use **per-step schemas** (Zod) and `zodResolver` per step to keep validation modular.
- Use parent `MultiStepForm` to manage current step, accumulated state, and final data transformation.
- Business logic (e.g., contract salary vs annual; manager filtering by department; start date weekend restriction for HR/Finance; guardian fields when age < 21) will be enforced:
  - Through Zod refine checks for strict validation (dates/weekends).
  - Through conditional rendering (watch values via `useFormContext().watch()`).
  - Through cross-step state kept in React state (so step 4 can read age from step 1).

## Assumptions made
- File upload is stored client-side as `File` object; final submission will transform to base64/ multipart form-data as needed by API.
- Using local React state for autosave (the requirement said not to use localStorage).
- shadcn/ui components are optional; I provided primitive UI components if you haven't initialized shadcn.

## Next steps (to complete all requirements)
- Implement Step 2..5 components following same pattern.
- Implement manager search (controlled dropdown filtered from mockManagers).
- Implement conditional salary UI & validation.
- Implement skills selection with experience per skill.
- Implement guardian fields when age < 21.
- Implement remote preference logic and Manager Approved checkbox.
- Implement final review page (read-only) and confirmation checkbox.

