'use client';

import dynamic from 'next/dynamic';

const NDVIContent = dynamic(() => import('@/components/dashboard/NDVIContent'), {
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center text-gray-500">Fetching NDVI charts...</div>
});

export default function NDVIPage() {
    return <NDVIContent />;
}
