-- Organic Farm Management System Schema

-- Farmers TABLE
CREATE TABLE farmers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  farm_name TEXT,
  location TEXT,
  coordinates JSONB, -- { "lat": float, "lng": float }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Farms TABLE
CREATE TABLE farms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  total_area_acres DECIMAL,
  boundary_polygon JSONB, -- GeoJSON polygon
  crop_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sensors TABLE
CREATE TABLE sensors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  sensor_type TEXT NOT NULL, -- 'moisture', 'npk', 'humidity', 'temperature', etc.
  location TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sensor Readings TABLE (Time-series)
CREATE TABLE sensor_readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sensor_id UUID REFERENCES sensors(id) ON DELETE CASCADE,
  value DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  reading_type TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Satellite Logs TABLE (NDVI)
CREATE TABLE satellite_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  ndvi_data_json JSONB,
  capture_date DATE DEFAULT CURRENT_DATE,
  source TEXT DEFAULT 'Sentinel-2',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Diagnoses TABLE
CREATE TABLE ai_diagnoses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  image_url TEXT,
  disease_name TEXT,
  confidence DECIMAL,
  severity TEXT, -- 'low', 'medium', 'high'
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fertilizer Recommendations TABLE
CREATE TABLE fertilizer_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  diagnosis_id UUID REFERENCES ai_diagnoses(id) ON DELETE CASCADE,
  fertilizer_name TEXT,
  ingredients TEXT,
  application_method TEXT,
  dosage TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weather Alerts TABLE
CREATE TABLE weather_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  alert_type TEXT, -- 'rain', 'temp', etc.
  rainfall_mm DECIMAL,
  forecast_time TIMESTAMP WITH TIME ZONE,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
