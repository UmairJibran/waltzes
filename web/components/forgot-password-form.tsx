"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations/auth";
import { useForgotPassword } from "@/hooks/use-auth";
import { toast } from "./ui/use-toast";
import { useEffect } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    mutate: forgotPassword,
    isPending,
    error,
    isError,
    isSuccess,
  } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPassword(data);
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: error?.message || "Failed to process your request",
        variant: "destructive",
      });
    }

    if (isSuccess) {
      toast({
        title: "Success",
        description:
          "If your email is registered with us, you'll receive password reset instructions shortly.",
        variant: "default",
      });
    }
  }, [isError, isSuccess, error]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Forgot Your Password?</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your email and we&apos;ll send you instructions to reset
                  your password
                </p>
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
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Sending..." : "Send Reset Instructions"}
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
