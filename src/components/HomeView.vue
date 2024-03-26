<script setup>
import { onMounted, ref } from 'vue'
import { useStorage, onClickOutside } from '@vueuse/core'
import {
  initializeGrid,
  bombCount,
  gridWidth,
  gridHeight,
} from '@/utils/useCreateGrid'

import GridContainer from './GridContainer.vue'

const showDropdown = ref(false)
const target = ref(null)
onClickOutside(target, () => showDropdown.value = false)

const grid = useStorage('grid-layout', { width: 12, height: 20, bombs: 20 })
onMounted(() => {
  gridWidth.value = grid.value.width
  gridHeight.value = grid.value.height
  bombCount.value = grid.value.bombs
  initializeGrid()
})
const setNewGrid = () => {
  showDropdown.value = false
  gridWidth.value = grid.value.width
  gridHeight.value = grid.value.height
  bombCount.value = grid.value.bombs
}
</script>

<template>
  <div class="grid place-items-center">
    <div class="w-full flex justify-between">
      <h2 class="text-white p-4 text-2xl">MineLeSweep</h2>
      <div class="flex items-center">
        <div ref="target" class="relative text-white">
          <button
            @click="showDropdown = !showDropdown"
            class="bg-gray-500 p-2 rounded-md"
          >
            Settings
          </button>
          <form
            v-if="showDropdown"
            class="text-sm absolute right-0 top-full z-50 flex flex-col gap-2 w-min p-4 pb-6 rounded-md bg-gray-600"
            @submit.prevent="setNewGrid"
          >
            <label for="">Width</label>
            <input type="number" v-model="grid.width" />
            <label for="">Height</label>
            <input type="number" v-model="grid.height" />
            <label for="">Bombs</label>
            <input type="number" v-model="grid.bombs" />
            <button type="submit" class="w-min p-2 bg-gray-500 rounded-md mt-1">
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
    <GridContainer />
  </div>
</template>

<style scoped>
input {
  @apply text-gray-800 p-1 rounded-md;
}
</style>
