<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { resetGame } from "@/utils/useGameplay";
import { toggleFlagMode, flagMode, availableFlagCount } from "@/utils/useFlags";

import SettingsForm from "./SettingsForm.vue";
import UITimer from "./UITimer.vue";
import UIIcon from "./UIIcon.vue";

const showDropdown = ref(false);
const target = ref(null);
onClickOutside(target, () => (showDropdown.value = false));
</script>

<template>
  <div class="w-full flex gap-4 justify-between items-center text-white">
    <h2 class="text-white py-4 text-2xl">MineLeSweep</h2>
    <div class="flex h-min gap-4">
      <UITimer />
      <button @click="toggleFlagMode()" class="bg-gray-500 p-2 rounded-md flex items-center">
        <UIIcon icon="location_on" :class="{ 'text-red-600': flagMode}" class="!leading-3  "/>
        {{ availableFlagCount }}
      </button>
      <button @click="resetGame()" class="bg-gray-500 p-2 flex items-center rounded-md">
        Reset
      </button>
      <div ref="target" class="relative">
        <button
          @click="showDropdown = !showDropdown"
          class="bg-gray-500 p-2 grid place-items-center rounded-md"
        >
          Settings
        </button>
        <SettingsForm
          v-if="showDropdown"
          class="absolute right-0 top-full z-50"
        />
      </div>
    </div>
  </div>
</template>
