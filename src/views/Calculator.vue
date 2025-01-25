<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">Food Nutrition Calculator</h1>

    <div class="mb-4">
      <label for="food" class="block text-sm font-medium">Food Item:</label>
      <input
        v-model="foodName"
        id="food"
        type="text"
        class="mt-1 p-2 border rounded w-full"
        placeholder="Enter food name (e.g., apple)"
      />

      <label for="quantity" class="block text-sm font-medium mt-4">Quantity (grams):</label>
      <input
        v-model.number="foodQuantity"
        id="quantity"
        type="number"
        class="mt-1 p-2 border rounded w-full"
        placeholder="Enter quantity in grams"
      />

      <button
        @click="addFood"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Food
      </button>
    </div>

    <div v-if="foodItems.length" class="mb-6">
      <h2 class="text-lg font-semibold">Selected Foods:</h2>
      <ul class="list-disc ml-5">
        <li v-for="(item, index) in foodItems" :key="index">
          {{ item.name }} - {{ item.quantity }}g
          <button @click="removeFood(index)" class="ml-2 text-red-500">Remove</button>
        </li>
      </ul>
    </div>

    <div v-if="totalNutrition.calories > 0" class="bg-gray-100 p-4 rounded">
      <h2 class="text-lg font-semibold">Total Nutrition:</h2>
      <ul class="list-disc ml-5">
        <li>Calories: {{ totalNutrition.calories.toFixed(2) }}</li>
        <li>Protein: {{ totalNutrition.protein.toFixed(2) }}g</li>
        <li>Fat: {{ totalNutrition.fat.toFixed(2) }}g</li>
        <li>Carbohydrates: {{ totalNutrition.carbohydrates.toFixed(2) }}g</li>
        <li>Fiber: {{ totalNutrition.fiber.toFixed(2) }}g</li>
      </ul>
    </div>

    <div v-if="errorMessage" class="text-red-500 mt-4">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";

// Define types for food item and nutrient totals
interface FoodItem {
  name: string;
  quantity: number; // in grams
}

interface NutrientTotals {
  calories: number;
  protein: number; // in grams
  fat: number; // in grams
  carbohydrates: number; // in grams
  fiber: number; // in grams
}

