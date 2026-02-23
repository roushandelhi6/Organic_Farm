'use client';

import { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

const dummyData = Array.from({ length: 24 }).map((_, i) => ({
    time: `${i}:00`,
    moisture: 40 + Math.random() * 20,
    temperature: 20 + Math.random() * 15,
    humidity: 40 + Math.random() * 40,
}));

export default function SensorsContent() {
    const [activeTab, setActiveTab] = useState('moisture');

    return (
        <div className="flex-1 relative flex overflow-hidden">
            {/* Full-bleed Sensor Map Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center opacity-40 grayscale"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1600')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-bg-dark via-transparent to-primary/10 pointer-events-none"></div>

                {/* Active Sensor Nodes on Map */}
                {[
                    { t: '25%', l: '30%', id: 'S-101', v: '44%' },
                    { t: '55%', l: '60%', id: 'S-102', v: '38%' },
                    { t: '40%', l: '75%', id: 'S-103', v: '51%' },
                    { t: '70%', l: '40%', id: 'S-104', v: '42%' },
                ].map((node, i) => (
                    <div key={i} className="absolute group cursor-pointer" style={{ top: node.t, left: node.l }}>
                        <div className="size-3 bg-primary rounded-full animate-ping absolute inset-0 opacity-75"></div>
                        <div className="size-3 bg-primary rounded-full relative shadow-[0_0_15px_#39ff14]"></div>

                        {/* Sensor Tooltip */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 glass-panel rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl border border-primary/30 z-20 scale-90 group-hover:scale-100">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-black text-primary">{node.id}</span>
                                <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Moisture</span>
                                <span className="text-sm font-black text-white italic">{node.v}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Left/Middle: Analytics Chart (Floating Glass) */}
            <div className="absolute bottom-10 left-10 right-[30rem] h-[300px] z-10 glass-panel rounded-3xl p-8 border border-white/5 backdrop-blur-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#39ff14]"></span>
                        {activeTab} Analytics
                    </h3>
                    <div className="flex gap-2">
                        {['moisture', 'temperature', 'humidity'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-charcoal-green' : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dummyData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={activeTab === 'moisture' ? '#39ff14' : activeTab === 'temperature' ? '#D4A853' : '#3b82f6'} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={activeTab === 'moisture' ? '#39ff14' : activeTab === 'temperature' ? '#D4A853' : '#3b82f6'} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="time" hide />
                            <YAxis hide domain={['auto', 'auto']} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(10, 18, 10, 0.9)', border: '1px solid rgba(57, 255, 20, 0.2)', borderRadius: '12px', fontSize: '10px' }}
                                itemStyle={{ color: '#39ff14' }}
                            />
                            <Area type="monotone" dataKey={activeTab} stroke={activeTab === 'moisture' ? '#39ff14' : activeTab === 'temperature' ? '#D4A853' : '#3b82f6'} strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Right Side: Nodes Control Panel */}
            <aside className="relative z-10 w-[24rem] ml-auto p-6 flex flex-col gap-6">
                <div className="glass-panel rounded-3xl p-8 flex-1 flex flex-col gap-8 glow-shadow overflow-hidden">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-100 italic">Connected Nodes</h3>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full border border-primary/20">LIVE: 52</span>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        {[101, 102, 103, 104, 105, 106].map((id) => (
                            <div key={id} className={`p-5 rounded-2xl transition-all border group ${id === 101 ? 'bg-primary/5 border-primary/30' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-3 rounded-full ${id === 101 ? 'bg-primary animate-pulse' : 'bg-slate-600'}`}></div>
                                        <span className="font-black text-sm italic">Node #{id}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sector 4G</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Signal</p>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4].map(b => (
                                                <div key={b} className={`h-1.5 w-full rounded-full ${b <= 3 ? 'bg-primary' : 'bg-white/10'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Battery</p>
                                        <p className="text-xs font-black text-white italic">88%</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full btn-primary font-black py-4 rounded-2xl text-charcoal-green flex items-center justify-center gap-3 hover:scale-[1.02] shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Provision New Node
                    </button>
                </div>
            </aside>
        </div>
    );
}
