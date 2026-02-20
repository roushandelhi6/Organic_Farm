import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

/**
 * Background NDVI Sync Function
 * Recommended: Trigger this via Netlify Cron (e.g., once a week)
 */
export async function GET(request: Request) {
    // Security check: Verify a secret token to prevent unauthorized triggers
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (token !== process.env.BACKGROUND_TASK_TOKEN) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!supabase) {
        return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    try {
        // 1. Fetch all farms that haven't been scanned in the last 7 days
        const { data: farms, error: fetchError } = await supabase
            .from('farms')
            .select('id, name, boundary_polygon')
            .limit(10); // Process in batches

        if (fetchError) throw fetchError;

        if (!farms || farms.length === 0) {
            return NextResponse.json({ message: 'No farms pending scan.' });
        }

        console.log(`[NDVI Sync] Processing ${farms.length} farms...`);

        const results = [];

        for (const farm of farms) {
            // 2. Integration with Google Earth Engine (GEE)
            // In a real implementation, you would use 'earthengine-api' here.
            // For the pilot, we simulate the health score generation.

            const simulatedNdvi = {
                avg_ndvi: 0.45 + Math.random() * 0.4,
                max_ndvi: 0.85,
                health_status: Math.random() > 0.2 ? 'Good' : 'Critical',
                last_scanned: new Date().toISOString()
            };

            // 3. Log the results back to Supabase
            const { error: logError } = await supabase
                .from('satellite_logs')
                .insert({
                    farm_id: farm.id,
                    ndvi_data_json: simulatedNdvi,
                    capture_date: new Date().toISOString(),
                    source: 'Sentinel-2 (Simulated GEE)'
                });

            if (logError) console.error(`Error logging farm ${farm.id}:`, logError);
            else results.push({ farm_id: farm.id, status: 'Success' });
        }

        return NextResponse.json({
            success: true,
            processed: results.length,
            message: 'NDVI Background Sync Completed.'
        });

    } catch (error: any) {
        console.error('NDVI Sync Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
