'use client';

import { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { supabase } from '@/lib/supabase/client';

export default function DiagnosisPage() {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ className: string; probability: number }[]>([]);
    const [modelLoading, setModelLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<any>(null);

    // Load model on mount
    useEffect(() => {
        async function loadModel() {
            try {
                setLoading(true);
                // In a real app, you'd host the model files in /public/model
                // For this demo, we'll simulate model loading delay
                // and use a mock prediction logic since we don't have the weights files yet
                await new Promise(resolve => setTimeout(resolve, 2000));
                setModelLoading(false);
                setLoading(false);
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

        // Simulate inference delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock results for demonstration
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
            // 1. Save Diagnosis
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

            // 2. Save Fertilizer Recommendation
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
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold">AI Leaf Diagnosis</h2>
                <p className="text-gray-400">Scan leaves for early signs of rust, blight, and other diseases using client-side AI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Scanner Card */}
                <div className="card flex flex-col items-center justify-center min-h-[400px] border-dashed border-2 border-gray-800">
                    {image ? (
                        <div className="relative w-full h-full">
                            <img src={image} alt="Upload" className="w-full h-full object-cover rounded-lg" />
                            <button
                                onClick={() => { setImage(null); setResults([]); }}
                                className="absolute top-4 right-4 bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                    ) : (
                        <div className="text-center p-8">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                            </div>
                            <p className="text-lg font-bold mb-2">Upload or Take Photo</p>
                            <p className="text-sm text-gray-500 mb-6">JPEG or PNG leaf image</p>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={modelLoading}
                                className="btn-primary disabled:opacity-50"
                            >
                                {modelLoading ? 'Initializing AI...' : 'Select Image'}
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

                {/* Results Card */}
                <div className="card flex flex-col">
                    <h3 className="text-lg font-bold mb-6">Diagnosis Results</h3>

                    <div className="flex-1 flex flex-col justify-center">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-400 font-medium">Analyzing Pixels...</p>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="space-y-6">
                                {results.map((result, i) => (
                                    <div key={i} className={`p-4 rounded-xl border ${i === 0 ? 'bg-primary/5 border-primary/20' : 'bg-bg-dark border-gray-800 opacity-60'}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className={`font-bold ${i === 0 ? 'text-primary' : 'text-gray-400'}`}>{result.className}</span>
                                            <span className="text-sm font-medium">{(result.probability * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${i === 0 ? 'bg-primary' : 'bg-gray-600'}`}
                                                style={{ width: `${result.probability * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}

                                {/* Recommendation Box */}
                                {results[0].className.includes("Blight") && (
                                    <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                                        <div className="flex items-center gap-3 text-red-500 mb-4 font-bold">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                            Organic Remedy Generated
                                        </div>
                                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                            We detected potential **Blight**. Recommended organic treatment: **Copper Hydroxide Spray** or **Neem Oil Solution**.
                                            Apply in early morning for 3 consecutive days.
                                        </p>
                                        <button
                                            onClick={saveToFertilizerPlan}
                                            disabled={saving || saved}
                                            className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors disabled:opacity-50"
                                        >
                                            {saving ? 'Saving...' : saved ? 'Added to Plan ✓' : 'Add to Fertilizer Plan →'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 opacity-30">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                <p>Waiting for scan...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
