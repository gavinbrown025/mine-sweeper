<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { resetGame } from "@/utils/useGameplay";
import { toggleFlagMode, flagMode, availableFlagCount } from "@/utils/useFlags";

import UITimer from "./UITimer.vue";
import UIIcon from "./UIIcon.vue";
import UIButton from "./UIButton.vue";

const showDropdown = ref(false);
const target = ref(null);
onClickOutside(target, () => (showDropdown.value = false));
</script>

<template>
  <div class="w-full flex gap-4 justify-between items-center text-white">
    <h2 class="text-white py-4 text-2xl">Boom Broom</h2>
    <div class="flex h-min gap-4">
      <UITimer />
      <UIButton
      @click="toggleFlagMode()"
      class="bg-gray-500 p-2 rounded-md flex items-center hover:bg-gray-400"
      >
      <UIIcon
      icon="location_on"
      :class="{ 'text-red-600': flagMode }"
      class="!leading-3"
      />
      {{ availableFlagCount }}
    </UIButton>
    <UIButton
      @click="resetGame()"
      class="bg-gray-500 p-2 flex items-center rounded-md hover:bg-gray-400"
    >
      <UIIcon icon="refresh" class="!leading-3" />
    </UIButton>
    </div>
  </div>
</template>
