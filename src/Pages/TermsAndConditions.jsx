import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="font-serif mt-10">
      <div className=" bg-gray-50 rounded-3xl shadow-2xl p-10 sm:p-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#112757] mb-12">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 mb-6">
          Welcome to <strong>YourRealEstateWebsite</strong>. By using our
          website, you agree to the following terms and conditions. Please read
          them carefully before using our services.
        </p>

        {/* 1. Website Use */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          1. Use of the Website
        </h2>
        <p className="text-gray-700">
          You must be at least 18 years old to use our website. You agree not to
          misuse this platform for fraudulent, harmful, or illegal activities.
          All information you provide must be accurate and up to date.
        </p>

        {/* 2. Property Information */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          2. Property Listings & Content
        </h2>
        <p className="text-gray-700">
          We strive to keep all property information accurate and updated.
          However, we do not guarantee the accuracy, completeness, or
          availability of listings. Users are responsible for independently
          verifying all property details before making decisions.
        </p>

        {/* 3. User Accounts */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          3. User Accounts
        </h2>
        <p className="text-gray-700">
          When you register or submit enquiries, you agree to maintain the
          confidentiality of your login details and are responsible for all
          activities under your account.
        </p>

        {/* 4. Intellectual Property */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          4. Intellectual Property
        </h2>
        <p className="text-gray-700">
          All content, including images, text, logos, and design, is the
          intellectual property of <strong>YourRealEstateWebsite</strong>. You
          may not reuse or reproduce it without written permission.
        </p>

        {/* 5. Third-Party Links */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          5. Third-Party Links
        </h2>
        <p className="text-gray-700">
          Our website may include links to third-party websites. We are not
          responsible for their content, services, or privacy practices.
          Visiting such sites is at your own risk.
        </p>

        {/* 6. Limitation of Liability */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          6. Limitation of Liability
        </h2>
        <p className="text-gray-700">
          We are not liable for any direct, indirect, or consequential damages
          arising from your use of our website or services. This includes, but
          is not limited to, loss of data, income, or property investment.
        </p>

        {/* 7. Account Termination */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          7. Termination
        </h2>
        <p className="text-gray-700">
          We reserve the right to suspend or terminate your access to the
          website at any time if you breach our terms or engage in harmful
          conduct.
        </p>

        {/* 8. Changes to Terms */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          8. Updates to Terms
        </h2>
        <p className="text-gray-700">
          We may update these Terms & Conditions at any time without prior
          notice. It is your responsibility to review this page regularly.
        </p>

        {/* 9. Contact Info */}
        <h2 className="text-2xl font-semibold text-[#112757] mt-8 mb-4">
          9. Contact Us
        </h2>
        <p className="text-gray-700">
          If you have any questions or concerns about these Terms & Conditions,
          please contact us at <strong>legal@yourrealestatewebsite.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
