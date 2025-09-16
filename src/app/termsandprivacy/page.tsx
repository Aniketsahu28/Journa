import React from "react";

const TermsAndPrivacy = () => {
  return (
    <div className="w-full h-full bg-white p-5 pt-4 pb-16 flex flex-col gap-10 overflow-y-auto">
      <h1 className="ml-5 lg:ml-0 text-xl font-poppins font-medium">
        Terms and Privacy
      </h1>
      {/* Terms & Conditions */}
      <section className="w-[60%] mx-auto font-nunito">
        <h1 className="text-2xl font-medium font-poppins mb-2">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-6">
          Effective Date: [Insert Date]
        </p>

        <div className="space-y-4">
          <p>
            Welcome to <strong>Journa</strong>. By accessing or using our
            platform, you agree to the following Terms & Conditions. Please read
            them carefully.
          </p>

          <h2 className="text-xl font-medium">1. Use of Service</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Journa is provided for personal and professional use.</li>
            <li>You agree not to misuse, copy, or exploit the platform.</li>
            <li>You must be at least 13 years old to use the service.</li>
          </ul>

          <h2 className="text-xl font-medium">2. Accounts & Security</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              You are responsible for maintaining the confidentiality of your
              account.
            </li>
            <li>
              You must provide accurate and complete information when
              registering.
            </li>
            <li>Journa is not liable for unauthorized account access.</li>
          </ul>

          <h2 className="text-xl font-medium">3. Content Ownership</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You retain ownership of the content you create or upload.</li>
            <li>
              By posting, you grant Journa a non-exclusive license to display
              and improve services.
            </li>
            <li>You must not post harmful, illegal, or offensive content.</li>
          </ul>

          <h2 className="text-xl font-medium">4. Limitations</h2>
          <p>
            We do not guarantee uninterrupted access and are not liable for
            damages caused by misuse.
          </p>

          <h2 className="text-xl font-medium">5. Termination</h2>
          <p>
            We may suspend or terminate your access if you violate these terms.
            You may delete your account at any time.
          </p>

          <h2 className="text-xl font-medium">6. Changes to Terms</h2>
          <p>
            We may update these Terms periodically. Continued use means
            acceptance of revised terms.
          </p>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="w-[60%] mx-auto font-nunito">
        <h1 className="text-2xl font-medium font-poppins mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">
          Effective Date: [Insert Date]
        </p>

        <div className="space-y-4">
          <p>
            Your privacy is important to us. This Privacy Policy explains how{" "}
            <strong>Journa</strong>
            collects, uses, and protects your information.
          </p>

          <h2 className="text-xl font-medium">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Personal Data:</strong> Name, email, login credentials.
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, features used.
            </li>
            <li>
              <strong>Device Data:</strong> Browser, IP address, cookies.
            </li>
          </ul>

          <h2 className="text-xl font-medium">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and improve Journa’s services.</li>
            <li>To personalize your experience.</li>
            <li>To communicate updates or security alerts.</li>
          </ul>

          <h2 className="text-xl font-medium">3. Sharing of Information</h2>
          <p>
            We do not sell your personal data. We may share data with trusted
            providers (hosting, analytics, payment) or disclose if required by
            law.
          </p>

          <h2 className="text-xl font-medium">4. Data Security</h2>
          <p>
            We use reasonable safeguards to protect your data, but no system is
            100% secure.
          </p>

          <h2 className="text-xl font-medium">5. Cookies & Tracking</h2>
          <p>
            We use cookies to improve user experience. You can disable cookies,
            but some features may not work.
          </p>

          <h2 className="text-xl font-medium">6. Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your data, and
            opt out of communications anytime.
          </p>

          <h2 className="text-xl font-medium">
            7. Updates to Privacy Policy
          </h2>
          <p>
            We may update this Policy from time to time and notify users of
            major changes.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsAndPrivacy;
