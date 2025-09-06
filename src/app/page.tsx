import MultiStepForm from "./employee/allemployeeData/allemployeeData";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Employee Onboarding Form
        </h1>
        <MultiStepForm />
      </div>
    </main>
  );
}
