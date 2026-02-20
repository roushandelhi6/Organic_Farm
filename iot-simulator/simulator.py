import random
import time
import json
import requests
from datetime import datetime

# Configuration
WEBHOOK_URL = "https://effervescent-meerkat-1d0344.netlify.app/api/webhook"
SIMULATION_INTERVAL = 600 # 10 minutes in seconds
FARM_ID = "143c1ab0-116f-470b-b935-ecb52a5dfdfc" # Placeholder

SENSORS = [
    {"type": "moisture", "unit": "%", "range": (20, 80)},
    {"type": "nitrogen", "unit": "mg/kg", "range": (10, 100)},
    {"type": "phosphorus", "unit": "mg/kg", "range": (5, 60)},
    {"type": "potassium", "unit": "mg/kg", "range": (50, 250)},
    {"type": "humidity", "unit": "%", "range": (30, 90)},
    {"type": "temperature", "unit": "°C", "range": (15, 45)},
    {"type": "ph", "unit": "pH", "range": (4.5, 8.5)}
]

def generate_sensor_data(sensor):
    min_val, max_val = sensor["range"]
    value = round(random.uniform(min_val, max_val), 2)
    
    # Simple logic to make data more realistic based on time of day
    hour = datetime.now().hour
    if sensor["type"] == "temperature":
        # Hotter during the day
        if 10 <= hour <= 16:
            value = round(random.uniform(30, 45), 2)
        else:
            value = round(random.uniform(15, 25), 2)
    elif sensor["type"] == "humidity":
        # Drier during the day
        if 10 <= hour <= 16:
            value = round(random.uniform(30, 50), 2)
        else:
            value = round(random.uniform(60, 90), 2)
            
    return {
        "farm_id": FARM_ID,
        "sensor_type": sensor["type"],
        "value": value,
        "unit": sensor["unit"],
        "reading_type": sensor["type"],
        "timestamp": datetime.now().isoformat()
    }

def run_simulator():
    print(f"Starting IoT Simulator (Interval: {SIMULATION_INTERVAL}s)...")
    while True:
        data_batch = []
        for sensor in SENSORS:
            reading = generate_sensor_data(sensor)
            data_batch.append(reading)
        
        try:
            # In a real scenario, we might send each sensor reading individually or as a batch
            # For simplicity, we'll send the batch
            # Note: The Next.js API route will need to handle this
            response = requests.post(WEBHOOK_URL, json=data_batch)
            if response.status_code == 200:
                print(f"[{datetime.now()}] Successfully sent {len(data_batch)} readings.")
            else:
                print(f"[{datetime.now()}] Failed to send data. Status code: {response.status_code}")
        except Exception as e:
            print(f"[{datetime.now()}] Error: {e}")
            
        time.sleep(SIMULATION_INTERVAL)

if __name__ == "__main__":
    run_simulator()
