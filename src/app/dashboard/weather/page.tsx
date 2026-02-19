'use client';

import { useState, useEffect } from 'react';

export default function WeatherPage() {
    const [forecast, setForecast] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const res = await fetch('/api/weather?lat=28.6139&lon=77.2090'); // Default coords
                const data = await res.json();

                // Transform OpenWeatherMap data to our format
                if (data.list) {
                    const transformed = data.list.slice(0, 8).map((item: any) => ({
                        time: new Date(item.dt * 1000).getHours() + ':00',
                        temp: Math.round(item.main.temp),
                        rain: item.rain ? item.rain['3h'] || 0 : 0,
                        description: item.weather[0]?.main || 'Clear'
                    }));
                    setForecast(transformed);
                }
            } catch (err) {
                console.error("Failed to fetch weather", err);
            } finally {
                setLoading(false);
            }
        }
        fetchWeather();
    }, []);

    const rainAlert = forecast.some(f => f.rain > 5);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Weather Intel</h2>
                    <p className="text-gray-400">Hyper-local 48-hour forecast and precision rain alerts.</p>
                </div>
            </div>

            {/* Main Alert Banner */}
            {rainAlert && (
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-between text-red-500">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Heavy Rain Alert: &gt; 5mm Predicted</h3>
                            <p className="text-gray-400 mt-1 font-medium">Expected in approximately 12 hours. Ensure irrigation systems are paused.</p>
                        </div>
                    </div>
                    <button className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors">
                        Acknowledge
                    </button>
                </div>
            )}

            {/* Weather Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Large Forecast Card */}
                <div className="lg:col-span-1 card flex flex-col items-center justify-center text-center p-12">
                    <div className="text-6xl mb-4">☀️</div>
                    <h3 className="text-4xl font-black mb-1">32°C</h3>
                    <p className="text-gray-400 text-lg mb-8">Partly Sunny</p>
                    <div className="w-full h-px bg-gray-800 mb-8"></div>
                    <div className="grid grid-cols-2 gap-8 w-full text-xs uppercase tracking-widest font-bold text-gray-500">
                        <div>
                            <p className="mb-1">Wind</p>
                            <p className="text-white">12 km/h</p>
                        </div>
                        <div>
                            <p className="mb-1">Humidity</p>
                            <p className="text-white">65%</p>
                        </div>
                    </div>
                </div>

                {/* 48hr Scrollable Timeline */}
                <div className="lg:col-span-3 card p-8 flex flex-col">
                    <h3 className="text-lg font-bold mb-8">48-Hour Rainfall Forecast</h3>
                    <div className="flex-1 flex items-end gap-6 overflow-x-auto pb-4">
                        {forecast.map((f, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 group min-w-[80px]">
                                <div className="relative w-12 flex flex-col justify-end min-h-[160px]">
                                    <div
                                        className={`w-full rounded-t-lg transition-all duration-500 ${f.rain > 5 ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-primary/40'}`}
                                        style={{ height: `${f.rain * 15}px` }}
                                    ></div>
                                    {f.rain > 5 && (
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                            ALERT
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-bold">{f.rain.toFixed(1)}mm</p>
                                    <p className="text-[10px] text-gray-500 mt-1">{f.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 flex items-center gap-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4Z" /><path d="M12 12h.01" /><path d="M16 12h.01" /><path d="M15 16h.01" /><path d="M15 8h.01" /><path d="M9 20h.01" /><path d="M18 20h.01" /><path d="M18 16h.01" /><path d="M18 8h.01" /><path d="M18 4h.01" /><path d="M15 4h.01" /><path d="M12 4h.01" /><path d="M9 4h.01" /><path d="M6 4h.01" /><path d="M21 12h.01" /><path d="M21 16h.01" /><path d="M21 20h.01" /><path d="M21 8h.01" /><path d="M21 4h.01" /><path d="M3 12h.01" /><path d="M3 16h.01" /><path d="M3 20h.01" /><path d="M3 8h.01" /><path d="M3 4h.01" /></svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Soil Absorption</p>
                        <p className="text-lg font-bold">Good (High)</p>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-6">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">UV Index</p>
                        <p className="text-lg font-bold">Moderate (5.2)</p>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-6">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 3.5 3.5L12 20.4l-9.2-9.2a2.5 2.5 0 1 1 3.5-3.5L12 13.4l5.7-5.7z" /></svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Crop Comfort</p>
                        <p className="text-lg font-bold">Optimal</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
