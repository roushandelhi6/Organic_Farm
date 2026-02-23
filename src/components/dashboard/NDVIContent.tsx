'use client';

import { useState } from 'react';

export default function NDVIContent() {
    const [ndviValue, setNdviValue] = useState(45);

    return (
        <div className="flex-1 relative flex overflow-hidden">
            {/* Full-bleed Interactive Map */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center opacity-60 grayscale-[0.3]"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600')" }}
                ></div>
                {/* Heatmap Overlays (Simulated) */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-yellow-400/10 to-primary/40 pointer-events-none"></div>

                {/* Dynamic Tooltip Hover Marker */}
                <div className="absolute top-[35%] left-[45%] group cursor-pointer">
                    <div className="size-4 bg-primary rounded-full animate-ping absolute inset-0 opacity-75"></div>
                    <div className="size-4 bg-primary rounded-full relative shadow-lg shadow-primary/50"></div>

                    {/* Floating Tooltip */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 glass-panel rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl border border-primary/30 z-20">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-primary uppercase">Parcel 7G</span>
                            <span className="material-symbols-outlined text-primary text-sm">info</span>
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-white">
                                <span className="text-slate-400 font-bold">Moisture</span>
                                <span className="font-black italic">42%</span>
                            </div>
                            <div className="flex justify-between text-xs text-white">
                                <span className="text-slate-400 font-bold">Nutrients</span>
                                <span className="text-primary font-black italic">Optimal</span>
                            </div>
                            <div className="pt-2 border-t border-primary/10 mt-2 text-[10px] text-slate-500 font-bold">
                                Last check: 2h ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Health Metrics Panel */}
            <aside className="relative z-10 w-96 ml-auto p-6 flex flex-col gap-6">
                <div className="glass-panel rounded-3xl p-6 flex-1 flex flex-col gap-8 glow-shadow overflow-y-auto">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                            Health Metrics
                        </h3>
                        <button className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </button>
                    </div>

                    {/* Vitality Circular Ring */}
                    <div className="relative flex items-center justify-center py-4">
                        <svg className="size-44 -rotate-90">
                            <circle className="text-primary/10" cx="88" cy="88" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
                            <circle className="text-primary" cx="88" cy="88" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="70" strokeWidth="12" strokeLinecap="round"></circle>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-black text-slate-100">84%</span>
                            <span className="text-xs text-primary font-black uppercase tracking-widest">Vitality</span>
                        </div>
                    </div>

                    {/* Detailed Stats */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <p className="text-sm font-bold text-slate-300">Nitrogen Levels</p>
                                <p className="text-sm font-black text-primary">Optimal</p>
                            </div>
                            <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[78%] rounded-full shadow-[0_0_8px_rgba(57,255,20,0.5)]"></div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <p className="text-sm font-bold text-slate-300">Water Stress Index</p>
                                <p className="text-sm font-black text-yellow-500 italic">Low (0.2)</p>
                            </div>
                            <div className="h-20 w-full flex items-end gap-1.5 pt-2">
                                {/* Mini Graph Bars */}
                                {[40, 55, 45, 70, 60, 85, 65, 40, 50, 75].map((h, i) => (
                                    <div key={i} className={`flex-1 rounded-t-sm transition-all duration-500`} style={{ height: `${h}%`, backgroundColor: i === 5 ? 'var(--primary)' : 'rgba(57, 255, 20, 0.3)' }}></div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                                <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Chlorophyll</p>
                                <p className="text-xl font-black text-white">4.2 <span className="text-xs font-normal opacity-40">mg/g</span></p>
                            </div>
                            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                                <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Soil pH</p>
                                <p className="text-xl font-black text-white">6.8 <span className="text-xs font-normal opacity-40">avg</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button className="w-full btn-primary font-black py-4 rounded-2xl text-charcoal-green flex items-center justify-center gap-2 hover:scale-[1.02] shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download Report
                        </button>
                    </div>
                </div>
            </aside>

            {/* Timeline Slider Footer */}
            <div className="absolute bottom-10 left-10 right-[26rem] z-10 flex items-center gap-6 px-8 py-5 glass-panel rounded-3xl glow-shadow border border-primary/20 backdrop-blur-xl">
                <button className="size-12 bg-primary rounded-full flex items-center justify-center text-charcoal-green shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:scale-110 transition-all active:scale-95">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </button>
                <div className="flex-1 flex flex-col gap-3">
                    <div className="flex justify-between px-2 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                        <span>March</span>
                        <span>April</span>
                        <span className="text-primary">May (Current)</span>
                        <span>June</span>
                        <span>July</span>
                        <span>August</span>
                    </div>
                    <div className="relative flex items-center h-6">
                        <input
                            className="w-full h-1.5 bg-primary/10 rounded-full appearance-none cursor-pointer"
                            max="100" min="1" type="range"
                            value={ndviValue}
                            onChange={(e) => setNdviValue(parseInt(e.target.value))}
                        />
                        {/* Marker for specific growth stage */}
                        <div className="absolute left-[20%] top-[-4px] flex flex-col items-center">
                            <div className="size-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-[8px] text-yellow-400 mt-4 font-black uppercase">Sowing</span>
                        </div>
                        <div className="absolute left-[45%] top-[-4px] flex flex-col items-center">
                            <div className="size-2 bg-primary rounded-full ring-4 ring-primary/20 shadow-[0_0_10px_#39ff14]"></div>
                            <span className="text-[8px] text-primary mt-4 font-black uppercase">Sprouting</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end min-w-[120px] pl-6 border-l border-white/10">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Growth Index</p>
                    <p className="text-2xl font-black text-primary italic">+12.4%</p>
                </div>
            </div>

            {/* Legend Overlay */}
            <div className="absolute left-10 top-10 z-10 glass-panel rounded-2xl p-5 w-52 border border-primary/20 backdrop-blur-xl">
                <h4 className="text-xs font-black text-slate-100 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                    NDVI Index
                </h4>
                <div className="h-2.5 w-full ndvi-gradient rounded-full mb-3 shadow-inner"></div>
                <div className="flex justify-between text-[10px] text-slate-400 font-black">
                    <span>Stress</span>
                    <span>Lush</span>
                </div>
                <div className="mt-6 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input checked readOnly className="rounded bg-primary/20 border-primary/40 text-primary focus:ring-primary size-4" type="checkbox" />
                        </div>
                        <span className="text-[11px] text-slate-300 font-bold group-hover:text-primary transition-colors uppercase tracking-widest">Heatmap Overlay</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input className="rounded bg-primary/20 border-primary/40 text-primary focus:ring-primary size-4" type="checkbox" />
                        </div>
                        <span className="text-[11px] text-slate-300 font-bold group-hover:text-primary transition-colors uppercase tracking-widest">Water Sensors</span>
                    </label>
                </div>
            </div>

            {/* Floating Action Controls */}
            <div className="absolute right-[26rem] top-10 z-10 flex flex-col gap-3">
                <button className="size-11 glass-panel rounded-xl flex items-center justify-center text-slate-100 hover:text-primary hover:border-primary/50 transition-all hover:scale-105 active:scale-95 shadow-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                </button>
                <button className="size-11 glass-panel rounded-xl flex items-center justify-center text-slate-100 hover:text-primary hover:border-primary/50 transition-all hover:scale-105 active:scale-95 shadow-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg>
                </button>
                <div className="h-0.5 w-6 bg-primary/20 mx-auto my-1 rounded-full"></div>
                <button className="size-11 glass-panel rounded-xl flex items-center justify-center text-slate-100 hover:text-primary hover:border-primary/50 transition-all hover:scale-105 active:scale-95 shadow-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
                <button className="size-11 glass-panel rounded-xl flex items-center justify-center text-slate-100 hover:text-primary hover:border-primary/50 transition-all hover:scale-105 active:scale-95 shadow-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 7m0 13V7" /></svg>
                </button>
            </div>
        </div>
    );
}
