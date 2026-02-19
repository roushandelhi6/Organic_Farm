import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || '28.6139';
    const lon = searchParams.get('lng') || '77.2090';

    try {
        // In a production Vercel environment, you would use the Earth Engine Node.js API
        // but here we are calling the Python script as a bridge for the pilot.
        const scriptPath = path.join(process.cwd(), 'gee-scripts', 'ndvi_fetcher.py');

        // Note: This requires 'ee' and 'requests' to be installed in the environment
        const { stdout, stderr } = await execPromise(`python "${scriptPath}" ${lat} ${lon}`);

        if (stderr && !stdout) {
            console.error('GEE Script Error:', stderr);
            return NextResponse.json({ error: 'GEE Script Error' }, { status: 500 });
        }

        const data = JSON.parse(stdout);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('NDVI fetching error:', error);
        // Return mock data if script fails (e.g. no auth)
        return NextResponse.json({
            status: "mock",
            mean_ndvi: 0.72,
            capture_date: new Date().toISOString().split('T')[0],
            message: "Mock NDVI data (Bridge failed)"
        });
    }
}
