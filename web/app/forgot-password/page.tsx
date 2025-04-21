import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Waltzes",
  description: "Reset your password to regain access to your Waltzes account.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto w-full sm:w-[350px] md:w-[500px] lg:p-8">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}