import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
        return NextResponse.json({ error: 'Latitude and Longitude are required' }, { status: 400 });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        console.warn('OPENWEATHER_API_KEY is not set. Returning mock data.');
        return NextResponse.json(getMockWeatherData());
    }

    try {
        // Calling 5 day / 3 hour forecast API (Free tier)
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error(`Weather API failed with status ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Weather fetching error:', error);
        return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }
}

function getMockWeatherData() {
    return {
        list: Array.from({ length: 40 }).map((_, i) => ({
            dt: Math.floor(Date.now() / 1000) + i * 3600 * 3,
            main: { temp: 24 + Math.random() * 10 },
            weather: [{ main: Math.random() > 0.7 ? 'Rain' : 'Clouds', description: 'scattered clouds' }],
            pop: Math.random(), // Probability of precipitation
            rain: Math.random() > 0.8 ? { '3h': 6.5 } : undefined
        }))
    };
}
