import Link from "next/link";

export default function Returns() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Returns</h1>
        <p className="text-gray-700">
          We aim to provide a seamless return process. Our return policy includes:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>Returns accepted within 30 days of purchase</li>
          <li>Items must be unused and in original packaging</li>
          <li>Refunds processed within 5-7 business days</li>
          <li>Customer is responsible for return shipping fees</li>
        </ul>
        <Link href="/"className="mt-6 inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">

            Back to Home
          
        </Link>
      </div>
    </div>
  );
}
