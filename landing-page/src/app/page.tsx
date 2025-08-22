'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 relative overflow-hidden flex justify-center items-center">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-6 border border-green-200">
                  <span className="text-sm font-semibold text-green-700 tracking-wide uppercase">
                    OPEN SOURCE PROJECT
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-indigo-950 mb-6 leading-tight">
                  Waltzes - AI Resume Builder
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {' '}
                    Now Open Source
                  </span>
                </h1>

                <p className="text-xl text-indigo-700 mb-8 leading-relaxed">
                  A powerful AI-powered resume builder that helps create
                  professional resumes optimized for{' '}
                  <span
                    className="relative group cursor-help text-indigo-800 underline decoration-dotted"
                    title="Applicant Tracking System - Software used by employers to filter and rank resumes automatically"
                  >
                    ATS
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      Applicant Tracking System - Software used by employers to
                      filter and rank resumes automatically
                    </span>
                  </span>{' '}
                  systems. This project is no longer managed commercially but is
                  available for self-hosting and community development.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      window.open(
                        'https://github.com/umairjibran/waltzes',
                        '_blank'
                      );
                    }}
                  >
                    🚀 View on GitHub
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      const element =
                        document.getElementById('getting-started');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    📖 Get Started
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-8 mb-8 mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-950">⭐</div>
                    <div className="text-sm text-indigo-700">
                      Open Source & Free
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-12 bg-indigo-200"
                  />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-950">🏠</div>
                    <div className="text-sm text-indigo-700">Self-Hostable</div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-12 bg-indigo-200"
                  />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-950">🔧</div>
                    <div className="text-sm text-indigo-700">Customizable</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section
          id="getting-started"
          className="py-8 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-2xl animate-bounce">🚀</span>
                  <span className="text-2xl animate-bounce delay-100">💻</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    SELF-HOSTED SOLUTION
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl animate-bounce delay-200">🔧</span>
                  <span className="text-2xl animate-bounce delay-300">⚡</span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  <span className="text-yellow-300">HOST IT</span> LOCALLY
                </h2>
                <p className="text-xl md:text-2xl font-bold">
                  DEPLOY YOUR OWN INSTANCE!
                </p>
                <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
                  No subscriptions, no data tracking, complete control. Deploy
                  and customize as you need!
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => {
                    window.open(
                      'https://github.com/umairjibran/waltzes#quick-start',
                      '_blank'
                    );
                  }}
                >
                  📚 VIEW SETUP GUIDE
                </Button>
                <div className="flex items-center gap-2 text-green-100">
                  <svg
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">
                    Docker ready • Easy setup
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        </section>

        {/* How to Deploy Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                How to Deploy Waltzes
              </h2>
              <p className="text-lg text-indigo-700">
                Get your own instance running in 4 simple steps. Self-host with
                complete control.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      1
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-indigo-950">
                    Clone Repository
                  </h3>
                  <p className="text-indigo-700 text-sm">
                    Download the source code from GitHub to your local machine
                    or server.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      2
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-indigo-950">
                    Configure Environment
                  </h3>
                  <p className="text-indigo-700 text-sm">
                    Set up your environment variables and configure the AI
                    services.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      3
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-indigo-950">
                    Deploy with Docker
                  </h3>
                  <p className="text-indigo-700 text-sm">
                    Use Docker Compose to deploy all services with a single
                    command.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      4
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-indigo-950">
                    Enjoy & Customize
                  </h3>
                  <p className="text-indigo-700 text-sm">
                    Start creating resumes and customize the platform to your
                    needs.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-full border border-indigo-200">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="text-indigo-700 font-semibold">
                    Setup time: Under 10 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                Powerful Features for Everyone
              </h2>
              <p className="text-lg text-indigo-700">
                All the features you need to create professional resumes - now
                available for self-hosting
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <svg
                      className="w-10 h-10 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-950">
                    ATS-Optimized Templates
                  </h3>
                  <p className="text-indigo-700">
                    Guaranteed to pass Applicant Tracking Systems with
                    battle-tested template designs.
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <svg
                      className="w-10 h-10 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-950">
                    Smart AI Matching
                  </h3>
                  <p className="text-indigo-700">
                    AI analyzes job descriptions and highlights your most
                    relevant skills and experience.
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <svg
                      className="w-10 h-10 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-950">
                    Privacy First
                  </h3>
                  <p className="text-indigo-700">
                    Your data stays on your servers. Complete control over your
                    information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Source Benefits */}
        <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                Why Choose Self-Hosting?
              </h2>
              <p className="text-lg text-indigo-700">
                Discover the advantages of running your own instance of Waltzes.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Open Source Benefits */}
                <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-100">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-900 mb-2">
                      Self-Hosted
                    </h3>
                    <p className="text-green-700">
                      Complete control and ownership
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-green-800">
                        <strong>No Monthly Fees:</strong> Free forever once
                        deployed
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-green-800">
                        <strong>Complete Privacy:</strong> Your data never
                        leaves your servers
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-green-800">
                        <strong>Unlimited Usage:</strong> Create as many resumes
                        as you need
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-green-800">
                        <strong>Full Customization:</strong> Modify the code to
                        fit your needs
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Community Support */}
                <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">
                      Community Driven
                    </h3>
                    <p className="text-blue-700">
                      Open source development and support
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-blue-800">
                        <strong>GitHub Repository:</strong> All code available
                        and documented
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-blue-800">
                        <strong>Docker Support:</strong> Easy deployment with
                        Docker Compose
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-blue-800">
                        <strong>Community Contributions:</strong> Help improve
                        the project
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-blue-800">
                        <strong>Creative Commons</strong> Attribution-Non
                        Commercial 4.0 International License (CC BY-NC 4.0):
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Requirements */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                Technical Requirements
              </h2>
              <p className="text-lg text-indigo-700">
                Everything you need to know before deploying Waltzes
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    💻 System Requirements
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Docker & Docker Compose</li>
                    <li>• 2GB+ RAM recommended</li>
                    <li>• 10GB+ storage space</li>
                    <li>• Internet connection for AI services</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    🔧 Configuration Needed
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Grok key (or compatible)</li>
                    <li>• Database configuration</li>
                    <li>• Environment variables</li>
                    <li>• Optional: SSL certificates</li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    window.open(
                      'https://github.com/umairjibran/waltzes#installation',
                      '_blank'
                    );
                  }}
                >
                  📋 View Installation Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-indigo-700">
                Common questions about self-hosting Waltzes
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="bg-white rounded-xl border border-indigo-100 shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left">
                    <span className="text-lg font-semibold text-indigo-950">
                      Is this really free to use?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-indigo-700">
                      Yes! The code is open source under the Creative Commons
                      Attribution-NonCommercial 4.0 International License (CC
                      BY-NC 4.0). You can use it for personal or commercial
                      purposes. You&apos;ll only pay for your own infrastructure
                      costs (server, AI API usage) which you control.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="bg-white rounded-xl border border-indigo-100 shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left">
                    <span className="text-lg font-semibold text-indigo-950">
                      What AI services does it support?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-indigo-700">
                      Currently supports OpenAI GPT/Grok supported models. The
                      architecture is designed to be extensible for other AI
                      providers like Anthropic Claude, Google Gemini, and local
                      LLM models.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="bg-white rounded-xl border border-indigo-100 shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left">
                    <span className="text-lg font-semibold text-indigo-950">
                      How difficult is the setup process?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-indigo-700">
                      If you&apos;re familiar with Docker, it takes about 10
                      minutes. The repository includes detailed setup
                      instructions, environment configuration examples, and
                      Docker Compose files for easy deployment.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="bg-white rounded-xl border border-indigo-100 shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left">
                    <span className="text-lg font-semibold text-indigo-950">
                      Can I contribute to the project?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-indigo-700">
                      Absolutely! The project welcomes contributions. You can
                      submit bug reports, feature requests, code improvements,
                      or help with documentation. Check the GitHub repository
                      for contribution guidelines.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="bg-white rounded-xl border border-indigo-100 shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left">
                    <span className="text-lg font-semibold text-indigo-950">
                      What happened to the original service?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-indigo-700">
                      The original commercial service is no longer actively
                      managed. Rather than let the project disappear, it was
                      open-sourced so the community can benefit from and improve
                      upon the work.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
          {/* Background animation elements */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Ready to Deploy
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  {' '}
                  Your Own Instance?
                </span>
              </h2>

              <p className="text-xl mb-4 text-indigo-100 leading-relaxed">
                Join the open source community and take control of your resume
                building process. No subscriptions, no limitations, just
                powerful AI-driven resume creation.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8 mb-8 text-indigo-100">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium">Complete privacy control</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium">No monthly fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium">Unlimited usage</span>
                </div>
              </div>

              <div className="mb-8 inline-flex items-center gap-2 bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-sm px-6 py-3 rounded-full border border-green-300/30">
                <span className="text-yellow-300 text-xl">⚡</span>
                <span className="font-bold text-lg">
                  Setup in under 10 minutes
                </span>
                <span className="text-yellow-300 text-xl">⚡</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-white font-bold px-10 py-4 text-lg cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    window.open(
                      'https://github.com/umairjibran/waltzes',
                      '_blank'
                    );
                  }}
                >
                  🚀 Get Started on GitHub
                </Button>

                <div className="flex items-center gap-2 text-indigo-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="font-medium">
                    Free forever • Open source
                  </span>
                </div>
              </div>

              <div className="mt-8 text-sm text-indigo-200">
                Released under Creative Commons Attribution-NonCommercial 4.0
                International License (CC BY-NC 4.0) • Community-driven
                development
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
