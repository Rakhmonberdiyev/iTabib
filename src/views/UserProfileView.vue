<template>
  <div class="p-4 max-w-3xl mx-auto grid gap-6  bg-white shadow-xl rounded-lg">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">User Profile</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- User Basic Information -->
      <div class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Basic Information</h2>
        <form @submit.prevent="saveBasicInfo" class="space-y-2">

          <div>
            <label for="name" class="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              v-model="basicInfo.name"
              id="name"
              type="text"
              class="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label for="age" class="block text-sm font-medium text-gray-600 mb-1">Age</label>
            <input
              v-model="basicInfo.age"
              id="age"
              type="number"
              class="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              v-model="basicInfo.email"
              id="email"
              type="email"
              class="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              v-model="basicInfo.password"
              id="password"
              type="password"
              class="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-600 mb-1">Address</label>
            <input
              v-model="basicInfo.address"
              id="address"
              type="text"
              class="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Enter your address"
            />
          </div>

          <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
            Save Info
          </button>
        </form>
      </div>

      <!-- Health Limitations -->
      <div class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Health Limitations</h2>
        <form @submit.prevent="addHealthLimitation" class="space-y-4">
          <div>
            <label for="health-limitation" class="block text-sm font-medium text-gray-600 mb-1">Add a Limitation</label>
            <input
              v-model="newHealthLimitation"
              id="health-limitation"
              type="text"
              class="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="e.g., Diabetes, High Blood Pressure"
            />
          </div>

          <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
            Add Limitation
          </button>
        </form>

        <ul class="list-disc ml-6 mt-4 space-y-2 text-gray-700">
          <li v-for="(limitation, index) in healthLimitations" :key="index" class="flex justify-between items-center">
            <span>{{ limitation }}</span>
            <button @click="removeHealthLimitation(index)" class="text-blue-600 hover:underline">Remove</button>
          </li>
        </ul>
      </div>

    </div>

    <!-- Allergies Section (Added in case you want to keep this section) -->
    <div class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h2 class="text-xl font-semibold mb-4 text-gray-700">Allergies</h2>
      <form @submit.prevent="addAllergy" class="space-y-4">
        <div>
          <label for="allergy" class="block text-sm font-medium text-gray-600 mb-1">Add an Allergy</label>
          <input
            v-model="newAllergy"
            id="allergy"
            type="text"
            class="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            placeholder="e.g., Peanuts, Shellfish"
          />
        </div>

        <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
          Add Allergy
        </button>
      </form>

      <ul class="list-disc ml-6 mt-4 space-y-2 text-gray-700">
        <li v-for="(allergy, index) in allergies" :key="index" class="flex justify-between items-center">
          <span>{{ allergy }}</span>
          <button @click="removeAllergy(index)" class="text-blue-600 hover:underline">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// State for basic info
const basicInfo = ref({
  name: "",
  age: 0,
  email: "",
  password: "",
  address: "",
});

// State for health limitations and allergies
const healthLimitations = ref<string[]>([]);
const newHealthLimitation = ref("");
const allergies = ref<string[]>([]);
const newAllergy = ref("");

// Functions for handling health limitations
const addHealthLimitation = () => {
  if (newHealthLimitation.value) {
    healthLimitations.value.push(newHealthLimitation.value);
    newHealthLimitation.value = "";
  }
};

const removeHealthLimitation = (index: number) => {
  healthLimitations.value.splice(index, 1);
};

// Functions for handling allergies
const addAllergy = () => {
  if (newAllergy.value) {
    allergies.value.push(newAllergy.value);
    newAllergy.value = "";
  }
};

const removeAllergy = (index: number) => {
  allergies.value.splice(index, 1);
};

// Function to save basic info
const saveBasicInfo = () => {
  alert("Basic information saved!");
};
</script>

<style scoped>
body {
  background-color: #f3f4f6;
  font-family: 'Inter', sans-serif;
}

h1 {
  color: #1f2937;
}

button {
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}

form input {
  outline: none;
  transition: border-color 0.3s;
}

form input:focus {
  border-color: #3b82f6;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>

