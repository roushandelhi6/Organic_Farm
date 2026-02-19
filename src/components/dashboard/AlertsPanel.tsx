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

        // Subscribe to new alerts
        const channel = supabase
            ?.channel('public:weather_alerts')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'weather_alerts' }, (payload: any) => {
                setAlerts(prev => [payload.new, ...prev].slice(0, 10));
            })
            .subscribe();

        return () => {
            supabase?.removeChannel(channel);
        };
    }, []);

    return (
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {loading ? (
                <div className="text-center py-4 text-gray-500">Loading alerts...</div>
            ) : alerts.length > 0 ? (
                alerts.map((alert) => (
                    <div key={alert.id} className="p-4 rounded-xl bg-bg-dark border border-gray-800 flex gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${alert.alert_type === 'rain' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                            {alert.alert_type === 'rain' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-sm">
                                {alert.alert_type === 'rain' ? `High Rainfall: ${alert.rainfall_mm}mm` : 'Critical Alert'}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                                {new Date(alert.created_at).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10 opacity-30 text-sm italic">
                    No active alerts. All systems nominal.
                </div>
            )}
        </div>
    );
}
