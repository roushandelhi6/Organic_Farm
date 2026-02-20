## Production Setup & Advanced Features

### 1. Environment Variables Sync
Ensure the following variables are set in your Netlify Dashboard (Site Settings > Environment Variables):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (Used for background tasks)
- `OPENWEATHER_API_KEY`
- `BACKGROUND_TASK_TOKEN` (Any random string for securing your cron jobs)

### 2. Background NDVI Sync (Satellite Data)
The system is equipped with a background sync engine at `/api/ndvi/background`. 
To automate this:
1. Go to **Netlify > Site Settings > Functions > Scheduled Functions**.
2. Set a cron schedule (e.g., `0 0 * * 0` for weekly) to call the background API.
3. Append `?token=YOUR_TOKEN` to the request to authorize it.

### 3. Progressive Web App (PWA)
The app is fully PWA-enabled. To install:
- **Mobile:** Open the site in Chrome/Safari and select "Add to Home Screen".
- **Desktop:** Click the "Install" icon in the browser address bar.
Offline capabilities and AI leaf scanning structure are pre-configured.

### 4. IoT Simulation
Run the local simulator to feed production data:
```bash
python iot-simulator/simulator.py
```
This script now points to your live Netlify deployment.
