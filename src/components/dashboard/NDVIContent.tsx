'use client';

import { useState, useEffect } from 'react';

export default function NDVIContent() {
    const [loading, setLoading] = useState(true);
    const [ndviData, setNdviData] = useState<any>(null);

    useEffect(() => {
        async function fetchNDVI() {
            try {
                const res = await fetch('/api/ndvi?lat=28.6139&lng=77.2090');
                const data = await res.json();
                setNdviData(data);
            } catch (err) {
                console.error("Failed to fetch NDVI", err);
            } finally {
                setLoading(false);
            }
        }
        fetchNDVI();
    }, []);

    return (
        <div className="space-y-8 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">NDVI Satellite Mapping</h2>
                    <p className="text-gray-400">Normalised Difference Vegetation Index health mapping for your farm boundary.</p>
                </div>
                <div className="flex gap-4">
                    <select className="bg-bg-card border border-gray-800 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:border-primary">
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>Historical (2023)</option>
                    </select>
                    <button className="btn-primary flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Export GeoJSON
                    </button>
                </div>
            </div>

            <div className="flex-1 card relative p-0 overflow-hidden min-h-[500px]">
                {loading ? (
                    <div className="absolute inset-0 z-20 bg-bg-card/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-primary font-bold tracking-widest uppercase text-xs">Fetching Sentinel-2 Data...</p>
                        </div>
                    </div>
                ) : (
                    <div className="h-full w-full relative">
                        {/* Simulated Map Background */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center grayscale opacity-50"></div>

                        {/* SVG Heatmap Overlay */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
                            <path d="M400,200 L600,200 L650,400 L350,400 Z" fill="#0d7c66" fillOpacity="0.4" stroke="#d4a853" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                            <circle cx="450" cy="250" r="40" fill="#22c55e" fillOpacity="0.6" stroke="#fff" strokeWidth="1" className="pointer-events-auto cursor-help" />
                            <circle cx="550" cy="320" r="30" fill="#facc15" fillOpacity="0.6" stroke="#fff" strokeWidth="1" className="pointer-events-auto cursor-help" />
                            <circle cx="500" cy="380" r="50" fill="#dc2626" fillOpacity="0.6" stroke="#fff" strokeWidth="1" className="pointer-events-auto cursor-help" />
                        </svg>

                        {/* Map Controls */}
                        <div className="absolute left-6 top-6 space-y-2">
                            <div className="bg-bg-dark/90 backdrop-blur p-4 rounded-xl border border-gray-800 shadow-2xl space-y-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Legend</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded bg-[#22c55e]"></div>
                                    <span className="text-xs font-medium">High Health (0.8+)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded bg-[#facc15]"></div>
                                    <span className="text-xs font-medium">Moderate (0.4-0.6)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded bg-[#dc2626]"></div>
                                    <span className="text-xs font-medium">Low/Stressed (0.3-)</span>
                                </div>
                            </div>
                        </div>

                        {/* Farm Info Card Overlay */}
                        <div className="absolute right-6 bottom-6 w-72 bg-bg-dark/90 backdrop-blur-xl p-6 rounded-2xl border border-primary/20 shadow-2xl transform hover:-translate-y-1 transition-transform">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold">Tiger Farm Pilot</h4>
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded">LIVE</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Avg NDVI</span>
                                    <span className="font-bold text-success">0.74</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Area</span>
                                    <span className="font-bold">12.4 Acres</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Last Pass</span>
                                    <span className="font-bold">May 15, 2026</span>
                                </div>
                                <hr className="border-gray-800" />
                                <p className="text-[10px] text-gray-400 italic">"Vegetation health is 14% higher than regional average for this period."</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
