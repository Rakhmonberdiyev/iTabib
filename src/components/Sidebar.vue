<script setup lang="ts">

import IconDashboard from "@/assets/icons/IconDashboard.vue";
import IconAirquality from "@/assets/icons/IconAirquality.vue";
import IconMyFoods from "@/assets/icons/IconMyFoods.vue";
import IconCalculator from "@/assets/icons/IconCalculator.vue";
import IconUser from "@/assets/icons/IconUser.vue";
import {computed} from "vue";
import {useRouter} from "vue-router";


const router = useRouter();
const activeRoute = computed(() => router.currentRoute.value.fullPath);
console.log(activeRoute.value == '/dashboard');

// log in every 3 seconds setinterval

setInterval(() => {
  console.log(router.currentRoute.value.fullPath);
}, 3000);





</script>

<template>

  <button  data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
  </button>
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64  h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar"  >
    <div class="h-full px-3 py-4 overflow-y-auto  shadow-purple-500 text-white dark:bg-gray-800 flex flex-col justify-between">
     <div>


      <img src="@/assets/icons/Frame%20115.png" alt="logo" class=" mx-auto mb-4"/>
      <ul class="space-y-2 font-medium">

        <li>
          <router-link to="/dashboard" :class="activeRoute == '/dashboard' ? 'bg-blue-600' : ''" class="flex items-center    rounded-2xl p-3 dark:text-white hover:bg-blue-700 dark:hover:bg-gray-700 group">
            <IconDashboard/>
            <span class="ms-3">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/air-quality"  :class="activeRoute == '/air-quality' ? 'bg-blue-600 ' : ''" class="flex items-center   rounded-2xl p-3 dark:text-white  hover:bg-blue-700 dark:hover:bg-gray-700 group">
            <IconAirquality/>
            <span class="flex-1 ms-3 whitespace-nowrap">Air Quality</span>
            <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-100 bg-red-500 rounded-full dark:bg-blue-900 dark:text-blue-300">178</span>
          </router-link>
        </li>
        <li>
          <router-link to="/my-foods" :class="activeRoute == '/my-foods' ? 'bg-blue-600 ' : ''" class="flex items-center rounded-2xl p-3 dark:text-white  hover:bg-blue-700 dark:hover:bg-gray-700 group">
            <IconMyFoods/>
            <span class="flex-1 ms-3 whitespace-nowrap">My foods</span>
          </router-link>
        </li>
        <li>
          <router-link to="/calculator" :class="activeRoute == '/calculator' ? 'bg-blue-600 ' : ''" class="flex items-center rounded-2xl p-3 dark:text-white  hover:bg-blue-700 dark:hover:bg-gray-700 group">
            <IconCalculator/>
            <span class="flex-1 ms-3 whitespace-nowrap">Calculator</span>
          </router-link>
        </li>

      </ul>
     </div>
      <div>
        <router-link to="/user-profile"  :class="activeRoute == '/user-profile' ? 'bg-blue-600 ' : ''" class="flex items-center rounded-2xl p-3 dark:text-white  hover:bg-blue-700 dark:hover:bg-gray-700 group">
          <IconUser/>
          <span class="ms-3">Farxod Qarshiyev</span>
        </router-link>
      </div>
    </div>
  </aside>

</template>

<style scoped>
.overflow-y-auto{
  background-color: #80D0C7;
  background-image: linear-gradient(160deg, #80D0C7 0%, #0093E9 1%);
}

</style>
