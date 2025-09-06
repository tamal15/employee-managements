This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

live site link https://employee-onboardings.netlify.app/

## Getting Started



## 🛠 Tech Stack
- **Next.js (TypeScript)**
- **React Hook Form**
- **Zod**
- **Tailwind CSS**
- **shadcn/ui components

---

## ▶ How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open: [http://localhost:3000](http://localhost:3000)

---

## ✅ Completed Features

### 🔹 Multi-Step Form
- Fully functional `MultiStepForm` orchestrator  
- Progress bar with step count  
- Step navigation with **Next/Back** buttons  
- Auto-save form state in **React state**  
- Warning for unsaved changes (`beforeunload` event)  
- Error boundary for robust rendering  

---

### 🔹 Step 1: Personal Info
- Full Name (required, ≥ 2 words)  
- Email (required, valid email format)  
- Phone Number (required, format: `+1-123-456-7890`)  
- Date of Birth (≥ 18 years old)  
- Profile Picture (optional, JPG/PNG ≤ 2MB)  
- Validation handled with **Zod + React Hook Form**  
- Professional UI design with animations & hover effects  

---

### 🔹 Step 2: Job Details
- Department dropdown: *Engineering, Marketing, Sales, HR, Finance*  
- Position Title (required, min 3 characters)  
- Start Date (not in past, max 90 days in future)  
- Job Type: Radio buttons (*Full-time, Part-time, Contract*)  
- Salary Expectation:
  - Full-time → Annual salary ($30,000 – $200,000)  
  - Contract → Hourly rate ($50 – $150)  
- Manager dropdown (filtered by department)  
- Conditional logic for salary fields based on job type  
- Professional UI with focus/hover effects  

---

### 🔹 Step 3: Skills & Preferences
- Primary Skills (choose ≥ 3)  
- Experience for each skill  
- Preferred Working Hours (time range: start–end)  
- Remote Work Preference (slider 0% → 100%)  
- Extra Notes (optional, max 500 chars)  
- Conditional “Manager Approved” checkbox if remote > 50%  

---

### 🔹 Step 4: Emergency Contact
- Contact Name (required)  
- Relationship (dropdown)  
- Phone Number (required, same format as Step 1)  
- Guardian Contact (name + phone) auto-displayed if age < 21  
- Professional look with card-style UI & smooth transitions  

---

### 🔹 Step 5: Review & Submit
- Read-only display of all collected data  
- Confirmation checkbox: *"I confirm all information is correct"*  
- Cannot submit unless confirmed  
- Final data transformation applied before submission  
- Optimistic UI: shows payload in console + alerts  

---

## 🧠 Smart Logic & Validation
- Age < 21 → Guardian fields required  
- Contract job → Hourly rate only (no annual salary)  
- Remote > 50% → Manager approval checkbox displayed  
- HR/Finance dept → Start date cannot fall on Friday/Saturday  
- Manager list filtered by department  
- Skills list filtered by department  
- Cross-step dependencies handled using `watch()` from React Hook Form  

---

## 🎨 User Experience Features
- Auto-save form state in React state  
- Unsaved changes warning if user tries to leave  
- Cannot advance step until current step is valid  
- Keyboard navigation: `Enter / Shift+Enter` to move next/back  
- Professional UI with hover/focus animations  
- Responsive layout  

---



---


