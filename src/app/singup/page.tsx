'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!email || !password || !confirmPassword) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // Password validation (8 characters and at least one special character)
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must be at least 8 characters long and contain at least one special character.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        // Simulate a successful signup
        Swal.fire({
            title: 'Signup Successful!',
            text: 'You have successfully signed up.',
            icon: 'success',
            confirmButtonText: 'OK',
        });

        // Clear fields after successful signup
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6">
                <h2 className="text-3xl font-semibold text-center text-gray-700">Sign Up</h2>

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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Confirm your password"
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
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account? 
                        <Link href="/login" className="text-indigo-600 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