// Predefined food database
const FOOD_DATABASE: Record<string, NutrientTotals> = {
  apple: { calories: 52, protein: 0.3, fat: 0.2, carbohydrates: 14, fiber: 2.4 },
  banana: { calories: 96, protein: 1.3, fat: 0.3, carbohydrates: 27, fiber: 2.6 },
  orange: { calories: 47, protein: 0.9, fat: 0.1, carbohydrates: 12, fiber: 2.4 },
  grapes: { calories: 69, protein: 0.7, fat: 0.2, carbohydrates: 18, fiber: 0.9 },
  watermelon: { calories: 30, protein: 0.6, fat: 0.2, carbohydrates: 8, fiber: 0.4 },
  pineapple: { calories: 50, protein: 0.5, fat: 0.1, carbohydrates: 13, fiber: 1.4 },
  mango: { calories: 60, protein: 0.8, fat: 0.4, carbohydrates: 15, fiber: 1.6 },
  strawberries: { calories: 32, protein: 0.7, fat: 0.3, carbohydrates: 8, fiber: 2 },
  blueberries: { calories: 57, protein: 0.7, fat: 0.3, carbohydrates: 14, fiber: 2.4 },
  raspberries: { calories: 52, protein: 1.2, fat: 0.7, carbohydrates: 12, fiber: 6.5 },
  pear: { calories: 57, protein: 0.4, fat: 0.1, carbohydrates: 15, fiber: 3.1 },
  peach: { calories: 39, protein: 0.9, fat: 0.3, carbohydrates: 10, fiber: 1.5 },
  avocado: { calories: 160, protein: 2, fat: 15, carbohydrates: 9, fiber: 7 },
  tomato: { calories: 18, protein: 0.9, fat: 0.2, carbohydrates: 4, fiber: 1.2 },
  cucumber: { calories: 15, protein: 0.6, fat: 0.1, carbohydrates: 4, fiber: 0.5 },
  lettuce: { calories: 15, protein: 1.4, fat: 0.2, carbohydrates: 3, fiber: 1.3 },
  spinach: { calories: 23, protein: 2.9, fat: 0.4, carbohydrates: 4, fiber: 2.2 },
  kale: { calories: 49, protein: 4.3, fat: 0.9, carbohydrates: 9, fiber: 3.6 },
  carrot: { calories: 41, protein: 0.9, fat: 0.2, carbohydrates: 10, fiber: 2.8 },
  broccoli: { calories: 55, protein: 3.7, fat: 0.6, carbohydrates: 11, fiber: 3.8 },
  cauliflower: { calories: 25, protein: 2, fat: 0.3, carbohydrates: 5, fiber: 2 },
  potato: { calories: 77, protein: 2, fat: 0.1, carbohydrates: 17, fiber: 2.2 },
  sweet_potato: { calories: 86, protein: 1.6, fat: 0.1, carbohydrates: 20, fiber: 3 },
  bell_pepper: { calories: 31, protein: 1, fat: 0.3, carbohydrates: 6, fiber: 2.1 },
  onion: { calories: 40, protein: 1.1, fat: 0.1, carbohydrates: 9, fiber: 1.7 },
  garlic: { calories: 149, protein: 6.4, fat: 0.5, carbohydrates: 33, fiber: 2.1 },
  zucchini: { calories: 17, protein: 1.2, fat: 0.3, carbohydrates: 3, fiber: 1 },
  eggplant: { calories: 25, protein: 1, fat: 0.2, carbohydrates: 6, fiber: 3 },
  "green beans": { calories: 31, protein: 2, fat: 0.1, carbohydrates: 7, fiber: 2.7 },
  peas: { calories: 81, protein: 5.4, fat: 0.4, carbohydrates: 14, fiber: 5.7 },
  corn: { calories: 86, protein: 3.3, fat: 1.2, carbohydrates: 19, fiber: 2.7 },
  "chicken breast": { calories: 165, protein: 31, fat: 3.6, carbohydrates: 0, fiber: 0 },
  "turkey breast": { calories: 135, protein: 30, fat: 1, carbohydrates: 0, fiber: 0 },
  salmon: { calories: 208, protein: 20, fat: 13, carbohydrates: 0, fiber: 0 },
  tuna: { calories: 132, protein: 29, fat: 0.6, carbohydrates: 0, fiber: 0 },
  shrimp: { calories: 99, protein: 24, fat: 0.3, carbohydrates: 0.2, fiber: 0 },
  beef: { calories: 250, protein: 26, fat: 17, carbohydrates: 0, fiber: 0 },
  pork: { calories: 242, protein: 27, fat: 14, carbohydrates: 0, fiber: 0 },
  eggs: { calories: 155, protein: 13, fat: 11, carbohydrates: 1.1, fiber: 0 },
  milk: { calories: 42, protein: 3.4, fat: 1, carbohydrates: 5, fiber: 0 },
  yogurt: { calories: 59, protein: 10, fat: 0.4, carbohydrates: 3.6, fiber: 0 },
  "cheddar cheese": { calories: 402, protein: 25, fat: 33, carbohydrates: 1.3, fiber: 0 },
  almonds: { calories: 579, protein: 21, fat: 50, carbohydrates: 22, fiber: 12.5 },
  peanuts: { calories: 567, protein: 25, fat: 49, carbohydrates: 16, fiber: 8.5 },
  walnuts: { calories: 654, protein: 15, fat: 65, carbohydrates: 14, fiber: 6.7 },
  cashews: { calories: 553, protein: 18, fat: 44, carbohydrates: 30, fiber: 3.3 },
  quinoa: { calories: 120, protein: 4.1, fat: 1.9, carbohydrates: 21, fiber: 2.8 },
  oatmeal: { calories: 68, protein: 2.4, fat: 1.4, carbohydrates: 12, fiber: 1.7 },
  bread: { calories: 265, protein: 9, fat: 3.2, carbohydrates: 49, fiber: 2.7 },
  pasta: { calories: 131, protein: 5, fat: 1.1, carbohydrates: 25, fiber: 1.4 },
  rice: { calories: 130, protein: 2.7, fat: 0.3, carbohydrates: 28, fiber: 0.4 },
  lentils: { calories: 116, protein: 9, fat: 0.4, carbohydrates: 20, fiber: 7.9 },
  chickpeas: { calories: 164, protein: 8.9, fat: 2.6, carbohydrates: 27, fiber: 7.6 },
  black_beans: { calories: 132, protein: 8.9, fat: 0.5, carbohydrates: 24, fiber: 8.7 },
  potato: { calories: 77, protein: 2, fat: 0.1, carbohydrates: 17, fiber: 2.2 },
  "sweet potato": { calories: 86, protein: 1.6, fat: 0.1, carbohydrates: 20, fiber: 3 },
  fish: { calories: 206, protein: 20, fat: 13, carbohydrates: 0, fiber: 0 },
};

// Reactive variables and state
const foodName = ref<string>("");
const foodQuantity = ref<number>(0);
const foodItems = reactive<FoodItem[]>([]);
const errorMessage = ref<string>("");

// Computed property for total nutrition
const totalNutrition = computed<NutrientTotals>(() => {
  return foodItems.reduce(
    (total, item) => {
      const foodData = FOOD_DATABASE[item.name];
      if (foodData) {
        const multiplier = item.quantity / 100;

        total.calories += foodData.calories * multiplier;
        total.protein += foodData.protein * multiplier;
        total.fat += foodData.fat * multiplier;
        total.carbohydrates += foodData.carbohydrates * multiplier;
        total.fiber += foodData.fiber * multiplier;
      }
      return total;
    },
    {
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
      fiber: 0,
    } as NutrientTotals
  );
});

// Add a new food item
const addFood = () => {
  errorMessage.value = "";

  if (!foodName.value || foodQuantity.value <= 0) {
    errorMessage.value = "Please enter valid food name and quantity.";
    return;
  }

  if (!FOOD_DATABASE[foodName.value.toLowerCase()]) {
    errorMessage.value = `Food item "${foodName.value}" is not in the database.`;
    return;
  }

  foodItems.push({
    name: foodName.value.toLowerCase(),
    quantity: foodQuantity.value,
  });

  foodName.value = "";
  foodQuantity.value = 0;
};

// Remove a food item
const removeFood = (index: number) => {
  foodItems.splice(index, 1);
};
</script>

<style scoped>
/* Add custom styles here */
</style>
