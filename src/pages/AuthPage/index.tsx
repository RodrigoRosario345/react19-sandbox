import { AuthForm } from "@/components/auth";

export default function AuthPage() {
  return (
    <div className="font-sans bg-white rounded-3xl flex gap-10 px-10 py-24">
      <AuthForm mode="login"></AuthForm>
      <AuthForm mode="signup"></AuthForm>
    </div>
  )
}
