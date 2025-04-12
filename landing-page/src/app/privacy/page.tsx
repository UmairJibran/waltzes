'use client';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Privacy Policy
      </h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <p className="text-sm text-gray-500 mb-6 text-center">
          Effective Date: 2025 March 18
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            1. Introduction
          </h2>
          <p className="text-gray-600">
            Welcome to Waltzes (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). This Privacy Policy describes how we collect, use,
            and protect your personal information when you use our website
            (waltzyourway.com) and browser extension.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            2. Information We Collect
          </h2>
          <p className="text-gray-600">
            We collect the following personal data when you use our services:
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Name</li>
            <li>Email Address</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            3. How We Collect Data
          </h2>
          <p className="text-gray-600">
            We collect user data via our login/account form when you register
            for an account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            4. How We Use Your Data
          </h2>
          <p className="text-gray-600">
            We only use the collected data for user identification purposes and
            do not process or analyze it beyond this scope.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            5. Third-Party Services
          </h2>
          <p className="text-gray-600">
            We use third-party services to facilitate different aspects, you may
            refer to their respective privacy policies for more information.:
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Chargebee (Payment Processing via Stripe)</li>
            <li>PostHog (Analytics)</li>
            <li>OpenAI (Content Generation)</li>
            <li>ProxyCurl (LinkedIn profile analysis)</li>
            <li>InstantAPI (Job Post Data Collection)</li>
            <li>AWS (Hosting)</li>
            <li>Vercel (Hosting)</li>
          </ul>
          <p className="mt-2 text-gray-600">
            These services may process data according to their respective
            privacy policies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            6. Data Sharing
          </h2>
          <p className="text-gray-600">
            We do not share your personal data with any third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            7. Data Retention
          </h2>
          <p className="text-gray-600">
            We retain user data as long as the user remains registered with our
            service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            8. Data Deletion & Modifications
          </h2>
          <p className="text-gray-600">
            Users may request data deletion or modifications by emailing us at{' '}
            <a
              href="mailto:waltzes@umairjibran.com"
              className="text-blue-600 hover:underline"
            >
              waltzes@umairjibran.com
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            9. Cookies & Tracking
          </h2>
          <p className="text-gray-600">
            We do not use cookies or tracking technologies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            10. Account Requirement
          </h2>
          <p className="text-gray-600">
            Users must create an account to use our service.
          </p>
        </section>
      </div>
    </div>
  );
}
