'use client';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Terms & Conditions
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
            By using Waltzes (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;),
            you agree to abide by these Terms & Conditions. If you do not agree,
            please refrain from using our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            2. Eligibility
          </h2>
          <p className="text-gray-600">
            Our services are available to anyone without restrictions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            3. Acceptable Use
          </h2>
          <p className="text-gray-600">
            You may only use Waltzes for publicly available job postings. You
            may not use it on job listings that require login, payment, or
            restricted access.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            4. Prohibited Activities
          </h2>
          <p className="text-gray-600">You may not:</p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>
              Use our service to extract data from non-public job listings.
            </li>
            <li>Violate any applicable laws or regulations.</li>
            <li>Attempt to bypass security measures.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            5. Refunds & Guarantees
          </h2>
          <p className="text-gray-600">
            We do not offer refunds or guarantees.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            6. Account Termination
          </h2>
          <p className="text-gray-600">
            We reserve the right to ban users who violate these terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            7. Contact
          </h2>
          <p className="text-gray-600">
            For inquiries or support, contact us at{' '}
            <a
              href="mailto:waltzes@umairjibran.com"
              className="text-blue-600 hover:underline"
            >
              waltzes@umairjibran.com
            </a>
            .
          </p>
        </section>

        <p className="mt-4 text-gray-600">
          By using Waltzes, you acknowledge and agree to these terms. We may
          update this document as needed, so please review it periodically.
        </p>
      </div>
    </div>
  );
}
