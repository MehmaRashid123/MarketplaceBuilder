'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in
    React.useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Example login validation
        if (!email || !password) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // Simulate a successful login
        Swal.fire({
            title: 'Login Successful!',
            text: 'You have logged in successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        });

        // Save the user's email in localStorage
        localStorage.setItem('email', email);
        setIsLoggedIn(true);

        // Clear fields after successful login
        setEmail('');
        setPassword('');
        setErrorMessage('');
    };

    const handleLogout = () => {
        // Clear the login state
        localStorage.removeItem('email');
        setIsLoggedIn(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
                <h2 className="text-3xl font-semibold text-center text-gray-700">Login</h2>

                {!isLoggedIn ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                        )}

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Welcome, <strong>{localStorage.getItem('email')}</strong></p>
                        <button
                            onClick={handleLogout}
                            className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    </div>
                )}

                <div className="text-center mt-4">
                    {!isLoggedIn && (
                        <p className="text-sm text-gray-600">
                            Don't have an account? 
                            <Link href="/singup" className="text-indigo-600 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
