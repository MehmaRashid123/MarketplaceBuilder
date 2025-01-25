'use client';
import React, { useEffect, useState, useCallback } from 'react';
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
    const [selectedCountry, setSelectedCountry] = useState("United States");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [billingDetailsComplete, setBillingDetailsComplete] = useState(false);

    const countries = ["United States", "Pakistan", "India"];
    const provinces: { [key: string]: string[] } = {
        "United States": ["Alabama", "Alaska", "Arizona", "California", "Texas", "New York"],
        "Pakistan": ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"],
        "India": ["Delhi", "Maharashtra", "Punjab", "Tamil Nadu"]
    };

    useEffect(() => {
        setSelectedProvince(provinces[selectedCountry][0]);
    }, [selectedCountry]);

    // Memoize the calculateTotal function to avoid unnecessary re-renders
    const calculateTotal = useCallback((cart: CartItem[]) => {
        const total = cart.reduce((sum, item) => sum + item.price * item.stockLevel, 0);
        setTotalAmount(total);
    }, []);

    // Fetch cart items and calculate total on initial render
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
        calculateTotal(cart);
    }, [calculateTotal]);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedProvince(provinces[country][0]);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(value) ? "" : "Please enter a valid email address.");
    };

    const handleBillingDetailsChange = () => {
        setBillingDetailsComplete(
            !!(firstName && lastName && address && zipCode && email && !emailError)
        );
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
                {/* Billing Details Section */}
                <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
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
                        <label htmlFor="address" className="block my-4">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="w-full border border-gray-500 rounded p-3"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                                handleBillingDetailsChange();
                            }}
                        />
                    </div>

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

                {/* Cart Summary Section */}
                <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
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
                                    <td className="py-2">{item.name} x {item.stockLevel}</td>
                                    <td className="py-2 text-right">${(item.price * item.stockLevel).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="py-2 font-semibold">Total</td>
                                <td className="py-2 text-right text-xl">${totalAmount.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
