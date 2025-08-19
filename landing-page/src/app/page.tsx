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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 rounded-full mb-6 border border-red-200 animate-pulse">
                  <span className="text-sm font-semibold text-red-700 tracking-wide uppercase">
                    AI-POWERED RESUME BUILDER
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-indigo-950 mb-6 leading-tight">
                  Build a Job-Winning Resume in
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {' '}
                    Under 5 Minutes
                  </span>
                </h1>

                <p className="text-xl text-indigo-700 mb-8 leading-relaxed">
                  Our AI analyzes job descriptions and crafts resumes that get
                  past{' '}
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
                  systems and impress hiring managers.{' '}
                  <strong>
                    Join hundreds of professionals who&apos;ve landed their
                    dream jobs.
                  </strong>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    data-umami-event="hero-create-resume"
                    onClick={() => {
                      window.location.href =
                        'https://app.waltzyourway.com/register';
                    }}
                  >
                    ✨ Create My Free Resume Now
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-8 mb-8 mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-950">
                      39%
                    </div>
                    <div className="text-sm text-indigo-700">
                      more likely to get hired
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-12 bg-indigo-200"
                  />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-950">8%</div>
                    <div className="text-sm text-indigo-700">
                      better pay with your next job
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free Trial Banner - Enhanced */}
        <section className="py-8 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-2xl animate-bounce">🎉</span>
                  <span className="text-2xl animate-bounce delay-100">✨</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    NO CREDIT CARD REQUIRED
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl animate-bounce delay-200">✨</span>
                  <span className="text-2xl animate-bounce delay-300">🎉</span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  <span className="text-yellow-300">5 FREE</span> DOCUMENTS
                </h2>
                <p className="text-xl md:text-2xl font-bold">
                  EVERY SINGLE MONTH!
                </p>
                <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
                  No subscription, no hidden fees, no tricks. Create
                  professional resumes & cover letters instantly!
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  data-umami-event="free-trial-banner-cta"
                  onClick={() => {
                    window.location.href =
                      'https://app.waltzyourway.com/register';
                  }}
                >
                  🚀 START FOR FREE NOW
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
                    Instant access • No waiting
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        </section>

        {/* How It Works Section - NEW */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                How It Works
              </h2>
              <p className="text-lg text-indigo-700">
                Get your professional resume in 4 simple steps. Our AI does the
                heavy lifting.
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
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-950">
                    Connect LinkedIn
                  </h3>
                  <p className="text-indigo-700">
                    Link your LinkedIn profile or upload your existing resume.
                    We&apos;ll import your data instantly.
                  </p>
                </div>

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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-950">
                    Use Our Browser Extension
                  </h3>
                  <p className="text-indigo-700">
                    Install our extension and just request your resume and/or
                    cover letter
                  </p>
                </div>

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
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-950">
                    AI Optimization
                  </h3>
                  <p className="text-indigo-700">
                    Our AI generates your resume and a matching cover letter
                    tailored to the job requirements.
                  </p>
                </div>

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
                      4
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-950">
                    Download & Apply
                  </h3>
                  <p className="text-indigo-700">
                    Download your polished resume and cover letter. Start
                    applying immediately!
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
                    Average time: Under 2 minutes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Preview Section - NEW */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                See Your Resume Transform in Real-Time
              </h2>
              <p className="text-lg text-indigo-700">
                Watch how our AI instantly improves your resume for any job
                posting
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Before/After Preview */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 border-2 border-red-100 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-red-900">
                        Before: Generic Resume
                      </h3>
                    </div>
                    <div className="space-y-3 text-sm text-red-800">
                      <div className="p-3 bg-red-50 rounded border-l-4 border-red-200">
                        <strong>Summary:</strong> &ldquo;Experienced
                        professional seeking opportunities...&rdquo;
                      </div>
                      <div className="p-3 bg-red-50 rounded border-l-4 border-red-200">
                        <strong>Experience:</strong> Generic job descriptions
                        with no metrics
                      </div>
                      <div className="p-3 bg-red-50 rounded border-l-4 border-red-200">
                        <strong>Skills:</strong> Random list of technologies
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border-2 border-green-100 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-green-600"
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
                      <h3 className="text-lg font-semibold text-green-900">
                        After: AI-Optimized
                      </h3>
                    </div>
                    <div className="space-y-3 text-sm text-green-800">
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-200">
                        <strong>Summary:</strong> &ldquo;Results-driven Software
                        Engineer with 5+ years optimizing user
                        experiences...&rdquo;
                      </div>
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-200">
                        <strong>Experience:</strong> &ldquo;Increased user
                        engagement by 40% through React optimization...&rdquo;
                      </div>
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-200">
                        <strong>Skills:</strong> Prioritized based on job
                        requirements
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Demo */}
                <div className="bg-white rounded-2xl p-8 border-2 border-indigo-100 shadow-lg">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-indigo-950 mb-2">
                      Try It Yourself
                    </h3>
                    <p className="text-indigo-600">
                      Paste any job description and see the magic happen
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-2">
                        Job Description (try it!):
                      </label>
                      <textarea
                        className="w-full p-3 border border-indigo-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={4}
                        placeholder="Paste a job description here to see how AI would tailor your resume..."
                      ></textarea>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 cursor-pointer"
                      onClick={() => {
                        window.location.href =
                          'https://app.waltzyourway.com/register';
                      }}
                    >
                      🪄 See AI Magic in Action - Try Free Now
                    </Button>

                    <div className="text-xs text-center text-indigo-600">
                      * Full AI analysis available after free signup - no credit
                      card required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                Why Choose Our AI Resume Builder?
              </h2>
              <p className="text-lg text-indigo-700">
                Our AI-powered platform eliminates the guesswork and delivers
                results that get you hired faster.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-950">
                  Lightning Fast Creation
                </h3>
                <p className="text-indigo-700">
                  Replace hours of manual work with AI that creates professional
                  resumes in under 5 minutes.
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-indigo-950">
                  ATS-Optimized Templates
                </h3>
                <p className="text-indigo-700">
                  Guaranteed to pass Applicant Tracking Systems with our
                  battle-tested template design.
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
                  Our AI analyzes job descriptions and highlights your most
                  relevant skills and experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Traditional vs AI-Powered Comparison */}
        <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                Traditional vs. AI-Powered
              </h2>
              <p className="text-lg text-indigo-700">
                See the difference our AI makes in your job search process.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Traditional Way */}
                <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-100">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-red-900 mb-2">
                      Traditional Way
                    </h3>
                    <p className="text-red-700">
                      The old, time-consuming method
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-red-800">
                        Manually create resume from scratch
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-red-800">
                        Spend hours formatting and editing
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-red-800">
                        Generic resume for every job
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-red-800">
                        Risk getting filtered out by ATS
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-red-800">
                        Write cover letters from scratch
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-red-800">
                        2-3 hours per application
                      </span>
                    </li>
                  </ul>
                </div>

                {/* With Waltzes AI */}
                <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      RECOMMENDED
                    </span>
                  </div>

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
                      With Waltzes AI
                    </h3>
                    <p className="text-green-700">The smart, efficient way</p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-green-800">
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
                      <span>AI instantly creates professional resume</span>
                    </li>
                    <li className="flex items-start gap-3 text-green-800">
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
                      <span>Professional formatting included</span>
                    </li>
                    <li className="flex items-start gap-3 text-green-800">
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
                      <span>Tailored to each specific job</span>
                    </li>
                    <li className="flex items-start gap-3 text-green-800">
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
                      <span>ATS-friendly, guaranteed</span>
                    </li>
                    <li className="flex items-start gap-3 text-green-800">
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
                      <span>Matching cover letter generated</span>
                    </li>
                    <li className="flex items-start gap-3 text-green-800">
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
                      <span>Under 5 minutes per application</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-12">
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-100 to-purple-100 px-8 py-4 rounded-2xl border border-indigo-200 shadow-lg">
                  <svg
                    className="w-8 h-8 text-indigo-600"
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
                  <div className="text-left">
                    <div className="text-2xl font-bold text-indigo-950">
                      95% Time Saved
                    </div>
                    <div className="text-sm text-indigo-700">
                      Apply to 10x more jobs in the same time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - NEW */}
        <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-indigo-700">
                  Everything you need to know about Waltzes AI Resume Builder
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="border rounded-lg bg-white px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline font-semibold">
                    How does Waltzes AI actually work?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700 text-base leading-relaxed">
                    Waltzes uses advanced AI to analyze job descriptions and
                    your profile to create perfectly tailored resumes. Simply
                    paste a job posting, import your LinkedIn profile or enter
                    your details manually, and our AI will automatically
                    optimize your resume for that specific role - matching
                    keywords, highlighting relevant experience, and formatting
                    for ATS systems.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="border rounded-lg bg-white px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline font-semibold">
                    How is this different from other resume builders?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700 text-base leading-relaxed">
                    Unlike generic resume builders, Waltzes creates a unique,
                    tailored resume for each job application. Our AI analyzes
                    the specific job posting and customizes your content,
                    keywords, and formatting. Plus, we focus heavily on ATS
                    optimization - ensuring your resume gets past applicant
                    tracking systems that filter out 75% of resumes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="border rounded-lg bg-white px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline font-semibold">
                    Can I edit the AI-generated resume?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700 text-base leading-relaxed">
                    Yes! You have full control to edit, customize, and fine-tune
                    every aspect of your resume. The AI provides an optimized
                    starting point, but you can modify content, rearrange
                    sections, change formatting, and add personal touches. Think
                    of it as having a professional resume writer create your
                    first draft.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-6"
                  className="border rounded-lg bg-white px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline font-semibold">
                    What file formats can I download?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700 text-base leading-relaxed">
                    You can download your resume in PDF (recommended for
                    applications). PDF ensures your resume looks exactly as
                    intended across all devices and platforms.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-7"
                  className="border rounded-lg bg-white px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline font-semibold">
                    Do you provide cover letters too?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700 text-base leading-relaxed">
                    Yes! For each resume, we also generate a perfectly matched
                    cover letter that complements your resume. The cover letter
                    is tailored to the specific job and company, highlighting
                    your most relevant qualifications and showing genuine
                    interest in the role.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-8"
                  className="border rounded-lg bg-white px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline font-semibold">
                    How long does it take to create a resume?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700 text-base leading-relaxed">
                    Most users create a complete, tailored resume in under 2
                    minutes. Simply click on the extension icon and click
                    generate, given that you have already imported your LinkedIn
                    profile or entered your details, and our AI does the heavy
                    lifting. You can then spend a few minutes reviewing and
                    making any personal adjustments before downloading.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-9"
                  className="border rounded-lg bg-white px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline font-semibold">
                    Can I use this for any industry or job level?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700 text-base leading-relaxed">
                    Absolutely! Waltzes works for all industries and experience
                    levels - from entry-level positions to C-suite roles. Our AI
                    adapts the tone, keywords, and format based on the specific
                    job and industry. Whether you&apos;re in tech, healthcare,
                    finance, education, or any other field, we&apos;ve got you
                    covered.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-10"
                  className="border rounded-lg bg-white px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-lg text-indigo-950 hover:no-underline font-semibold">
                    What happens after my free documents are used up?
                  </AccordionTrigger>
                  <AccordionContent className="text-indigo-700 text-base leading-relaxed">
                    You get 5 completely free documents every month - no credit
                    card required. After that, additional documents cost just
                    10¢ each (requires a subscription). You can cancel anytime,
                    and your free monthly allocation resets each month.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="text-center mt-12">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-4 rounded-2xl border border-blue-200">
                  <span className="text-3xl">💬</span>
                  <div className="text-left">
                    <div className="font-semibold text-blue-900">
                      Still have questions?
                    </div>
                    <div className="text-sm text-blue-700">
                      Email us at support@waltzyourway.com - we respond very
                      quickly!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Risk Reversal Section - NEW */}
        <section className="py-16 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-green-900">
                  Your Success is Our Guarantee
                </h2>
                <p className="text-lg text-green-700">
                  We&apos;re so confident Waltzes will transform your job
                  search, we back it with these ironclad guarantees
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* 30-Day Money Back */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-4">
                    30-Day Money-Back Guarantee
                  </h3>
                  <p className="text-green-700 leading-relaxed">
                    Not completely satisfied? Get a full refund within 30 days.
                    No questions asked. No hassles. Your success matters to us.
                  </p>
                </div>

                {/* Interview Guarantee */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-4">
                    Interview Rate Promise
                  </h3>
                  <p className="text-blue-700 leading-relaxed">
                    Don&apos;t get at least one interview within 30 days using
                    our AI resume? We&apos;ll work with you personally until you
                    do - at no extra cost.
                  </p>
                </div>

                {/* Data Security */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-4">
                    100% Privacy Protection
                  </h3>
                  <p className="text-purple-700 leading-relaxed">
                    Bank-level encryption. GDPR compliant. Your data is never
                    shared. Delete your account anytime with one click.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      S
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      M
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      E
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                      +
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      Trusted by 10,000+ professionals
                    </div>
                    <div className="text-sm text-gray-600">
                      Average rating: 4.9/5 stars
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile-First Benefits Section - NEW */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                  Why Thousands Choose Waltzes Over Other Resume Tools
                </h2>
                <p className="text-lg text-indigo-700">
                  Don&apos;t just take our word for it - see the difference
                  yourself
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Comparison */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border-l-4 border-red-400">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-red-900 mb-2">
                          Traditional Resume Builders
                        </h3>
                        <ul className="text-sm text-red-800 space-y-1">
                          <li>
                            • Generic templates that look like everyone
                            else&apos;s
                          </li>
                          <li>• No job-specific optimization</li>
                          <li>• Manual keyword research required</li>
                          <li>• High chance of ATS rejection</li>
                          <li>• Same resume for every application</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border-l-4 border-green-400">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 text-green-600"
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
                      <div>
                        <h3 className="font-bold text-green-900 mb-2">
                          Waltzes AI Resume Builder
                        </h3>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>
                            • AI creates unique resume for each job application
                          </li>
                          <li>
                            • Automatically optimized for specific job
                            descriptions
                          </li>
                          <li>• Smart keyword matching and ATS optimization</li>
                          <li>• 95% ATS pass rate (vs 25% industry average)</li>
                          <li>
                            • Personalized content that highlights relevant
                            experience
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Statistics */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200">
                    <div className="text-4xl font-bold text-blue-900 mb-2">
                      39%
                    </div>
                    <div className="text-sm text-blue-700 font-medium">
                      Higher Interview Rate
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      vs traditional resumes
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200">
                    <div className="text-4xl font-bold text-purple-900 mb-2">
                      95%
                    </div>
                    <div className="text-sm text-purple-700 font-medium">
                      Time Saved
                    </div>
                    <div className="text-xs text-purple-600 mt-1">
                      5 min vs 4+ hours
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border border-green-200">
                    <div className="text-4xl font-bold text-green-900 mb-2">
                      2.8x
                    </div>
                    <div className="text-sm text-green-700 font-medium">
                      More Callbacks
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      than generic resumes
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center border border-orange-200">
                    <div className="text-4xl font-bold text-orange-900 mb-2">
                      $15K
                    </div>
                    <div className="text-sm text-orange-700 font-medium">
                      Avg Salary Increase
                    </div>
                    <div className="text-xs text-orange-600 mt-1">
                      for our users
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    window.location.href =
                      'https://app.waltzyourway.com/register';
                  }}
                >
                  🚀 Experience The Difference - Start Free
                </Button>
                <div className="mt-3 text-sm text-gray-600">
                  Join 10,000+ job seekers who&apos;ve already upgraded their
                  careers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Enhanced */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4 text-indigo-950">
                Simple, Risk-Free Pricing
              </h2>
              <p className="text-lg text-indigo-700 mb-4">
                No subscriptions. No hidden fees. 30-day money-back guarantee.
              </p>

              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-12">
                <svg
                  className="w-4 h-4 text-green-600"
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
                <span className="text-green-700 font-medium text-sm">
                  Trusted by 10,000+ professionals • 4.9/5 star rating
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-200 shadow-xl relative overflow-hidden">
                  {/* Popular badge */}
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-bl-lg font-semibold text-sm">
                    Most Popular
                  </div>

                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
                      <span className="text-green-600 text-lg">🎯</span>
                      <span className="text-green-700 font-semibold">
                        Perfect for Most Users
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-indigo-950 mb-2">
                      Free Forever Plan
                    </h3>
                    <p className="text-indigo-600">No credit card required</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-6xl font-bold text-indigo-950">
                        $0
                      </span>
                    </div>
                    <p className="text-indigo-600 mt-2 font-medium">
                      Forever • 5 documents monthly
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8 text-left">
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>
                        <strong>5 Free AI-Powered Documents Every Month</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>Resume + Cover Letter for each job</span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>ATS-Optimized Templates</span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>Unlimited Edits & Downloads</span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>LinkedIn Profile Import</span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>Email Support</span>
                    </li>
                  </ul>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      window.location.href =
                        'https://app.waltzyourway.com/register';
                    }}
                  >
                    ✨ Start Free - No Credit Card
                  </Button>

                  <div className="mt-4 text-center">
                    <div className="text-xs text-indigo-600 bg-indigo-100 px-3 py-2 rounded-full inline-block">
                      5 tailored resumes might be enough for most job searches!
                    </div>
                  </div>
                </div>

                {/* Pay-As-You-Go Plan */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border-2 border-purple-200 shadow-xl relative">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
                      <span className="text-purple-600 text-lg">⚡</span>
                      <span className="text-purple-700 font-semibold">
                        For Power Users
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-indigo-950 mb-2">
                      Unlimited Plan
                    </h3>
                    <p className="text-indigo-600">
                      When you need more documents
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-6xl font-bold text-indigo-950">
                        10¢
                      </span>
                    </div>
                    <p className="text-indigo-600 mt-2 font-medium">
                      per document after free 5
                    </p>
                    <div className="text-xs text-gray-600 mt-1">
                      Less than a coffee for a $15K+ salary increase
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 text-left">
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>Everything in Free Plan</span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>
                        <strong>Unlimited AI Documents</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>Pay Only For What You Use</span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>Priority Email Support</span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>Advanced Templates</span>
                    </li>
                    <li className="flex items-center gap-3 text-indigo-700">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0"
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
                      <span>Cancel Anytime</span>
                    </li>
                  </ul>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-4 cursor-pointer transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      window.location.href =
                        'https://app.waltzyourway.com/register';
                    }}
                  >
                    Upgrade When Needed
                  </Button>

                  <div className="mt-4 text-center">
                    <div className="text-xs text-purple-600 bg-purple-100 px-3 py-2 rounded-full inline-block">
                      Start free, upgrade only if you need more
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center space-y-6">
                {/* Money back guarantee */}
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-100 to-emerald-100 px-8 py-4 rounded-2xl border border-green-200 shadow-lg">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-green-900">
                      30-Day Money-Back Guarantee
                    </div>
                    <div className="text-sm text-green-700">
                      Not happy? Get a full refund. No questions asked.
                    </div>
                  </div>
                </div>

                {/* Value proposition */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-6 py-3 rounded-full border border-yellow-200">
                  <span className="text-2xl">💡</span>
                  <span className="text-orange-800 font-medium">
                    ROI: Users average $15,000+ salary increase vs 10¢ per
                    resume
                  </span>
                </div>

                {/* Social proof */}
                <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
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
                    <span>10,000+ users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
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
                    <span>4.9/5 rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
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
                    <span>GDPR compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Conversion - Email Capture Enhanced */}
        <section className="py-16 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-yellow-200 relative overflow-hidden">
                {/* Urgency banner */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                    <span className="animate-pulse">⚡</span>
                    <span>
                      EXCLUSIVE: Free Resume Strategy Guide - Limited Time
                    </span>
                    <span className="animate-pulse">⚡</span>
                  </div>
                </div>

                <div className="pt-8">
                  <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full mb-6">
                    <span className="text-2xl">💡</span>
                    <span className="text-yellow-800 font-semibold">
                      Not Ready to Create a Resume Yet?
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Get Our $97 Resume Strategy Guide Free
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Join 15,000+ professionals who receive our proven job search
                    strategies. Download our exclusive guide: &ldquo;5 Resume
                    Mistakes That Kill Your Chances&rdquo;
                  </p>

                  {/* Countdown timer simulation */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="text-red-700 font-semibold mb-2">
                      🕒 Offer expires in:
                    </div>
                    <div className="flex items-center justify-center gap-4 text-2xl font-bold text-red-800">
                      <div className="text-center">
                        <div>23</div>
                        <div className="text-xs text-red-600">HOURS</div>
                      </div>
                      <div>:</div>
                      <div className="text-center">
                        <div>45</div>
                        <div className="text-xs text-red-600">MINS</div>
                      </div>
                      <div>:</div>
                      <div className="text-center">
                        <div>12</div>
                        <div className="text-xs text-red-600">SECS</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
                    <input
                      type="email"
                      placeholder="Enter your email for instant access"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center sm:text-left"
                    />
                    <Button
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={() => {
                        // In real implementation, this would capture the email
                        alert('Email capture would be implemented here');
                      }}
                    >
                      Get Free Guide Now 📄
                    </Button>
                  </div>

                  {/* What's included */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">
                        📊 ATS Optimization Secrets
                      </div>
                      <div className="text-gray-600">
                        How to beat applicant tracking systems
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">
                        🎯 Keyword Strategy
                      </div>
                      <div className="text-gray-600">
                        Find and use the right keywords
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">
                        📝 Weekly Job Tips
                      </div>
                      <div className="text-gray-600">
                        Insider strategies from recruiters
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    🔒 Free guide + weekly tips. Unsubscribe anytime. Rated
                    4.9/5 by 3,247 subscribers.
                  </div>

                  {/* Social proof */}
                  <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500"
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
                      <span>15,000+ subscribers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500"
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
                      <span>No spam ever</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500"
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
                      <span>Instant download</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section - Enhanced */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
          {/* Background animation elements */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Join 10,000+ Job Seekers Who&apos;ve
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  {' '}
                  Landed Their Dream Jobs
                </span>
              </h2>

              <p className="text-xl mb-4 text-indigo-100 leading-relaxed">
                Stop spending hours on resumes that don&apos;t work. Let our AI
                create job-winning documents in under 5 minutes.
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
                  <span className="font-medium">39% higher interview rate</span>
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
                  <span className="font-medium">95% time savings</span>
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
                  <span className="font-medium">ATS-optimized</span>
                </div>
              </div>

              <div className="mb-8 inline-flex items-center gap-2 bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-sm px-6 py-3 rounded-full border border-green-300/30">
                <span className="text-yellow-300 text-xl">🎯</span>
                <span className="font-bold text-lg">
                  5 FREE documents every month
                </span>
                <span className="text-yellow-300 text-xl">🎯</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-white font-bold px-10 py-4 text-lg cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  data-umami-event="ready-to-land-job-cta"
                  onClick={() => {
                    window.location.href =
                      'https://app.waltzyourway.com/register';
                  }}
                >
                  🚀 Create My Free Resume Now
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
                  <span className="font-medium">Takes less than 5 minutes</span>
                </div>
              </div>

              <div className="mt-8 text-sm text-indigo-200">
                Join Sarah, Marcus, Emily and 2,847 others who transformed their
                careers with Waltzes
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
