import Link from "next/link";
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaUniversity } from "react-icons/fa";

export default function PaymentOptions() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Payment Options</h1>
        <p className="text-gray-700 mb-4">
          We provide secure and convenient payment options for our customers. You can choose from the following methods during checkout:
        </p>
        <ul className="space-y-6">
          <li className="flex items-center space-x-4">
            <FaCreditCard className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="text-lg font-medium">Credit/Debit Cards</h2>
              <p className="text-gray-500 text-sm">
                Pay securely using Visa, Mastercard, or American Express.
              </p>
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <FaPaypal className="w-8 h-8 text-blue-700" />
            <div>
              <h2 className="text-lg font-medium">PayPal</h2>
              <p className="text-gray-500 text-sm">
                Checkout quickly with your PayPal account.
              </p>
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <FaMoneyBillWave className="w-8 h-8 text-green-500" />
            <div>
              <h2 className="text-lg font-medium">Cash on Delivery (COD)</h2>
              <p className="text-gray-500 text-sm">
                Available in select regions. Pay at the time of delivery.
              </p>
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <FaUniversity className="w-8 h-8 text-indigo-500" />
            <div>
              <h2 className="text-lg font-medium">Bank Transfer</h2>
              <p className="text-gray-500 text-sm">
                Transfer funds directly to our bank account for large orders.
              </p>
            </div>
          </li>
        </ul>
        <Link href="/"className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        
            Back to Home
          
        </Link>
      </div>
    </div>
  );
}
