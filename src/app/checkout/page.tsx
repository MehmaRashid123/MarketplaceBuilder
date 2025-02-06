'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { client } from '@/sanity/lib/client';

function Checkout() {
    interface CartItem {
        _id: string; // Include _id for referencing in the order
        name: string;
        price: number;
        stockLevel: number;
    }

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const countries = ["United States", "Pakistan", "India"];
    const provinces: { [key: string]: string[] } = {
        "United States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        "Pakistan": ["Azad Jammu & Kashmir", "Balochistan", "Gilgit-Baltistan", "Khyber Pakhtunkhwa", "Punjab", "Sindh"],
        "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Lakshadweep"]
    };

    const [selectedCountry, setSelectedCountry] = useState("United States");
    const [selectedProvince, setSelectedProvince] = useState(provinces[selectedCountry] ? provinces[selectedCountry][0] : '');
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phone, setPhone] = useState("");
    const [billingDetailsComplete, setBillingDetailsComplete] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
        calculateTotal(cart);
    }, []);

    useEffect(() => {
        if (provinces[selectedCountry] && provinces[selectedCountry].length > 0) {
            setSelectedProvince(provinces[selectedCountry][0]);
        }
    }, [selectedCountry]);

    const calculateTotal = (cart: CartItem[]) => {
        const total = cart.reduce((sum, item) => sum + item.price * item.stockLevel, 0);
        setTotalAmount(total);
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = e.target.value;
        setSelectedCountry(country);
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

    const orderData = {
        _type: 'order',
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        zipCode: zipCode,
        phone: phone,
        email: email,
        cartItems: cartItems.map((item, index) => ({
            _key: item._id + '-' + index,  // Generate a unique key
            type: 'reference',
            ref: item._id, // Reference the product's _id
        })),
        total: totalAmount,
        status: 'pending', // Default to pending status
        orderDate: new Date().toISOString(),
    };

    const handlePlaceOrder = async () => {
        if (!billingDetailsComplete) {
            Swal.fire({
                title: "Incomplete Details",
                text: "Please complete all required billing details before placing the order.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } else {
            try {
                await client.create(orderData);
                Swal.fire({
                    title: "Order Confirmed!",
                    text: "Your order has been successfully placed.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                localStorage.removeItem("cart");
            } catch (error) {
                console.error("Error creating order:", error);
            }
        }
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
                    {/* Your form fields */}
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

                    <div className="my-4">
                        <label htmlFor="email" className="block">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-500 rounded p-3"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                    </div>

                    <div className="my-4">
                        <label htmlFor="address" className="block">Address</label>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block">City</label>
                            <input
                                type="text"
                                id="city"
                                className="w-full border border-gray-500 rounded p-3"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                    handleBillingDetailsChange();
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="zipCode" className="block">Zip Code</label>
                            <input
                                type="text"
                                id="zipCode"
                                className="w-full border border-gray-500 rounded p-3"
                                value={zipCode}
                                onChange={(e) => {
                                    setZipCode(e.target.value);
                                    handleBillingDetailsChange();
                                }}
                            />
                        </div>
                    </div>

                    <div className="my-4">
                        <label htmlFor="phone" className="block">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            className="w-full border border-gray-500 rounded p-3"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                handleBillingDetailsChange();
                            }}
                        />
                    </div>

                    {/* Country and Province Dropdown */}
                    <div className="my-4">
                        <label htmlFor="country" className="block">Country</label>
                        <select
                            id="country"
                            className="w-full border border-gray-500 rounded p-3"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                        >
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="my-4">
                        <label htmlFor="province" className="block">Province</label>
                        <select
                            id="province"
                            className="w-full border border-gray-500 rounded p-3"
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                        >
                            {provinces[selectedCountry]?.map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className={`bg-[#000000] text-white px-8 py-3 w-full mt-8 ${!billingDetailsComplete ? 'cursor-not-allowed opacity-50' : ''}`}
                        onClick={handlePlaceOrder}
                        disabled={!billingDetailsComplete}
                    >
                        Place Order
                    </button>
                </div>

                <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="font-semibold text-2xl mb-8">Order Summary</h3>
                    {cartItems.map((item, index) => (
                        <div key={item._id + '-' + index} className="flex justify-between my-4">
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                        </div>
                    ))}
                    <div className="flex justify-between my-4">
                        <span>Total</span>
                        <span>${totalAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
