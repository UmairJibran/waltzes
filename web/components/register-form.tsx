"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { useRegister } from "@/hooks/use-auth";
import { SocialBar } from "./social-bar";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit = (data: RegisterInput) => {
    registerUser(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome</h1>
            <p className="text-muted-foreground text-balance">
              Create your Waltzes account
            </p>
          </div>
          <div className="flex justify-between flex-col md:flex-row gap-4">
            <div className="grid gap-3 flex-1/2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("firstName")}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-3 flex-1/2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Wick"
                {...register("lastName")}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between flex-col md:flex-row gap-4">
            <div className="grid gap-3 flex-1/2">
              <Label htmlFor="linkedinUsername">LinkedIn Username</Label>
              <Input
                id="linkedinUsername"
                type="text"
                placeholder="rbranson"
                {...register("linkedinUsername")}
                aria-invalid={!!errors.linkedinUsername}
              />
              {errors.linkedinUsername && (
                <p className="text-sm text-red-500">
                  {errors.linkedinUsername.message}
                </p>
              )}
            </div>
            <div className="grid gap-3 flex-1/2">
              <Label htmlFor="githubUsername">GitHub Username</Label>
              <Input
                id="githubUsername"
                type="text"
                placeholder="torvalds"
                {...register("githubUsername")}
                aria-invalid={!!errors.githubUsername}
              />
              {errors.githubUsername && (
                <p className="text-sm text-red-500">
                  {errors.githubUsername.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex justify-between flex-col md:flex-row gap-4">
            <div className="grid gap-3 flex-1/2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-3 flex-1/2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating Account..." : "Create Account"}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Social Logins coming soon
            </span>
          </div>
          <SocialBar />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="underline underline-offset-4">
              Login Here
            </a>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By Registering, you agree to our{" "}
        <a href="https://waltzyourway.com/terms">Terms of Service</a> and{" "}
        <a href="https://waltzyourway.com/privacy">Privacy Policy</a>.
      </div>
    </div>
  );
}
