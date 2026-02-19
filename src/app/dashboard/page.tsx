'use client';

import { Suspense } from 'react';
import AlertsPanel from '@/components/dashboard/AlertsPanel';

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card">
                    <p className="text-gray-400 text-sm font-medium mb-1">Total Sensors</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold">350</h3>
                        <span className="text-success text-sm">+12 today</span>
                    </div>
                </div>
                <div className="card">
                    <p className="text-gray-400 text-sm font-medium mb-1">Avg Moisture</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold">42.5%</h3>
                        <span className="text-success text-sm">Optimal</span>
                    </div>
                </div>
                <div className="card">
                    <p className="text-gray-400 text-sm font-medium mb-1">Rain Alert</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold text-warning">8.2 mm</h3>
                        <span className="text-warning text-sm font-bold">Looming Rain</span>
                    </div>
                </div>
                <div className="card">
                    <p className="text-gray-400 text-sm font-medium mb-1">Bio-Health Index</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold">0.82</h3>
                        <span className="text-success text-sm">Good</span>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Alerts */}
                <div className="lg:col-span-1 card h-[450px] flex flex-col">
                    <h3 className="text-lg font-bold mb-6">Critical Alerts</h3>
                    <AlertsPanel />
                </div>

                {/* Real-time Map Preview */}
                <div className="lg:col-span-2 card h-[450px] bg-no-repeat bg-cover bg-center overflow-hidden relative" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200")' }}>
                    <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-[2px]"></div>
                    <div className="relative z-10 p-6 h-full flex flex-col">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold">Farm Boundary Preview</h3>
                                <p className="text-sm text-gray-400">Live Satellite View (GEE)</p>
                            </div>
                            <button className="bg-primary/20 hover:bg-primary/30 text-primary p-2 rounded-lg transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-64 h-64 border-2 border-primary/50 border-dashed rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                <div className="w-48 h-48 border-2 border-secondary/50 border-dashed rounded-full"></div>
                            </div>
                            <div className="absolute font-bold text-primary tracking-widest uppercase text-xs">NDVI Scanning...</div>
                        </div>

                        <div className="flex gap-4 mt-auto overflow-x-auto pb-2 shrink-0">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="px-4 py-2 bg-gray-900/80 rounded-lg border border-gray-700 backdrop-blur whitespace-nowrap text-xs">
                                    <span className="text-gray-500 capitalize">Region {i}:</span> <span className="text-success font-bold">High Health</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
