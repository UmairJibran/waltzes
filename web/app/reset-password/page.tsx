import { ResetPasswordForm } from "@/components/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Waltzes",
  description: "Create a new password for your Waltzes account.",
};

export default function ResetPasswordPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto w-full sm:w-[350px] md:w-[500px] lg:p-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
}