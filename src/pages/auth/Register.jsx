import RegisterForm from "../../features/auth/RegisterForm.jsx";

export default function Register() {
  return (
    <div className="relative">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      ></div>
      {/* Form layer */}
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded bg-white p-8 shadow">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
