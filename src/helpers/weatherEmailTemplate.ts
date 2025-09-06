import { EmailJobData } from "../types";

export function weatherEmailTemplate(data: EmailJobData["forecast"]) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Daily Weather Update</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #f5f7fa;
      margin: 0;
      padding: 20px;
    }
    .card {
      max-width: 500px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
    }
    .content {
      padding: 20px;
      color: #333;
      text-align: center;
    }
    .country {
      font-size: 24px;
      font-weight: bold;
      color: #222;
      margin-bottom: 8px;
    }
    .temperature {
      font-size: 40px;
      font-weight: bold;
      color: #ff5733; /* hot red */
      margin: 10px 0;
    }
    .condition {
      font-size: 20px;
      font-weight: 500;
      color: #555;
      margin-bottom: 20px;
    }
    .secondary {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
    }
    .weather-info {
      margin: 10px 0;
      padding: 12px;
      border-radius: 8px;
      background: #f0f9ff;
      text-align: left;
    }
    .footer {
      font-size: 12px;
      text-align: center;
      color: #888;
      padding: 12px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🌤️ Daily Weather Update</h1>
    </div>
    <div class="content">
      <div class="country">📍 ${data.country}</div>
      <div class="temperature">${data.current.temperature}</div>
      <div class="condition">☁️ ${data.current.weathercode}</div>

      <div class="secondary">
        Timezone: <strong>${data.location.timezone}</strong>
      </div>

      <div class="weather-info">
        <p>💨 Windspeed: <strong>${data.current.windspeed}</strong></p>
        <p>📍 Lat: <strong>${data.location.latitude}</strong> | Long: <strong>${data.location.longitude}</strong></p>
      </div>
    </div>
    <div class="footer">
      <p>Powered by Your Weather App • Stay safe & have a great day! 🌎</p>
    </div>
  </div>
</body>
</html>`;
}
