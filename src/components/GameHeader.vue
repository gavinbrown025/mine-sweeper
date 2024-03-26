<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { resetGame } from '@/utils/useGameplay'
import SettingsForm from './SettingsForm.vue'

const showDropdown = ref(false)
const target = ref(null)
onClickOutside(target, () => (showDropdown.value = false))
</script>

<template>
  <div class="w-full flex justify-between text-white">
    <h2 class="text-white py-4 text-2xl">MineLeSweep</h2>
    <div class="flex items-center gap-4">
      <button @click="resetGame()" class="bg-gray-500 p-2 rounded-md">
        Reset
      </button>
      <div ref="target" class="relative">
        <button
          @click="showDropdown = !showDropdown"
          class="bg-gray-500 p-2 rounded-md"
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
