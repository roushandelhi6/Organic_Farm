'use client';

import { useState, useEffect } from 'react';

export default function WeatherContent() {
    const [forecast, setForecast] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const res = await fetch('/api/weather?lat=28.6139&lon=77.2090');
                const data = await res.json();
                if (data.list) {
                    const transformed = data.list.slice(0, 12).map((item: any) => ({
                        time: new Date(item.dt * 1000).getHours() + ':00',
                        temp: Math.round(item.main.temp),
                        rain: item.rain ? item.rain['3h'] || 0 : 0,
                        description: item.weather[0]?.main || 'Clear',
                        icon: item.weather[0]?.icon
                    }));
                    setForecast(transformed);
                }
            } catch (err) {
                console.error("Weather fetch error", err);
            } finally {
                setLoading(false);
            }
        }
        fetchWeather();
    }, []);

    const rainAlert = forecast.some(f => f.rain > 5);

    return (
        <div className="flex-1 relative flex overflow-hidden">
            {/* Visual Weather Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center brightness-[0.4] transition-all duration-1000"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592210633464-e7db0e5c7b41?auto=format&fit=crop&q=80&w=1600')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/40 to-bg-dark pointer-events-none"></div>

                {/* Animated Rain Overlay (Simulated) */}
                {rainAlert && (
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/rain.png')] animate-[pulse_2s_infinite]"></div>
                )}
            </div>

            {/* Weather Centerpiece */}
            <div className="absolute top-1/2 left-[calc(40%-200px)] -translate-y-1/2 z-10 text-center">
                <div className="text-9xl mb-4 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-bounce-slow">
                    {forecast[0]?.description === 'Rain' ? '🌧️' : '☀️'}
                </div>
                <h2 className="text-8xl font-black text-white italic tracking-tighter mb-2">
                    {forecast[0]?.temp || 32}<span className="text-primary">°</span>
                </h2>
                <p className="text-2xl font-black text-white/60 uppercase tracking-[0.4em]">{forecast[0]?.description || 'Partly Sunny'}</p>

                <div className="mt-12 flex gap-12 justify-center">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Humidity</p>
                        <p className="text-xl font-black text-white">65%</p>
                    </div>
                    <div className="w-px h-10 bg-white/10"></div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Wind Speed</p>
                        <p className="text-xl font-black text-white">12 <span className="text-xs opacity-40">km/h</span></p>
                    </div>
                </div>
            </div>

            {/* Right Side: Forecast Panel */}
            <aside className="relative z-10 w-[28rem] ml-auto p-6 flex flex-col gap-6">
                <div className="glass-panel rounded-3xl p-8 flex-1 flex flex-col gap-8 glow-shadow overflow-hidden">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-100 italic">48-Hr Forecast</h3>
                        <button className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-black rounded-full border border-primary/20 hover:bg-primary/20 transition-all">
                            REFRESH
                        </button>
                    </div>

                    {rainAlert && (
                        <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-4 animate-pulse">
                            <div className="size-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-red-500 uppercase tracking-widest">Heavy Rain Incoming</h4>
                                <p className="text-[10px] text-slate-400 font-bold">Auto-pausing irrigation in 4h</p>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                        {forecast.map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
                                <span className="text-sm font-black text-slate-400 w-12">{f.time}</span>
                                <div className="flex-1 flex items-center gap-4 pl-4 border-l border-white/5">
                                    <span className="text-xl group-hover:scale-125 transition-transform">{f.description === 'Rain' ? '🌧️' : '☀️'}</span>
                                    <span className="text-xs font-black text-white/80">{f.description}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-white italic">{f.temp}°</p>
                                    <p className={`text-[9px] font-black uppercase tracking-tighter ${f.rain > 5 ? 'text-red-500' : 'text-primary'}`}>
                                        {f.rain > 0 ? `${f.rain}mm rain` : 'Dry'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-widest">UV Index</p>
                            <p className="text-2xl font-black text-white italic">5.2</p>
                            <div className="h-1 w-full bg-white/5 rounded-full mt-3">
                                <div className="h-full w-[52%] bg-yellow-500 rounded-full shadow-[0_0_8px_orange]"></div>
                            </div>
                        </div>
                        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-widest">Absorbency</p>
                            <p className="text-2xl font-black text-white italic">High</p>
                            <p className="text-[10px] text-primary font-bold mt-2 italic">Optimal Soil State</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
