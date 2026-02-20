'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen bg-bg-dark text-white flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="text-3xl font-bold text-primary mb-2">OrganicFarm Pro</div>
                    <p className="text-gray-400">Join the elite network of intelligent organic farmers.</p>
                </div>

                <div className="card border-primary/20 bg-gray-900/50 backdrop-blur-xl">
                    <div className="flex justify-between mb-8 px-2">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`flex items-center gap-2 ${step >= s ? 'text-primary' : 'text-gray-600'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step >= s ? 'border-primary bg-primary/10' : 'border-gray-700'}`}>
                                    {s}
                                </div>
                                <span className="hidden sm:block text-xs font-bold uppercase tracking-widest">
                                    {s === 1 ? 'Profile' : s === 2 ? 'Farm' : 'Verify'}
                                </span>
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-xl font-bold">Personal Profile</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Full Name</label>
                                    <input type="text" className="w-full bg-bg-dark border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Email Address</label>
                                    <input type="email" className="w-full bg-bg-dark border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                                </div>
                            </div>
                            <button onClick={() => setStep(2)} className="w-full btn-primary py-4 rounded-xl text-lg">Next Step</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-xl font-bold">Farm Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Farm Name</label>
                                    <input type="text" className="w-full bg-bg-dark border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" placeholder="Green Valley Organic" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Total Area (Acres)</label>
                                    <input type="number" className="w-full bg-bg-dark border border-gray-800 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" placeholder="12.5" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setStep(1)} className="flex-1 px-4 py-4 border border-gray-800 rounded-xl hover:bg-gray-800 transition-all">Back</button>
                                <button onClick={() => setStep(3)} className="flex-[2] btn-primary py-4 rounded-xl text-lg">Continue</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold">Ready to Launch?</h2>
                            <p className="text-gray-400">Your farm boundary scanning will begin as soon as you complete the registration.</p>
                            <Link href="/dashboard" className="block w-full btn-primary py-4 rounded-xl text-lg">Enter Dashboard</Link>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Already have an account? <Link href="/login" className="text-primary font-bold">Login here</Link>
                </div>
            </div>
        </div>
    );
}
