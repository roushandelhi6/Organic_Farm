'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function FarmersContent() {
    const [farmers, setFarmers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFarmers() {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('farmers')
                .select(`
                  *,
                  farms (*)
                `);

            if (data && data.length > 0) {
                setFarmers(data);
                setSelectedId(data[0].id);
            }
            setLoading(false);
        }
        fetchFarmers();
    }, []);

    const filteredFarmers = farmers.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.farm_name.toLowerCase().includes(search.toLowerCase())
    );

    const selectedFarmer = farmers.find(f => f.id === selectedId);

    return (
        <div className="flex-1 relative flex overflow-hidden">
            {/* Split Screen Design */}

            {/* Left Sidebar: List & Search */}
            <aside className="w-[30%] border-r border-white/5 flex flex-col bg-bg-dark/20 backdrop-blur-3xl overflow-hidden shadow-2xl z-10">
                <div className="p-8 border-b border-white/5 bg-white/5">
                    <h3 className="text-xl font-black text-white italic tracking-tighter mb-6 flex items-center gap-3">
                        <span className="p-1.5 bg-primary rounded-lg text-charcoal-green">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </span>
                        Directory
                    </h3>
                    <div className="relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-primary focus:border-primary placeholder-slate-600 outline-none transition-all"
                            placeholder="Find farmer or sector..."
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>
                        ))
                    ) : filteredFarmers.map((f) => (
                        <div
                            key={f.id}
                            onClick={() => setSelectedId(f.id)}
                            className={`p-5 rounded-3xl cursor-pointer transition-all border group relative overflow-hidden ${selectedId === f.id ? 'bg-primary/10 border-primary/40' : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'}`}
                        >
                            {selectedId === f.id && (
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_10px_#39ff14]"></div>
                            )}
                            <div className="flex items-center gap-4">
                                <div className={`size-12 rounded-2xl flex items-center justify-center font-black text-lg transition-transform group-hover:scale-110 ${selectedId === f.id ? 'bg-primary text-charcoal-green' : 'bg-white/10 text-white'}`}>
                                    {f.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-black tracking-tight truncate ${selectedId === f.id ? 'text-white' : 'text-slate-200'}`}>{f.name}</p>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{f.farm_name}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[9px] font-black italic ${selectedId === f.id ? 'text-primary' : 'text-slate-500'}`}>0.84 NDVI</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-8 border-t border-white/5 bg-white/5 text-center">
                    <button className="w-full py-4 bg-primary text-charcoal-green rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:scale-105 transition-all active:scale-95">
                        Add New Farmer
                    </button>
                </div>
            </aside>

            {/* Right Main Area: Detailed Profile View */}
            <main className="flex-1 relative overflow-hidden bg-bg-dark flex flex-col items-center justify-center">
                {/* Visual Background */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center grayscale"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-bg-dark via-bg-dark/80 to-transparent pointer-events-none"></div>

                {selectedFarmer ? (
                    <div className="relative z-10 w-[90%] max-w-4xl animate-in fade-in zoom-in duration-500">
                        {/* High-Fidelity Profile Header */}
                        <div className="glass-panel rounded-[3rem] p-12 glow-shadow border border-white/5 backdrop-blur-4xl">
                            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                                <div className="relative">
                                    <div className="size-44 rounded-[2.5rem] bg-gradient-to-br from-primary via-primary-dark to-primary-dark/80 p-0.5 shadow-[0_0_30px_rgba(57,255,20,0.3)]">
                                        <div className="w-full h-full rounded-[2.4rem] bg-charcoal-green flex items-center justify-center text-primary text-5xl font-black italic uppercase">
                                            {selectedFarmer.name[0]}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 px-4 py-1.5 bg-primary text-charcoal-green text-[10px] font-black rounded-full shadow-lg border-4 border-charcoal-green">
                                        PREMIUM
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-2">
                                        <h2 className="text-5xl font-black text-white italic tracking-tighter">{selectedFarmer.name}</h2>
                                        <span className="size-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#39ff14]"></span>
                                    </div>

                                    <div className="flex flex-wrap gap-6 items-center">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Estate Location</span>
                                            <span className="text-xl font-bold text-white/80">{selectedFarmer.farm_name}</span>
                                        </div>
                                        <div className="w-px h-10 bg-white/10"></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Primary Cultivar</span>
                                            <span className="text-xl font-black text-primary italic italic">{selectedFarmer.farms?.[0]?.crop_type || 'Organic Wheat'}</span>
                                        </div>
                                        <div className="w-px h-10 bg-white/10"></div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Survey Area</span>
                                            <span className="text-xl font-black text-white">{selectedFarmer.farms?.[0]?.total_area_acres?.toFixed(1) || '12.4'} <span className="text-xs opacity-40">AC</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Yield Accuracy</span>
                                        <span className="text-sm font-black text-white">99.2%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[99%] bg-primary shadow-[0_0_10px_#39ff14]"></div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Growth Index</span>
                                        <span className="text-sm font-black text-white">+12.4%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[84%] bg-primary shadow-[0_0_10px_#39ff14]"></div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sustainability Rank</span>
                                        <span className="text-sm font-black text-white">#04</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[72%] bg-primary shadow-[0_0_10px_#39ff14]"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 flex gap-4">
                                <button className="flex-1 py-5 bg-white/5 border border-white/10 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    Message Farmer
                                </button>
                                <button className="flex-1 py-5 bg-primary text-charcoal-green rounded-3xl font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(57,255,20,0.2)] hover:scale-105 transition-all text-center flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 21v-82m0 0l-4 4m4-4l4 4" /></svg>
                                    Download Historical Analytics
                                </button>
                            </div>
                        </div>
                    </div>
                ) : !loading && (
                    <div className="text-center opacity-20">
                        <svg className="w-32 h-32 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <p className="text-2xl font-black uppercase tracking-widest italic">Selection Required</p>
                    </div>
                )}
            </main>
        </div>
    );
}
