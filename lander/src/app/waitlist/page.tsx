"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2, Users, Sparkles } from 'lucide-react';

export default function Waitlist() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  const fetchCount = async () => {
    try {
      const res = await fetch('/api/waitlist', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.count === 'number') {
          setWaitlistCount(data.count);
        }
      }
    } catch (err) {
      console.error('Failed to fetch waitlist count:', err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

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
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || "Thanks for joining our waitlist!");
        setName('');
        setEmail('');
        if (typeof data.count === 'number') {
          setWaitlistCount(data.count);
        } else {
          fetchCount();
        }
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
    <div className="min-h-screen bg-puja-bg text-puja-text flex flex-col items-center justify-center px-4 sm:px-6 py-12 selection:bg-puja-accent selection:text-white">
      <div className="w-full max-w-md mx-auto flex flex-col items-center animate-fade-in-up">
        
        {/* Navigation */}
        <Link 
          href="/" 
          className="self-start sm:self-center mb-8 text-sm font-medium text-puja-secondary flex items-center gap-2 hover:text-puja-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-4 text-center text-puja-text">
          Join the PujaProof Waitlist
        </h1>
        
        {waitlistCount !== null && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-puja-accent/10 border border-puja-accent/20 text-xs sm:text-sm font-medium text-puja-accent mb-6 animate-fade-in-up">
            <span className="w-2.5 h-2.5 rounded-full bg-puja-accent animate-pulse" />
            <Users className="w-4 h-4" />
            <span>
              {waitlistCount === 1 
                ? '1 person already secured their spot' 
                : `${waitlistCount} people already secured their spot`}
            </span>
          </div>
        )}
        
        <p className="text-puja-secondary text-sm md:text-base mb-8 text-center max-w-lg leading-relaxed">
          PujaProof is built for <span className="text-puja-accent font-medium">HackSpire'26</span> to revolutionize transparent pandal verification. Secure your early access spot below.
        </p>

        {/* Signup Form / Success Banner */}
        <div className="w-full mb-6">
          {status === 'success' ? (
            <div className="w-full bg-white border border-puja-border rounded-[24px] p-6 sm:p-8 shadow-sm flex flex-col items-center text-center animate-fade-in-up">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-puja-accent mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-puja-text mb-2">
                You're officially on the list!
              </h3>
              <p className="text-sm text-puja-secondary mb-6 leading-relaxed">
                {message}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-xs font-semibold text-puja-accent hover:underline cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Add another person or email
              </button>
            </div>
          ) : (
            <form className="w-full flex flex-col gap-3.5 bg-white p-6 sm:p-7 rounded-[28px] border border-puja-border shadow-sm" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-puja-secondary uppercase tracking-wider mb-1.5 ml-1">
                  Name / Alias (Optional)
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nikhil or Ankit"
                  className="w-full px-5 py-3.5 rounded-[18px] border border-puja-border bg-puja-bg text-puja-text placeholder:text-puja-secondary/60 focus:outline-none focus:border-puja-accent transition-colors text-sm"
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-puja-secondary uppercase tracking-wider mb-1.5 ml-1">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3.5 rounded-[18px] border border-puja-border bg-puja-bg text-puja-text placeholder:text-puja-secondary/60 focus:outline-none focus:border-puja-accent transition-colors text-sm"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full mt-2 bg-puja-text text-white px-8 py-3.5 rounded-[18px] font-medium flex items-center justify-center gap-2 hover:bg-black/90 transition-colors disabled:opacity-70 cursor-pointer text-sm shadow-sm"
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
                <p className="text-xs text-red-500 mt-1 text-center font-medium">{message}</p>
              )}
            </form>
          )}
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-puja-secondary text-center">
          No spam. We'll only send launch notifications and updates for HackSpire'26.
        </p>
      </div>
    </div>
  );
}
