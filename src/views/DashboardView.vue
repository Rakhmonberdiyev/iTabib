<script lang="ts" setup>


import {computed, ref} from "vue";
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




</script>

<template>
    <div class="p-4    rounded-lg dark:border-gray-700">
      <div class="text-2xl text-center mb-6 font-semibold text-gray-700 dark:text-gray-200">
        Get Your overall health suggestions
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4">

<!--        card for showing weather-->
        <div class=" dark:bg-gray-800 rounded-2xl bg-blue-200 shadow-lg p-4 flex flex-col justify-center items-center">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Weather</h2>
          <div class="flex items center justify-between mt-2">
            <div>
              <p class="text-3xl font-semibold text-gray-800 dark:text-gray-100">{{weather?.current.weather.tp}}°C</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Feels like {{weather?.current.weather.tp}}°C</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Humidity: {{suitableClothes}}</p>
            </div>
          </div>
        </div>

        <div class=" dark:bg-gray-800 rounded-2xl bg-blue-200 shadow-lg p-4 flex flex-col justify-center items-center">
          <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Your Nutrients today</h2>
          <div class="flex items center justify-between mt-2">
            <div>
              <p class="text-3xl font-semibold text-gray-800 dark:text-gray-100">{{weather?.current.weather.tp}}°C</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Feels like {{weather?.current.weather.tp}}°C</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Humidity: {{suitableClothes}}</p>
            </div>
          </div>
        </div>






      </div>
    </div>
</template>

