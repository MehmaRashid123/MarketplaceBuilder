"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });

      // Show success message with Swal
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your message has been sent successfully!',
        confirmButtonText: 'OK',
        background: '#f8f9fa', // Optional: Add some background styling
      });
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-md shadow-md transition-transform duration-300 ease-in-out ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
