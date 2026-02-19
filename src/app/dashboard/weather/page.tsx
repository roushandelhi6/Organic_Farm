'use client';

import dynamic from 'next/dynamic';

const WeatherContent = dynamic(() => import('@/components/dashboard/WeatherContent'), {
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center text-gray-500">Loading forecast...</div>
});

export default function WeatherPage() {
    return <WeatherContent />;
}
