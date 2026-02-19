'use client';

import dynamic from 'next/dynamic';

const DiagnosisContent = dynamic(() => import('@/components/dashboard/DiagnosisContent'), {
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center text-gray-500">Initializing AI...</div>
});

export default function DiagnosisPage() {
    return <DiagnosisContent />;
}
