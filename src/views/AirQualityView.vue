<template>
  <div class="container mx-auto p-6 max-w-4xl">
    <!-- Header Section -->
    <header class="text-center">
      <h1 class="text-5xl font-extrabold text-blue-600 flex items-center justify-center gap-3 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a5 5 0 015 5h2a7 7 0 00-14 0h2a5 5 0 015-5zM17 11h3a6 6 0 010 12H4a6 6 0 010-12h3a8 8 0 0110 0z" />
        </svg>
        Tashkent Air Quality
      </h1>
      <p class="text-lg text-gray-600">Get real-time air quality updates and health suggestions based on conditions.</p>
    </header>

    <!-- Fetch Button -->
    <div class="flex justify-center my-8">
      <button
        class="flex items-center gap-3 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition focus:ring-4 focus:ring-blue-300"
        @click="fetchAirQuality"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2a1 1 0 011 1v3h-4V3a1 1 0 011-1zm-1 16a1 1 0 01-1-1v-3h-2v3a3 3 0 003 3zm8-3a1 1 0 01-1-1v-3h-2v3a3 3 0 003 3zM7 9a1 1 0 01-1-1V5H4v3a3 3 0 003 3z" />
        </svg>
        Fetch Air Quality Data
      </button>
    </div>

    <!-- Display Weather Information -->
    <div v-if="weather" class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg">
      <h2 class="text-4xl font-bold text-blue-700 mb-6 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a5 5 0 015 5h2a7 7 0 00-14 0h2a5 5 0 015-5zM17 11h3a6 6 0 010 12H4a6 6 0 010-12h3a8 8 0 0110 0z" />
        </svg>
        {{ weather.city }}, {{ weather.country }}
      </h2>

      <!-- AQI Levels -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold text-blue-600">Air Quality Index</h3>
        <ul class="mt-2 text-lg text-gray-700 space-y-2">
          <li><strong>AQI (US):</strong> {{ weather.current.pollution.aqius }}</li>
          <li><strong>Main Pollutant:</strong> {{ weather.current.pollution.mainus }}</li>
        </ul>
      </div>

      <!-- Weather Details -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold text-blue-600">Weather Conditions</h3>
        <ul class="mt-2 text-lg text-gray-700 space-y-2">
          <li><strong>Temperature:</strong> {{ weather.current.weather.tp }}°C</li>
          <li><strong>Humidity:</strong> {{ weather.current.weather.hu }}%</li>
          <li><strong>Wind Speed:</strong> {{ weather.current.weather.ws }} m/s</li>
        </ul>
      </div>

      <!-- Suggestions -->
      <div>
        <h3 class="text-2xl font-semibold text-blue-600 flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm4.53 3.12a.75.75 0 011.06 1.06l-2.91 2.91h7.12a.75.75 0 110 1.5H7.68l2.91 2.91a.75.75 0 11-1.06 1.06L5.53 12l4-4z" />
          </svg>
          Health Suggestions
        </h3>
        <p class="text-lg text-gray-700 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow">
          {{ weather.suggestions }}
        </p>
      </div>
    </div>

    <!-- Fallback Message -->
    <div v-else class="text-center mt-8">
      <p class="text-lg text-gray-600">No air quality data available. Please click the button above to fetch the latest information.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface PollutionData {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

interface WeatherData {
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
}

interface LocationData {
  type: string;
  coordinates: number[];
}

interface CurrentData {
  pollution: PollutionData;
  weather: WeatherData;
}

interface AirQualityData {
  city: string;
  country: string;
  state: string;
  location: LocationData;
  current: CurrentData;
  status: string;
  suggestions: string;
}

const weather = ref<AirQualityData | null>(null);

async function fetchAirQuality() {
  try {
    const response = await fetch(
      'http://api.airvisual.com/v2/city?city=Tashkent&state=Toshkent%20shahri&country=Uzbekistan&key=62d6d870-979b-4f67-964a-6846bf5eae24'
    );
    const data = await response.json();

    if (data && data.data && data.data.current) {
      const aqi = data.data.current.pollution.aqius;
      let suggestions = '';

      if (aqi <= 50) {
        suggestions = `
          Air quality is excellent! Drink plenty of water (2–3 liters daily).
          Include fresh fruits and vegetables like apples, cucumbers, and bell peppers in your meals.
          Eat a balanced diet rich in whole grains, lean proteins, and foods with high antioxidants.
        `;
      } else if (aqi <= 100) {
        suggestions = `
          Air quality is moderate. Ensure you stay hydrated by drinking 2 liters of water daily.
          Add antioxidant-rich foods to your meals, such as blueberries, spinach, and almonds.
          Avoid prolonged outdoor activities if possible.
        `;
      } else if (aqi <= 150) {
        suggestions = `
          Air quality is unhealthy for sensitive groups. Drink green tea or lemon-infused water to detoxify your system.
          Add vitamin C-rich foods like oranges, kiwi, and strawberries to your meals.
          Consume omega-3-rich foods such as salmon, flaxseeds, and walnuts to support your health.
        `;
      } else if (aqi <= 200) {
        suggestions = `
          Air quality is unhealthy. Stay indoors and use air purifiers if available.
          Drink warm herbal teas (like ginger or chamomile) and consume foods that reduce inflammation,
          such as turmeric, garlic, and broccoli. Include plenty of dark leafy greens like kale in your diet.
        `;
      } else {
        suggestions = `
          Air quality is very unhealthy or hazardous. Avoid going outdoors entirely.
          Keep your body hydrated with water and detox drinks like cucumber-mint water or fresh fruit juices.
          Eat light meals focused on fresh fruits, vegetables, and whole grains to boost your immunity.
        `;
      }

      weather.value = {
        city: data.data.city,
        country: data.data.country,
        state: data.data.state,
        location: {
          type: data.data.location.type,
          coordinates: data.data.location.coordinates,
        },
        current: {
          pollution: {
            ts: data.data.current.pollution.ts,
            aqius: data.data.current.pollution.aqius,
            mainus: data.data.current.pollution.mainus,
            aqicn: data.data.current.pollution.aqicn,
            maincn: data.data.current.pollution.maincn,
          },
          weather: {
            ts: data.data.current.weather.ts,
            tp: data.data.current.weather.tp,
            pr: data.data.current.weather.pr,
            hu: data.data.current.weather.hu,
            ws: data.data.current.weather.ws,
          },
        },
        status: data.status,
        suggestions,
      };
    }
  } catch (error) {
    console.error('Failed to fetch air quality data:', error);
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>
