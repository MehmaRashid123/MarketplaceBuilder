"use client"; 
import React from 'react'
import Hero from './components/hero'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QlZOYCIQDJuEGRl040xY8B83rW7ktIeWc6mMF26ctuJfjNlrqn3glIMG4jLKvgpBoBLx0PMPf4uHTY7NKh7Z7aB00aSZXhNi1');

function page() {
  return (
    <div className='w-full-2xl mx-auto'>
      <Hero/>
      <Elements stripe={stripePromise}>
        </Elements>    </div>
  )
}

export default page