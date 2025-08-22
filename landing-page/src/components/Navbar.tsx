'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-indigo-100 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-950" data-umami-event="logo-click">
              <Image
                src="/waltzes-logo.png"
                className="p-4"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md" data-umami-event="nav-link" data-umami-event-link="home">
              Home
            </Link>
            <Link href="/blogs" className="text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md" data-umami-event="nav-link" data-umami-event-link="blogs">
              Blogs
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 cursor-pointer"
              onClick={() => {
                window.open('https://github.com/umairjibran/waltzes', '_blank');
              }}
            >
              GitHub
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-6 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const element = document.getElementById('getting-started');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              🚀 Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
