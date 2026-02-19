'use client';

import { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, Legend
} from 'recharts';

const dummyData = Array.from({ length: 24 }).map((_, i) => ({
    time: `${i}:00`,
    moisture: 40 + Math.random() * 20,
    temperature: 20 + Math.random() * 15,
    humidity: 40 + Math.random() * 40,
}));

export default function SensorsPage() {
    const [activeTab, setActiveTab] = useState('moisture');

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">IoT Sensor Analytics</h2>
                    <p className="text-gray-400">Real-time data from 50+ connected farms</p>
                </div>
                <div className="flex gap-2 bg-bg-card p-1 rounded-xl border border-gray-800">
                    <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm font-bold">Live</button>
                    <button className="px-4 py-2 hover:bg-gray-800 rounded-lg text-sm font-medium text-gray-500">History</button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-800 pb-px overflow-x-auto">
                {['moisture', 'temperature', 'humidity', 'NPK'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-3 text-sm font-bold capitalize transition-all border-b-2 ${activeTab === tab
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-white'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card p-8 h-[500px]">
                    <h3 className="text-lg font-bold mb-8 capitalize">{activeTab} Trend (Last 24 Hours)</h3>
                    <div className="h-full">
                        <ResponsiveContainer width="100%" height="80%">
                            {activeTab === 'moisture' ? (
                                <AreaChart data={dummyData}>
                                    <defs>
                                        <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0d7c66" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#0d7c66" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#232839" vertical={false} />
                                    <XAxis dataKey="time" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151', borderRadius: '8px' }}
                                        itemStyle={{ color: '#0d7c66', fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="moisture" stroke="#0d7c66" strokeWidth={3} fillOpacity={1} fill="url(#colorMoisture)" />
                                </AreaChart>
                            ) : activeTab === 'temperature' ? (
                                <LineChart data={dummyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#232839" vertical={false} />
                                    <XAxis dataKey="time" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151', borderRadius: '8px' }}
                                    />
                                    <Line type="monotone" dataKey="temperature" stroke="#d4a853" strokeWidth={3} dot={false} />
                                </LineChart>
                            ) : (
                                <LineChart data={dummyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#232839" vertical={false} />
                                    <XAxis dataKey="time" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151', borderRadius: '8px' }}
                                    />
                                    <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={3} dot={false} />
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Real-time Readings */}
                <div className="card h-[500px] flex flex-col">
                    <h3 className="text-lg font-bold mb-6">Active Nodes</h3>
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="p-4 rounded-xl bg-bg-dark border border-gray-800 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 bg-success rounded-full"></div>
                                    <div>
                                        <p className="font-bold text-sm">Node #{100 + i}</p>
                                        <p className="text-xs text-gray-500">Region B, Sector 4</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-primary">{(35 + Math.random() * 10).toFixed(1)}%</p>
                                    <p className="text-[10px] uppercase tracking-wider text-gray-500">Moisture</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
