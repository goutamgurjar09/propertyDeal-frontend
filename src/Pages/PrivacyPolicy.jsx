import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="font-serif  bg-gray-50 mt-8">
      <div className="  rounded-3xl shadow-2xl p-10 sm:p-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#112757] mb-12">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-6">
          At <strong>YourRealEstateWebsite</strong>, we are committed to
          protecting your privacy. This Privacy Policy outlines how we collect,
          use, and safeguard your information when you interact with our website
          or services.
        </p>

        {/* 1. Information We Collect */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Personal Information: name, email, phone number, address.</li>
          <li>Property preferences, location, and budget interests.</li>
          <li>
            Technical data such as IP address, browser type, and device
            information.
          </li>
        </ul>

        {/* 2. How We Use Your Information */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To help you find suitable properties and connect with agents.</li>
          <li>To respond to your queries and schedule property visits.</li>
          <li>To improve website performance and user experience.</li>
          <li>To send updates, offers, and newsletters (only if opted in).</li>
        </ul>

        {/* 3. Sharing Your Data */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          3. Sharing Your Data
        </h2>
        <p className="text-gray-700">
          We do not sell or rent your personal data. However, we may share
          information with:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
          <li>Verified real estate agents or builders you interact with.</li>
          <li>
            Trusted third-party service providers for operations (e.g., hosting,
            analytics).
          </li>
          <li>Legal authorities when required by law.</li>
        </ul>

        {/* 4. Data Security */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          4. Data Security
        </h2>
        <p className="text-gray-700">
          We implement industry-standard security practices to safeguard your
          data. However, no system is 100% secure, and we advise you to protect
          your login credentials and activity.
        </p>

        {/* 5. Cookies */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          5. Cookies & Tracking
        </h2>
        <p className="text-gray-700">
          Our website uses cookies to enhance your browsing experience and
          understand usage patterns. You can choose to disable cookies through
          your browser settings.
        </p>

        {/* 6. Your Rights */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          6. Your Rights
        </h2>
        <p className="text-gray-700">
          You have the right to access, update, or delete your personal data
          stored with us. To make such requests, please contact us at{" "}
          <strong>support@yourrealestatewebsite.com</strong>.
        </p>

        {/* 7. Changes to this Policy */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          7. Updates to This Policy
        </h2>
        <p className="text-gray-700">
          We may update this policy from time to time. Changes will be posted on
          this page with the revised date.
        </p>

        {/* Contact Info */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, please email us
          at <strong>privacy@yourrealestatewebsite.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
