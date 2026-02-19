'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function FarmersContent() {
    const [farmers, setFarmers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchFarmers() {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('farmers')
                .select(`
          *,
          farms (*)
        `);

            if (data) setFarmers(data);
            setLoading(false);
        }
        fetchFarmers();
    }, []);

    const filteredFarmers = farmers.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.farm_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center text-text-primary">
                <div>
                    <h2 className="text-2xl font-bold">Farmer Directory</h2>
                    <p className="text-gray-400">Managing {farmers.length} active organic farmers.</p>
                </div>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search by name or farm..."
                        className="bg-bg-card border border-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary w-64"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn-primary">+ Add Farmer</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="card h-48 animate-pulse bg-gray-800/20"></div>
                    ))
                ) : filteredFarmers.length > 0 ? (
                    filteredFarmers.map((farmer) => (
                        <div key={farmer.id} className="card hover:border-primary/50 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                                    {farmer.name[0]}
                                </div>
                                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded uppercase">Active</span>
                            </div>
                            <h3 className="font-bold text-lg">{farmer.name}</h3>
                            <p className="text-sm text-primary font-medium">{farmer.farm_name}</p>

                            <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Crop</p>
                                    <p className="text-xs font-bold">{farmer.farms?.[0]?.crop_type || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Area</p>
                                    <p className="text-xs font-bold">{farmer.farms?.[0]?.total_area_acres?.toFixed(1) || '0'} Acres</p>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs font-bold transition-colors opacity-0 group-hover:opacity-100">
                                View Profile →
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center opacity-30">
                        <p className="text-xl">No farmers found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
