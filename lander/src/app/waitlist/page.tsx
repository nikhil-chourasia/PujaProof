"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || "Thanks for joining our waitlist!");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to submit. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-puja-bg text-puja-text flex flex-col items-center justify-center px-6 selection:bg-puja-accent selection:text-white">
      <div className="w-full max-w-md mx-auto flex flex-col items-center text-center animate-fade-in-up">
        
        <Link 
          href="/" 
          className="mb-12 text-sm font-medium text-puja-secondary flex items-center gap-2 hover:text-puja-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15] mb-6 text-puja-text">
          We'll let you know when its done
        </h1>
        
        <p className="text-puja-secondary text-sm md:text-base mb-10 leading-relaxed">
          PujaProof is currently in development for <span className="text-puja-accent font-medium">HackSpire'26</span>. 
          Join the waitlist to be the first to know when we launch our beta.
        </p>

        {status === 'success' ? (
          <div className="w-full bg-white border border-puja-border rounded-[24px] p-6 shadow-sm flex flex-col items-center text-center animate-fade-in-up">
            <div className="w-12 h-12 rounded-full bg-puja-accent/10 flex items-center justify-center text-puja-accent mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-puja-text mb-1">
              You're on the list!
            </h3>
            <p className="text-sm text-puja-secondary mb-4">
              {message}
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="text-xs text-puja-accent font-medium hover:underline"
            >
              Add another email
            </button>
          </div>
        ) : (
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-6 py-4 rounded-[20px] border border-puja-border bg-white text-puja-text placeholder:text-puja-secondary focus:outline-none focus:border-puja-accent transition-colors shadow-sm"
              required
              disabled={status === 'loading'}
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-puja-text text-white px-8 py-4 rounded-[20px] font-medium flex items-center justify-center gap-2 hover:bg-black/90 transition-colors disabled:opacity-70 cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                'Join Waitlist'
              )}
            </button>
            {status === 'error' && (
              <p className="text-xs text-red-500 mt-1">{message}</p>
            )}
          </form>
        )}

        <p className="text-xs text-puja-secondary mt-8">
          No spam. We'll only email you when we're ready.
        </p>
      </div>
    </div>
  );
}
