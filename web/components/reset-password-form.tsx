"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type ResetPasswordInput } from "@/lib/validations/auth";
import { useResetPassword } from "@/hooks/use-auth";
import { toast } from "./ui/use-toast";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Create a schema without the token field
const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const {
    mutate: resetPassword,
    isPending,
    error,
    isError,
  } = useResetPassword();

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      toast({
        title: "Error",
        description:
          "Invalid or missing reset token. Please request a new password reset link.",
        variant: "destructive",
      });
      return;
    }

    const resetData: ResetPasswordInput = {
      ...data,
      token,
    };

    resetPassword(resetData);
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description:
          error?.message || "Failed to reset your password. Please try again.",
        variant: "destructive",
      });
    }
  }, [isError, error]);

  // If no token is provided, show an error message
  if (!token) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-6 items-center text-center">
              <h1 className="text-2xl font-bold">Invalid Reset Link</h1>
              <p className="text-muted-foreground text-balance">
                The password reset link you followed is invalid or has expired.
              </p>
              <Button className="w-full max-w-[200px]" asChild>
                <a href="/forgot-password">Request New Link</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Reset Your Password</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your new password below
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  aria-invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Resetting..." : "Reset Password"}
              </Button>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Back to Login
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/oil-painting.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={1000}
              height={1000}
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By using this service, you agree to our{" "}
        <a href="https://waltzyourway.com/terms">Terms of Service</a> and{" "}
        <a href="https://waltzyourway.com/privacy">Privacy Policy</a>.
      </div>
    </div>
  );
}
