import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
    if (!supabase) {
        return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    try {
        const farmers = Array.from({ length: 50 }).map((_, i) => ({
            name: `Farmer ${i + 1}`,
            email: `farmer${i + 1}@example.com`,
            phone: `+91 ${9000000000 + i}`,
            farm_name: `Organic Haven ${i + 1}`,
            location: `Region ${String.fromCharCode(65 + (i % 5))}`,
            coordinates: { lat: 28.6139 + (Math.random() - 0.5) * 0.1, lng: 77.2090 + (Math.random() - 0.5) * 0.1 }
        }));

        const { data: insertedFarmers, error: farmerError } = await supabase
            .from('farmers')
            .insert(farmers)
            .select();

        if (farmerError) throw farmerError;

        // Create farms for each farmer
        const farms = insertedFarmers.map((farmer: any) => ({
            farmer_id: farmer.id,
            name: `${farmer.name}'s Farm`,
            total_area_acres: 5 + Math.random() * 20,
            crop_type: ['Tomato', 'Potato', 'Wheat', 'Rice', 'Maize'][Math.floor(Math.random() * 5)],
            boundary_polygon: { type: 'Polygon', coordinates: [] } // Placeholder
        }));

        const { error: farmError } = await supabase
            .from('farms')
            .insert(farms);

        if (farmError) throw farmError;

        return NextResponse.json({ success: true, message: 'Seeded 50 farmers and farms.' });
    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
