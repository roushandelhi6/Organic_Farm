'use client';

import dynamic from 'next/dynamic';

const SensorsContent = dynamic(() => import('@/components/dashboard/SensorsContent'), {
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center text-gray-500">Loading charts...</div>
});

export default function SensorsPage() {
    return <SensorsContent />;
}
