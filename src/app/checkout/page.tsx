'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

function Checkout() {
    interface CartItem {
        name: string;
        price: number;
        stockLevel: number;
    }
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const countries = [
        "United States", "Pakistan", "India"
    ];

    const provinces: { [key: string]: string[] } = {
        "United States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        "Pakistan": ["Azad Jammu & Kashmir", "Balochistan", "Gilgit-Baltistan", "Khyber Pakhtunkhwa", "Punjab", "Sindh"],
        "India": [
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
            "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
            "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
            "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
            "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Lakshadweep"
        ]
    };

    const [selectedCountry, setSelectedCountry] = useState("United States");
    const [selectedProvince, setSelectedProvince] = useState(provinces[selectedCountry][0]);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [billingDetailsComplete, setBillingDetailsComplete] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
        calculateTotal(cart);
    }, []);

    const calculateTotal = (cart: CartItem[]) => {
        const total = cart.reduce((sum, item) => sum + item.price * item.stockLevel, 0);
        setTotalAmount(total);
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedProvince(provinces[country][0]);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const handleBillingDetailsChange = () => {
        // Validate if all required fields are filled
        const isBillingComplete = !!(firstName && lastName && address && zipCode && email && !emailError);
        setBillingDetailsComplete(isBillingComplete);
    };

    return (
        <div className="max-w-screen-2xl container mx-auto pb-8 px-4">
            <div className="relative text-black">
                <Image
                    src="/shop.jpeg"
                    alt="Shop Banner"
                    height={400}
                    width={1600}
                    className="w-full h-[200px] md:h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 1600px"
                />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-5xl font-semibold text-white">
                    Checkout
                </h1>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14">
                    <p className="text-white text-xs md:text-xl flex items-center">
                        <Link href="/" className="font-bold hover:underline">Home</Link>
                        <span className="font-bold mx-2">{'>'}</span>
                        <Link href="/shop" className="hover:underline">Checkout</Link>
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row mx-10 gap-6 mt-8">
                <div className="w-full lg:w-1/2 md:mx-20 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="font-semibold text-2xl mt-10 mb-8">Billing Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block my-4">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                className="w-full border border-gray-500 rounded p-3"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    handleBillingDetailsChange();
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block my-4">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                className="w-full border border-gray-500 rounded p-3"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                    handleBillingDetailsChange();
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="companyName" className="block my-4 mt-6">Company Name (Optional)</label>
                        <input type="text" id="companyName" className="w-full border-gray-500 rounded border p-3" />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="country" className="block my-4 mt-6">Country</label>
                        <select
                            id="country"
                            className="w-full border border-gray-500 rounded p-3"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                        >
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="address" className="block my-4 mt-6">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="w-full border-gray-500 rounded border p-3"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                                handleBillingDetailsChange();
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label htmlFor="province" className="block my-4">Province / State</label>
                            <select
                                id="province"
                                className="w-full border border-gray-500 rounded p-3"
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                            >
                                {provinces[selectedCountry].map((province, index) => (
                                    <option key={index} value={province}>{province}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="zipCode" className="block my-4">Zip / Postal Code</label>
                            <input
                                type="text"
                                id="zipCode"
                                className="w-full border-gray-500 rounded border p-3"
                                value={zipCode}
                                onChange={(e) => {
                                    setZipCode(e.target.value);
                                    handleBillingDetailsChange();
                                }}
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="mt-4">
                        <label htmlFor="email" className="block my-4">Email</label>
                        <input
                            type="email"
                            id="email"
                            className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-500'} rounded p-3`}
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleBillingDetailsChange}
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 md:mx-20 mt-4 lg:mt-0 bg-white p-6 rounded-lg shadow-lg">
                    <div className="mt-4">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="py-2 text-left text-xl">Product</th>
                                    <th className="py-2 text-right text-xl">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-2 text-gray-500">{item.name} x {item.stockLevel}</td>
                                        <td className="py-2 text-right">${(item.price * item.stockLevel).toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="py-2 font-semibold">Subtotal</td>
                                    <td className="py-2 text-right">${totalAmount.toFixed(2)}</td>
                                </tr>
                                <tr className="border-b font-semibold">
                                    <td className="py-2">Total</td>
                                    <td className="py-2 text-yellow-700 text-right text-xl">${totalAmount.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="flex items-center space-x-3 bg-gray-50 border border-gray-300 p-4 rounded-lg hover:shadow-md transition duration-300">
                            <input
                                type="radio"
                                id="bankTransfer"
                                name="payment"
                                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="bankTransfer"
                                className="text-lg font-semibold text-gray-700 hover:text-indigo-600"
                            >
                                Direct Bank Transfer
                            </label>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 pl-8">
                            Choose this option for bank transfer. Please ensure to complete the transaction within 24 hours.
                        </p>

                        <div className="flex items-center space-x-3 bg-gray-50 border border-gray-300 p-4 rounded-lg hover:shadow-md transition duration-300">
                            <input
                                type="radio"
                                id="cod"
                                name="payment"
                                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="cod"
                                className="text-lg font-semibold text-gray-700 hover:text-indigo-600"
                            >
                                Cash On Delivery
                            </label>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 pl-8">
                            Opt for cash on delivery. The payment will be collected when the product is delivered.
                        </p>
                    </div>

                    <button
                        className="mt-6 border border-black py-3 px-14 rounded-xl bg-black text-white"
                        onClick={() => {
                            if (!billingDetailsComplete) {
                                Swal.fire({
                                    title: "Incomplete Details",
                                    text: "Please complete all required billing details before placing the order.",
                                    icon: "error",
                                    confirmButtonText: "OK",
                                });
                            } else {
                                Swal.fire({
                                    title: "Order Confirmed!",
                                    text: "Your order has been successfully placed.",
                                    icon: "success",
                                    confirmButtonText: "OK",
                                });
                                localStorage.removeItem("cart");
                            }
                        }}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
