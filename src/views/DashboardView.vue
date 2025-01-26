<script lang="ts" setup>


import {computed, onMounted, ref} from "vue";
import type {AirQualityData} from "@/views/AirQualityView.vue";

const weather = ref<AirQualityData | null>(null);

async function fetchAirQuality() {
  try {
    const response = await fetch(
      'http://api.airvisual.com/v2/city?city=Tashkent&state=Toshkent%20shahri&country=Uzbekistan&key=62d6d870-979b-4f67-964a-6846bf5eae24'
    );
    const data = await response.json();
    weather.value = data.data;
  } catch (error) {
    console.error(error);
  }
}

fetchAirQuality();

// if weather.tp is less than 10, then show the message "It's cold outside. Wear a jacket."
// if weather.tp is between 10 and 20, then show the message "It's warm outside. Wear a t-shirt."
// if weather.tp is more than 20, then show the message "It's hot outside. Wear a hat."

const suitableClothes = computed(() => {
  if (weather.value) {
    if (weather.value.current.weather.tp < 10) {
      return "It's cold outside. Wear a jacket.";
    } else if (weather.value.current.weather.tp >= 10 && weather.value.current.weather.tp <= 20) {
      return "It's warm outside. Wear a t-shirt.";
    } else {
      return "It's hot outside. Wear a hat.";
    }
  }
});

// suaitable foods with food names also drinkings  according to the weather


const suitableFoods = computed(() => {
  if (weather.value) {
    if (weather.value.current.weather.tp < 10) {
      return "It's cold outside. Eat hot foods like soup, porridge, and stew. Drink hot drinks like tea, coffee, and hot chocolate.";
    } else if (weather.value.current.weather.tp >= 10 && weather.value.current.weather.tp <= 20) {
      return "It's warm outside. Eat light foods like salad, sandwich, and fruit. Drink cold drinks like water, juice, and smoothie.";
    } else {
      return "It's hot outside. Eat cold foods like ice cream, salad, and fruit. Drink cold drinks like water, juice, and smoothie.";
    }
  }
});



import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chartRef = ref<HTMLCanvasElement | null>(null);

const data = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
  datasets: [
    {
      label: "Calorie Consumption",
      data: [1800, 1900, 1750, 2000, 2200, 2100, 2300, 1950, 2050, 1800],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

onMounted(() => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "line", // Change to "line" for a line chart
        data,
        options,
      });
    }
  }

  if (chartRef2.value) {
    const ctx = chartRef2.value.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "line", // Change to "line" for a line chart
        data: data2,
        options: options2,
      });
    }
  }
});

// also protein consumption

const chartRef2 = ref<HTMLCanvasElement | null>(null);

const data2 = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
  datasets: [
    {
      label: "Protein Consumption",
      data: [60, 70, 55, 80, 90, 85, 95, 75, 85, 60],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};









</script>

<template>
    <div class="p-4    rounded-lg dark:border-gray-700">
      <div class="text-2xl text-center mb-6 font-semibold text-gray-700 dark:text-gray-200">
        Get Your overall health suggestions
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4">

<!--        card for showing weather-->
        <div class=" dark:bg-gray-800 rounded-2xl bg-blue-200  shadow-xl p-4 flex flex-col justify-center items-center">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Weather</h2>
          <div class="flex items center justify-between mt-2">
            <div>
              <p class="text-3xl font-semibold text-gray-800 dark:text-gray-100">{{weather?.current.weather.tp}}°C</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Feels like {{weather?.current.weather.tp}}°C</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Humidity: {{suitableClothes}}</p>
            </div>
          </div>
        </div>

        <div class=" dark:bg-gray-800 rounded-2xl bg-blue-200 shadow-xl p-4 flex flex-col justify-center items-center">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Your Nutrients today</h2>
          <div class="flex items center justify-between mt-2">
            <div>
              <p class="text-3xl font-semibold text-gray-800 dark:text-gray-100">Calories: 2000/1200</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Proteins: 100/60g</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Carbs: 200/130g</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Fats: 50/25g</p>
            </div>
          </div>
        </div>

        <div class=" dark:bg-gray-800 rounded-2xl bg-blue-200 shadow-xl p-4 flex flex-col justify-center items-center">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Your Food Suggestions</h2>
          <div class="flex items center justify-between mt-2">
            <div>
              <p class="text-xl font-semibold text-gray-800 dark:text-gray-100">{{suitableFoods}}</p>
            </div>
          </div>
        </div>






      </div>

      <div class="flex flex-row justify-center">
        <div style="position: relative; height: 400px; width: 100%;">
          <canvas ref="chartRef"></canvas>
        </div>
        <div style="position: relative; height: 400px; width: 100%;">
          <canvas ref="chartRef2"></canvas>
        </div>

      </div>

    </div>
</template>

