<template>
  <form
    class="text-sm flex flex-col gap-2 w-min p-4 pb-6 rounded-md bg-gray-600"
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
</template>

<script setup>
import { resetGame } from '@/utils/useGameplay'
import { bombCount, gridWidth, gridHeight } from '@/utils/useCreateGrid'
import { useStorage } from '@vueuse/core'

const grid = useStorage('grid-layout', { width: 12, height: 20, bombs: 20 })
const setNewGrid = () => {
  gridWidth.value = grid.value.width
  gridHeight.value = grid.value.height
  bombCount.value = grid.value.bombs
  resetGame()
}
</script>

<style scoped>
input {
  @apply text-gray-800 p-1 rounded-md;
}
</style>
