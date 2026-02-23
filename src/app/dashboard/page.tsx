'use client';

import dynamic from 'next/dynamic';

const AlertsPanel = dynamic(() => import('@/components/dashboard/AlertsPanel'), {
    ssr: false,
    loading: () => <div className="text-center py-4 text-slate-500 font-bold uppercase tracking-widest text-[10px]">Syncing HUD...</div>
});

export default function Dashboard() {
    return (
        <div className="flex-1 flex flex-col gap-8 p-8 overflow-y-auto hide-scrollbar relative">
            {/* Mission Control Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
                <div>
                    <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-2 text-glow">System Overview</h2>
                    <h3 className="text-6xl font-black text-white italic tracking-tighter leading-none">
                        Mission <span className="text-primary">Control</span>
                    </h3>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Status</span>
                        <div className="flex items-center gap-2">
                            <span className="size-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#39ff14]"></span>
                            <span className="text-xl font-black text-white italic">OPERATIONAL</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cinematic Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Network Nodes', val: '350', unit: 'ACTIVE', trend: '+12%', color: 'var(--primary)' },
                    { label: 'Moisture Avg', val: '42.5', unit: '% REL', trend: 'OPTIMAL', color: 'var(--primary)' },
                    { label: 'Rain Prediction', val: '8.2', unit: 'mm/3h', trend: 'LOOMING', color: '#D4A853' },
                    { label: 'Bio-Vitality', val: '0.82', unit: 'NDVI', trend: 'STABLE', color: 'var(--primary)' },
                ].map((stat, i) => (
                    <div key={i} className="glass-panel rounded-[2rem] p-8 glow-shadow border border-white/5 hover:border-primary/20 transition-all group overflow-hidden relative">
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                            <div className="size-24 rounded-full border-8 border-white"></div>
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                        <div className="flex items-baseline gap-2 mb-2">
                            <h4 className="text-4xl font-black italic tracking-tighter" style={{ color: stat.color }}>{stat.val}</h4>
                            <span className="text-xs font-black text-white/40">{stat.unit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#39ff14]/80">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Central Intelligence Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visual Telemetry Map */}
                <div className="lg:col-span-8 glass-panel rounded-[2.5rem] h-[500px] overflow-hidden relative border border-white/5 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale brightness-[0.3]"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-bg-dark via-transparent to-primary/10 pointer-events-none"></div>

                    {/* HUD Overlays */}
                    <div className="relative z-10 p-10 h-full flex flex-col">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-2xl font-black text-white italic tracking-tighter mb-1">Boundary Telemetry</h4>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time Satellite Feed (Sentinel-2)</p>
                            </div>
                            <button className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary hover:bg-white/10 transition-all hover:scale-110 active:scale-95 group">
                                <svg className="w-6 h-6 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /></svg>
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-center relative">
                            {/* Radar Rings */}
                            <div className="absolute size-80 border border-primary/20 rounded-full animate-ping opacity-20"></div>
                            <div className="absolute size-60 border border-primary/20 rounded-full animate-ping opacity-20 delay-500"></div>
                            <div className="absolute size-40 border border-primary/20 rounded-full animate-ping opacity-20 delay-1000"></div>

                            <div className="relative text-center">
                                <div className="text-xs font-black text-primary tracking-[0.5em] animate-pulse mb-4 italic">NDVI SCANNING</div>
                                <div className="flex items-center justify-center">
                                    <div className="size-24 border-2 border-primary/40 border-dashed rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
                                        <div className="size-12 border-2 border-primary/60 border-dashed rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-auto overflow-x-auto pb-2 custom-scrollbar">
                            {['Alpha', 'Bravo', 'Charlie', 'Delta'].map((r, i) => (
                                <div key={i} className="px-6 py-4 glass-panel rounded-2xl border border-white/10 backdrop-blur-xl shrink-0">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Sector {r}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="size-1.5 bg-primary rounded-full shadow-[0_0_8px_#39ff14]"></div>
                                        <span className="text-xs font-black text-white italic">Health 98%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Intelligence Feed */}
                <div className="lg:col-span-4 glass-panel rounded-[2.5rem] p-10 flex flex-col border border-white/5 shadow-2xl">
                    <h4 className="text-xl font-black text-white italic tracking-tighter mb-8 flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Intelligence Feed
                    </h4>
                    <div className="flex-1 overflow-y-auto hide-scrollbar">
                        <AlertsPanel />
                    </div>
                    <button className="w-full py-4 mt-8 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                        View Archive →
                    </button>
                </div>
            </div>
        </div>
    );
}
