document.getElementById('getForecast').addEventListener('click', async () => {
  const lat = parseFloat(document.getElementById('lat').value);
  const lon = parseFloat(document.getElementById('lon').value);
  const date = document.getElementById('date').value;

  if (!lat || !lon || !date) {
    alert('Please fill all fields.');
    return;
  }

  const url = `http://127.0.0.1:8000/forecast?lat=${lat}&lon=${lon}&date=${date}`;

  let data;
  try {
    const res = await fetch(url);
    data = await res.json();
  } catch (error) {
    // fallback demo data if backend not running
    data = {
      rain_probability: 72.5,
      temperature: 28,
      wind_speed: 14,
      air_quality: "Moderate"
    };
  }

  // update UI
  document.getElementById('forecastSection').classList.remove('hidden');
  document.getElementById('rainProb').textContent = `${data.rain_probability}%`;
  document.getElementById('temp').textContent = `${data.temperature} °C`;
  document.getElementById('wind').textContent = `${data.wind_speed} km/h`;
  document.getElementById('aqi').textContent = data.air_quality;

  const adviceBox = document.getElementById('advice');
  if (data.rain_probability > 70) {
    adviceBox.textContent = "🌧️ High chance of rain. Carry an umbrella!";
    adviceBox.style.background = "#ffcccc";
  } else if (data.rain_probability > 40) {
    adviceBox.textContent = "☁️ Possible showers. Stay prepared.";
    adviceBox.style.background = "#fff3cd";
  } else {
    adviceBox.textContent = "☀️ Low chance of rain. Enjoy your day!";
    adviceBox.style.background = "#d4edda";
  }
});
