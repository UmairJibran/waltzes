'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
export function Navbar() {
  return (
    <nav className="bg-white border-b border-indigo-100 fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-950">
              <Image
                src="/waltzes-logo.png"
                className="p-4"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 cursor-pointer"
              onClick={() => {
                window.location.href = 'https://app.waltzyourway.com/login';
              }}
            >
              Sign In
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
              onClick={() => {
                window.location.href = 'https://app.waltzyourway.com/register';
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
