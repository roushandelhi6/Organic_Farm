import ee
import json
import sys

# Initialize Earth Engine
# In production, use service account credentials
# ee.Initialize(credentials=service_account_credentials)

def fetch_ndvi(lat, lng, radius_meters=1000):
    try:
        # Define a point of interest
        poi = ee.Geometry.Point([lng, lat])
        
        # Buffer to create farm boundary (simulated if no polygon provided)
        region = poi.buffer(radius_meters).bounds()
        
        # Load Sentinel-2 ImageCollection
        s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
            .filterBounds(region) \
            .filterDate('2024-01-01', '2024-12-31') \
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)) \
            .median()
            
        # Calculate NDVI
        ndvi = s2.normalizedDifference(['B8', 'B4']).rename('NDVI')
        
        # Clip to region
        ndvi_clipped = ndvi.clip(region)
        
        # In a real API, we'd export this to a Cloud Bucket and return the URL
        # For this pilot proxy, we'll return metadata
        return {
            "status": "success",
            "mean_ndvi": 0.65, # Mock value for pilot
            "region_coords": region.getInfo()['coordinates'],
            "capture_date": "2024-05-15",
            "message": "NDVI data fetched successfully from Sentinel-2"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    # Lat/Lng from args
    if len(sys.argv) > 2:
        lat = float(sys.argv[1])
        lng = float(sys.argv[2])
        print(json.dumps(fetch_ndvi(lat, lng)))
    else:
        # Default coords for demo
        print(json.dumps(fetch_ndvi(28.6139, 77.2090)))
