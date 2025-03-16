import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-indigo-100 fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-950">
              Waltzes
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-indigo-600 hover:text-indigo-900">
              Features
            </Link>
            <Link href="#how-it-works" className="text-indigo-600 hover:text-indigo-900">
              How It Works
            </Link>
            <Link href="#pricing" className="text-indigo-600 hover:text-indigo-900">
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50">
              Sign In
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 