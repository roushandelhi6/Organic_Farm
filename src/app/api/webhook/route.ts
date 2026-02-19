import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Check if data is a batch (array) or single reading
        const readings = Array.isArray(data) ? data : [data];

        for (const reading of readings) {
            // 1. Find or create the sensor record
            // For this pilot, we'll auto-provision sensors if they don't exist
            // In a real system, you'd have a more robust registration flow

            const { data: sensor, error: sensorError } = await supabase
                .from('sensors')
                .select('id')
                .eq('sensor_type', reading.sensor_type)
                .eq('farm_id', reading.farm_id)
                .single();

            let sensorId = sensor?.id;

            if (sensorError || !sensorId) {
                // If sensor doesn't exist, create it
                const { data: newSensor, error: createError } = await supabase
                    .from('sensors')
                    .insert({
                        sensor_type: reading.sensor_type,
                        farm_id: reading.farm_id,
                        status: 'active'
                    })
                    .select()
                    .single();

                if (createError) {
                    console.error('Error creating sensor:', createError);
                    continue;
                }
                sensorId = newSensor.id;
            }

            // 2. Insert the reading
            const { error: insertError } = await supabase
                .from('sensor_readings')
                .insert({
                    sensor_id: sensorId,
                    value: reading.value,
                    unit: reading.unit,
                    reading_type: reading.reading_type,
                    timestamp: reading.timestamp
                });

            if (insertError) {
                console.error('Error inserting reading:', insertError);
            }
        }

        return NextResponse.json({ success: true, message: `Processed ${readings.length} readings` });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
