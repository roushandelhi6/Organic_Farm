'use client';

import dynamic from 'next/dynamic';

const FarmersContent = dynamic(() => import('@/components/dashboard/FarmersContent'), {
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center text-gray-500">Loading directory...</div>
});

export default function FarmersPage() {
    return <FarmersContent />;
}
