<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">My Food Recommendations</h1>

    <!-- Form for Selecting Health Conditions -->
    <form @submit.prevent="generateRecommendations" class="mb-6">
      <label for="health-condition" class="block text-sm font-medium mb-2">
        Select your health conditions:
      </label>
      <select
        v-model="selectedCondition"
        id="health-condition"
        class="p-2 border rounded w-full"
      >
        <option disabled value="">Choose a condition</option>
        <option v-for="condition in conditionOptions" :key="condition" :value="condition">
          {{ condition }}
        </option>
      </select>

      <!-- Add Button for Condition -->
      <button
        type="button"
        @click="addCondition"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Condition
      </button>

      <!-- List of Added Conditions with Input Fields -->
      <div v-for="(condition, index) in selectedConditions" :key="index" class="mt-4">
        <h2 class="text-lg font-semibold mb-2 capitalize">
          {{ condition }} details:
        </h2>

        <!-- Dynamic Inputs for Condition Details -->
        <div v-if="condition === 'obesity'" class="mb-4">
          <label for="weight" class="block text-sm font-medium">Weight (kg):</label>
          <input
            v-model="details[condition].weight"
            id="weight"
            type="number"
            class="p-2 border rounded w-full"
            placeholder="Enter your weight"
          />
        </div>

        <div v-if="condition === 'diabetes'" class="mb-4">
          <label for="blood-sugar" class="block text-sm font-medium">Blood Sugar Level (mg/dL):</label>
          <input
            v-model="details[condition].bloodSugar"
            id="blood-sugar"
            type="number"
            class="p-2 border rounded w-full"
            placeholder="Enter your blood sugar level"
          />
        </div>

        <div v-if="condition === 'high cholesterol'" class="mb-4">
          <label for="ldl" class="block text-sm font-medium">LDL Cholesterol (mg/dL):</label>
          <input
            v-model="details[condition].ldl"
            id="ldl"
            type="number"
            class="p-2 border rounded w-full"
            placeholder="Enter your LDL cholesterol level"
          />
        </div>

        <div v-if="condition === 'high blood pressure'" class="mb-4">
          <label for="bp" class="block text-sm font-medium">Blood Pressure (mmHg):</label>
          <input
            v-model="details[condition].bp"
            id="bp"
            type="text"
            class="p-2 border rounded w-full"
            placeholder="e.g., 120/80"
          />
        </div>
      </div>

      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Get Recommendations
      </button>
    </form>

    <!-- Food Recommendations -->
    <div v-if="recommendations.length" class="bg-gray-100 p-4 rounded">
      <h2 class="text-lg font-semibold mb-2">Recommended Foods:</h2>
      <ul class="list-disc ml-5">
        <li v-for="(food, index) in recommendations" :key="index">
          {{ food.name }}: {{ food.quantity }} grams
        </li>
      </ul>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="text-red-500 mt-4">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

// Health condition options
const conditionOptions = [
  "obesity",
  "diabetes",
  "high cholesterol",
  "high blood pressure",
];

// State
const selectedCondition = ref<string>("");
const selectedConditions = ref<string[]>([]);
const details = reactive<Record<string, any>>({});
const recommendations = ref<{ name: string; quantity: number }[]>([]);
const errorMessage = ref<string>("");

// Health database
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

// Add condition
const addCondition = () => {
  if (selectedCondition.value && !selectedConditions.value.includes(selectedCondition.value)) {
    selectedConditions.value.push(selectedCondition.value);
    details[selectedCondition.value] = {};
    selectedCondition.value = "";
  }
};

// Generate recommendations
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
/* Add custom styles here */

input{
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: .4rem;
  width: 100%;
}
</style>
