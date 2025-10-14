import { Button, Input } from "@/components/ui";
import { SocialButtons } from "../SocialButtons/SocialButtons";
import type { AuthMode } from "@/types";
import type { User } from "@/interfaces/user.model";
import type { UseFormReturn } from "react-hook-form";

interface AuthFormProps {
  mode: AuthMode;
  ref: React.Ref<HTMLFormElement>;
  styles: string;
  useForm: UseFormReturn<User>
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

export function AuthForm({ mode, ref, styles, useForm }: AuthFormProps) {
  const config = AUTH_CONFIG[mode];
  const isSignUp = mode === "signup";
  const { register, handleSubmit, reset, formState: { errors } } = useForm;

 
  const onSubmit = (data: User) => {
    console.log("Form data:", data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col justify-evenly items-center absolute inset-0 py-20 w-6/12 ${styles}`}
      ref={ref}
    >
      <h1 className="text-4xl font-bold">{config.title}</h1>
      <SocialButtons />
      <p className="text-sm text-gray-500">{config.dividerText}</p>
      {isSignUp && (
        <Input
          type="text"
          placeholder="Name"
          name="name"
          register={register}
          validation={{
            required: "Name is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          }}
          error={errors.name?.message as string}
        />
      )}
      <Input
        type="email"
        placeholder="Email"
        name="email"
        register={register}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        error={errors.email?.message as string}
      />

      <Input
        type="text"
        placeholder="Password"
        name="password"
        register={register}
        validation={{
          required: "Password is required",
          minLength: { value: 8, message: "Minimum 8 characters" },
        }}
        error={errors.password?.message as string}
      />
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
