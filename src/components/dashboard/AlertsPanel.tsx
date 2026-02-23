'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function AlertsPanel() {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAlerts() {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('weather_alerts')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10);

            if (data) setAlerts(data);
            setLoading(false);
        }
        fetchAlerts();

        const channel = supabase
            ?.channel('public:weather_alerts')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'weather_alerts' }, (payload: any) => {
                setAlerts(prev => [payload.new, ...prev].slice(0, 10));
            })
            .subscribe();

        return () => {
            if (channel) supabase?.removeChannel(channel);
        };
    }, []);

    return (
        <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
                <div className="text-center py-10 opacity-30">
                    <div className="size-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                </div>
            ) : alerts.length > 0 ? (
                alerts.map((alert) => (
                    <div key={alert.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-5 animate-in fade-in slide-in-from-right-8 duration-700 hover:border-primary/20 transition-all group overflow-hidden relative">
                        <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${alert.alert_type === 'rain' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                            }`}>
                            {alert.alert_type === 'rain' ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.022.547l-2.387 2.387A1 1 0 003 20h18a1 1 0 00.707-1.707l-2.279-2.279z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 12V4m0 0l-3 3m3-3l3 3" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h5 className="font-black text-sm text-white italic truncate leading-tight mb-1">
                                {alert.alert_type === 'rain' ? `High Rainfall Detect: ${alert.rainfall_mm}mm` : 'Critical Anomaly Detected'}
                            </h5>
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                                    {new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="text-[9px] font-bold text-primary italic">Status: Alert Locked</span>
                            </div>
                        </div>
                        <div className="absolute -right-2 top-0 size-8 bg-primary/10 rotate-45 transform translate-x-4 -translate-y-4"></div>
                    </div>
                ))
            ) : (
                <div className="text-center py-16 opacity-20 flex flex-col items-center">
                    <svg className="w-16 h-16 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">All Systems Nominal</p>
                </div>
            )}
        </div>
    );
}
