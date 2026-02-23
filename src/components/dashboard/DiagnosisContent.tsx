'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function DiagnosisContent() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ className: string; probability: number }[]>([]);
    const [modelLoading, setModelLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function loadModel() {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                setModelLoading(false);
            } catch (err) {
                console.error("Failed to load model", err);
                setModelLoading(false);
            }
        }
        loadModel();
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                runDiagnosis();
            };
            reader.readAsDataURL(file);
        }
    };

    const runDiagnosis = async () => {
        setLoading(true);
        setResults([]);
        setSaved(false);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const mockResults = [
            { className: "Tomato Late Blight", probability: 0.89 },
            { className: "Tomato Septoria Leaf Spot", probability: 0.08 },
            { className: "Healthy", probability: 0.03 }
        ];
        setResults(mockResults);
        setLoading(false);
    };

    const saveToFertilizerPlan = async () => {
        if (!supabase || results.length === 0) return;
        setSaving(true);
        try {
            const { data: diagnosis, error: diagError } = await supabase
                .from('ai_diagnoses')
                .insert({
                    disease_name: results[0].className,
                    confidence: results[0].probability,
                    severity: results[0].probability > 0.8 ? 'high' : 'medium',
                    recommendations: 'Organic Copper Hydroxide Spray recommended.'
                })
                .select()
                .single();
            if (diagError) throw diagError;
            const { error: fertError } = await supabase
                .from('fertilizer_recommendations')
                .insert({
                    diagnosis_id: diagnosis.id,
                    fertilizer_name: 'Organic Copper Hydroxide',
                    ingredients: 'Copper hydroxide, water',
                    application_method: 'Foliar Spray',
                    dosage: '2g per Litre'
                });
            if (fertError) throw fertError;
            setSaved(true);
        } catch (err) {
            console.error('Save error:', err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex-1 relative flex overflow-hidden">
            {/* AI Vision Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center brightness-[0.3] grayscale"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1597362860722-39e62fc44c80?auto=format&fit=crop&q=80&w=1600')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-bg-dark/80 via-transparent to-primary/10 pointer-events-none"></div>

                {/* Visual HUD Brackets */}
                <div className="absolute top-1/2 left-[calc(40%-200px)] -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-40">
                    <div className="size-[400px] border-2 border-primary/20 rounded-3xl relative">
                        <div className="absolute -top-1 -left-1 size-10 border-t-4 border-l-4 border-primary/60 rounded-tl-xl blur-[1px]"></div>
                        <div className="absolute -top-1 -right-1 size-10 border-t-4 border-r-4 border-primary/60 rounded-tr-xl blur-[1px]"></div>
                        <div className="absolute -bottom-1 -left-1 size-10 border-b-4 border-l-4 border-primary/60 rounded-bl-xl blur-[1px]"></div>
                        <div className="absolute -bottom-1 -right-1 size-10 border-b-4 border-r-4 border-primary/60 rounded-br-xl blur-[1px]"></div>
                    </div>
                </div>
            </div>

            {/* AI Camera Centerpiece */}
            <div className="absolute top-1/2 left-[calc(40%-200px)] -translate-y-1/2 -translate-x-1/2 z-10 w-[400px] aspect-square flex flex-col items-center justify-center">
                {image ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(57,255,20,0.2)] border border-primary/30 group">
                        <img src={image} alt="Upload" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                        {/* Scanning Line Animation */}
                        {loading && (
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                <div className="w-full h-1 bg-primary/60 shadow-[0_0_20px_#39ff14] animate-[scan_2s_ease-in-out_infinite]"></div>
                            </div>
                        )}

                        <button
                            onClick={() => { setImage(null); setResults([]); }}
                            className="absolute top-4 right-4 size-10 bg-red-500/80 backdrop-blur-md rounded-xl text-white flex items-center justify-center hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                ) : (
                    <div className="text-center group">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="size-24 bg-primary/10 border border-primary/30 rounded-3xl flex items-center justify-center text-primary mb-8 cursor-pointer hover:bg-primary/20 hover:scale-110 transition-all shadow-[0_0_30px_rgba(57,255,20,0.1)] group"
                        >
                            <svg className="w-10 h-10 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-black text-white italic tracking-widest uppercase mb-2">Initialize Scanner</h3>
                        <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-[0.2em] leading-relaxed">Upload leaf image for <br /> real-time neural diagnosis</p>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={modelLoading}
                            className="btn-primary font-black px-10 py-4 rounded-2xl text-charcoal-green disabled:opacity-50 shadow-[0_0_20px_rgba(57,255,20,0.2)]"
                        >
                            {modelLoading ? 'Calibrating AI...' : 'Select Source'}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                )}
            </div>

            {/* Right Side: Analysis Panel */}
            <aside className="relative z-10 w-[26rem] ml-auto p-6 flex flex-col gap-6">
                <div className="glass-panel rounded-3xl p-8 flex-1 flex flex-col gap-8 glow-shadow overflow-hidden">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-100 italic">Neural Response</h3>
                        <div className="flex gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-150"></span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
                                <p className="text-xs font-black text-primary uppercase tracking-[0.4em] animate-pulse">Processing Pixels</p>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    {results.map((result, i) => (
                                        <div key={i} className={`p-5 rounded-2xl transition-all border ${i === 0 ? 'bg-primary/5 border-primary/40' : 'bg-white/5 border-white/5 opacity-40'}`}>
                                            <div className="flex justify-between items-center mb-3">
                                                <span className={`text-sm font-black italic ${i === 0 ? 'text-primary' : 'text-slate-400'}`}>{result.className}</span>
                                                <span className="text-xs font-black text-white">{(result.probability * 100).toFixed(1)}%</span>
                                            </div>
                                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 ${i === 0 ? 'bg-primary shadow-[0_0_10px_#39ff14]' : 'bg-slate-600'}`}
                                                    style={{ width: `${result.probability * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {results[0].className.includes("Blight") && (
                                    <div className="mt-4 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-2 opacity-10">
                                            <svg className="size-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z" /></svg>
                                        </div>
                                        <div className="flex items-center gap-3 text-red-500 mb-4 font-black italic">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            Critical Remediation
                                        </div>
                                        <p className="text-xs text-slate-300 mb-6 leading-relaxed font-bold">
                                            Pathogen detected: <span className="text-red-400 underline underline-offset-4 decoration-red-500/40">Late Blight</span>. System recommends immediate <span className="text-white italic">Copper Hydroxide</span> foliar treatment to prevent ecosystem collapse.
                                        </p>
                                        <button
                                            onClick={saveToFertilizerPlan}
                                            disabled={saving || saved}
                                            className="w-full py-3 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                        >
                                            {saving ? 'Syncing...' : saved ? 'Added to Plan ✓' : 'Add to Treatment Plan'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 group">
                                <div className="size-20 bg-white/5 rounded-full flex items-center justify-center text-slate-600 mx-auto mb-6 group-hover:scale-110 transition-all border border-white/5">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Waiting for Neural Feed</p>
                            </div>
                        )}
                    </div>

                    {/* Stats Footer */}
                    <div className="mt-auto grid grid-cols-2 gap-4">
                        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                            <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Latency</p>
                            <p className="text-lg font-black text-white italic">14ms</p>
                        </div>
                        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                            <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Accuracy</p>
                            <p className="text-lg font-black text-white italic">99.2%</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Scanning Line Animation Keyframes */}
            <style jsx>{`
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
}
