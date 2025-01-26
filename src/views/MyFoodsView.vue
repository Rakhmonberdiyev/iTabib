<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-700">
      My Food Recommendations
    </h1>

    <!-- Form for Selecting Health Conditions -->
    <form @submit.prevent="generateRecommendations" class="grid gap-6">
      <div>
        <label for="health-condition" class="block text-lg font-medium mb-2 text-gray-600">
          Select your health conditions:
        </label>
        <div class="flex gap-4">
          <select
            v-model="selectedCondition"
            id="health-condition"
            class="p-2 border rounded w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option disabled value="">Choose a condition</option>
            <option v-for="condition in conditionOptions" :key="condition" :value="condition">
              {{ condition }}
            </option>
          </select>
          <button
            type="button"
            @click="addCondition"
            class="px-4 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
          >
            Add Condition
          </button>
        </div>
      </div>

      <!-- List of Added Conditions with Input Fields -->
      <div
        v-for="(condition, index) in selectedConditions"
        :key="index"
        class="grid gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
      >
        <h2 class="text-xl font-semibold capitalize text-gray-700">
          {{ condition }} Details
        </h2>
        <div v-if="condition === 'obesity'" class="grid gap-2">
          <label for="weight" class="block text-sm font-medium text-gray-600">Weight (kg):</label>
          <input
            v-model="details[condition].weight"
            id="weight"
            type="number"
            class="p-3 border rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your weight"
          />
        </div>
        <div v-if="condition === 'diabetes'" class="grid gap-2">
          <label for="blood-sugar" class="block text-sm font-medium text-gray-600">Blood Sugar Level (mg/dL):</label>
          <input
            v-model="details[condition].bloodSugar"
            id="blood-sugar"
            type="number"
            class="p-3 border rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your blood sugar level"
          />
        </div>
        <div v-if="condition === 'high cholesterol'" class="grid gap-2">
          <label for="ldl" class="block text-sm font-medium text-gray-600">LDL Cholesterol (mg/dL):</label>
          <input
            v-model="details[condition].ldl"
            id="ldl"
            type="number"
            class="p-3 border rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your LDL cholesterol level"
          />
        </div>
        <div v-if="condition === 'high blood pressure'" class="grid gap-2">
          <label for="bp" class="block text-sm font-medium text-gray-600">Blood Pressure (mmHg):</label>
          <input
            v-model="details[condition].bp"
            id="bp"
            type="text"
            class="p-3 border rounded w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., 120/80"
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full px-4 py-3 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-300"
      >
        Get Recommendations
      </button>
    </form>

    <!-- Food Recommendations -->
    <div v-if="recommendations.length" class="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-700">Recommended Foods:</h2>
      <ul class="list-disc ml-5 grid gap-2">
        <li v-for="(food, index) in recommendations" :key="index" class="text-gray-600">
          <span class="font-medium text-gray-800">{{ food.name }}</span>: {{ food.quantity }} grams
        </li>
      </ul>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="text-red-500 mt-4 text-center">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const conditionOptions = [
  "obesity",
  "diabetes",
  "high cholesterol",
  "high blood pressure",
];

const selectedCondition = ref<string>("");
const selectedConditions = ref<string[]>([]);
const details = reactive<Record<string, any>>({});
const recommendations = ref<{ name: string; quantity: number }[]>([]);
const errorMessage = ref<string>("");

const HEALTH_DATABASE: Record<
  string,
  (details?: Record<string, any>) => { name: string; quantity: number }[]
> = {
  obesity: (details) => {
    if (details?.weight >= 100) {
      return [
        { name: "spinach", quantity: 150 },
        { name: "broccoli", quantity: 120 },
        { name: "zucchini", quantity: 200 },
      ];
    } else if (details?.weight >= 80) {
      return [
        { name: "carrots", quantity: 150 },
        { name: "lettuce", quantity: 100 },
        { name: "quinoa", quantity: 50 },
      ];
    }
    return [
      { name: "salmon", quantity: 120 },
      { name: "green beans", quantity: 100 },
      { name: "avocado", quantity: 70 },
    ];
  },
  diabetes: (details) => {
    if (details?.bloodSugar > 180) {
      return [
        { name: "almonds", quantity: 30 },
        { name: "walnuts", quantity: 30 },
        { name: "broccoli", quantity: 100 },
      ];
    }
    return [
      { name: "lentils", quantity: 100 },
      { name: "green beans", quantity: 120 },
      { name: "blueberries", quantity: 50 },
    ];
  },
  "high cholesterol": (details) => {
    if (details?.ldl > 130) {
      return [
        { name: "oatmeal", quantity: 150 },
        { name: "brown rice", quantity: 120 },
        { name: "apple", quantity: 100 },
      ];
    }
    return [
      { name: "green beans", quantity: 100 },
      { name: "spinach", quantity: 120 },
      { name: "avocado", quantity: 70 },
    ];
  },
  "high blood pressure": (details) => {
    if (details?.bp) {
      const [systolic, diastolic] = details.bp.split("/").map(Number);
      if (systolic >= 140 || diastolic >= 90) {
        return [
          { name: "leafy greens", quantity: 150 },
          { name: "beets", quantity: 120 },
          { name: "low-fat yogurt", quantity: 200 },
        ];
      }
    }
    return [
      { name: "leafy greens", quantity: 150 },
      { name: "berries", quantity: 80 },
      { name: "beets", quantity: 100 },
    ];
  },
};

const addCondition = () => {
  if (selectedCondition.value && !selectedConditions.value.includes(selectedCondition.value)) {
    selectedConditions.value.push(selectedCondition.value);
    details[selectedCondition.value] = {};
    selectedCondition.value = "";
  }
};

const generateRecommendations = () => {
  errorMessage.value = "";
  recommendations.value = [];

  if (!selectedConditions.value.length) {
    errorMessage.value = "Please select at least one health condition.";
    return;
  }

  const combinedRecommendations = selectedConditions.value.flatMap((condition) =>
    HEALTH_DATABASE[condition](details[condition])
  );

  recommendations.value = combinedRecommendations.reduce((acc, item) => {
    const existing = acc.find((rec) => rec.name === item.name);
    if (existing) {
      existing.quantity = Math.min(existing.quantity, item.quantity);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
};
</script>

<style scoped>
</style>
