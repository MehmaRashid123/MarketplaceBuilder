'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

function CheackOut() {
    interface CartItem {
        name: string;
        price: number;
        stockLevel: number;
    }

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);

    // Fetch cart data from localStorage or API
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
        calculateTotal(cart);
    }, []);

    // Calculate the total price of the cart items
    const calculateTotal = (cart: CartItem[]) => { // Specify CartItem[] instead of any[]
        const total = cart.reduce((sum, item) => sum + item.price * item.stockLevel, 0);
        setTotalAmount(total);
    };

    return (
        <div className="max-w-screen-2xl container mx-auto pb-8 px-4">
            <div className='bg-[#faf4f4]'></div>

            {/* Banner Section */}
            <div className="relative text-black">
                <Image
                    src="/shop.jpeg" // Replace with the correct image file path
                    alt="Shop Banner"
                    height={400}
                    width={1600}
                    className="w-full h-[200px] md:h-auto object-cover"
                />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-5xl font-semibold">
                    Checkout
                </h1>
                {/* Breadcrumb Section */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14">
                    <p className="text-gray-700 text-xs md:text-xl flex items-center">
                        <Link href="/" className="font-bold hover:underline">Home</Link>
                        <span className="font-bold mx-2">{'>'}</span>
                        <Link href="/shop" className="hover:underline">Checkout</Link>
                    </p>
                </div>
            </div>

            {/* Billing Section */}
            <div className="flex flex-col lg:flex-row mx-10 gap-6 mt-8">
                <div className="w-full lg:w-1/2 md:mx-20">
                    <h3 className="font-semibold text-2xl mt-10 mb-8">Billing Details</h3>
                    {/* Add Billing Form */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block my-4">First Name</label>
                            <input type="text" id="firstName" className="w-full border border-gray-500 rounded p-3" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block my-4">Last Name</label>
                            <input type="text" id="lastName" className="w-full border border-gray-500 rounded p-3" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="companyName" className="block my-4 mt-6">Company Name (Optional)</label>
                        <input type="text" id="companyName" className="w-full border-gray-500 rounded border p-3" />
                    </div>

                    {/* Other Billing Fields */}
                    <div className="mt-4">
                        <label htmlFor="country" className="block my-4 mt-6">Country / Region</label>
                        <input type="text" id="country" className="w-full border-gray-500 rounded border p-3" />
                    </div>

                    {/* Additional Fields... */}

                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/2 md:mx-20 mt-4 lg:mt-0">
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
                                        <td className="py-2 text-right">Rs: {item.price * item.stockLevel}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="py-2 font-semibold">Subtotal</td>
                                    <td className="py-2 text-right">Rs: {totalAmount}</td>
                                </tr>
                                <tr className="border-b font-semibold">
                                    <td className="py-2">Total</td>
                                    <td className="py-2 text-yellow-700 text-right text-xl">Rs: {totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-center mt-4">
                        <input type="radio" id="bankTransfer" name="payment" className="mr-2" />
                        <label htmlFor="bankTransfer" className="text-md">Direct Bank Transfer</label>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at arcu at eros malesuada facilisis.</p>

                    <div className="flex items-center mt-4 text-gray-400">
                        <input type="radio" id="cod" name="payment" className="mr-2" />
                        <label htmlFor="cod" className="text-md">Cash On Delivery</label>
                    </div>
                    <p className="text-sm text-gray-600 mt-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at arcu at eros malesuada facilisis.</p>

                    {/* Place Order Button */}
                    <button
                        className="mt-6 border border-black py-3 px-14 rounded-xl"
                        onClick={() => {
                            Swal.fire({
                                title: "Order Confirmed!",
                                text: "Your order has been successfully placed.",
                                icon: "success",
                                confirmButtonText: "OK",
                            });
                        }}
                    >
                        Place Order
                    </button>
                </div>
            </div>

            <div className='my-10'>
                {/* Additional Field Component */}
            </div>
        </div>
    );
}

export default CheackOut;
