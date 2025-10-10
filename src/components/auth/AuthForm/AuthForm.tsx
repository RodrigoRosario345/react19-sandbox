import { Button, Input } from "@/components/ui";
import { SocialButtons } from "../SocialButtons/SocialButtons";
import type { AuthMode } from "@/types";

interface Props {
  mode: AuthMode
  ref: React.Ref<HTMLFormElement>;
  styles: string;
}
const AUTH_CONFIG = {
  login: {
    title: "Sign In",
    dividerText: "or use your email password",
    submitText: "SIGN IN",
  },
  signup: {
    title: "Create Account",
    dividerText: "or use your email to register",
    submitText: "SIGN UP",
  },
} as const;

export function AuthForm({ mode, ref, styles }: Props) {
  const config = AUTH_CONFIG[mode];
  const isSignUp = mode === "signup";

  return (
    <form className={`flex flex-col justify-evenly items-center absolute inset-0 py-20 w-6/12 ${styles}`} ref={ref}>
      <h1 className="text-4xl font-bold">{config.title}</h1>
      <SocialButtons />
      <p className="text-sm text-gray-500">{config.dividerText}</p>
      {isSignUp && <Input type="text" placeholder="Name" />}
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      {!isSignUp && (
        <a className="text-sm text-gray-500">Forgot your password?</a>
      )}
      <Button
        type="submit"
        style="bg-violet-800 px-10 py-1.5 rounded-md text-white font-semibold hover:bg-violet-700"
      >
        {config.submitText}
      </Button>
    </form>
  );
}
