import Link from "next/link";

export default function PrivacyPolicies() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Privacy Policies</h1>
        <p className="text-gray-700">
          Your privacy is important to us. Our privacy policies include:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>We do not share your personal information with third parties.</li>
          <li>Your data is securely stored and encrypted.</li>
          <li>We use cookies to enhance user experience.</li>
          <li>You can request data deletion at any time.</li>
        </ul>
        <Link href="/"            className="mt-6 inline-block px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
        
            Back to Home
         
        </Link>
      </div>
    </div>
  );
}
