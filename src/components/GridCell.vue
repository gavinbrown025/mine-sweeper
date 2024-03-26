<script setup>
import { computed } from 'vue'
import { gridSet, startedGame, setBombLocations } from '@/utils/useCreateGrid'

const props = defineProps({
  item: { type: Object, default: null },
  index: { type: Number, default: null },
})

const showCell = computed(() => gridSet.value[props.index].show)
const isBomb = computed(() => props.item.count > 8)

const showSurrounding = (cellIndex, adjacentBlanks) => {
  if (adjacentBlanks.has(cellIndex) || !gridSet.value[cellIndex]) return
  adjacentBlanks.add(cellIndex)

  gridSet.value[cellIndex].surroundings.forEach((surrounding) => {
    if (surrounding.count == 0) {
      return showSurrounding(surrounding.index, adjacentBlanks)
    }
    adjacentBlanks.add(surrounding.index)
  })
}

const checkCell = () => {
  const i = props.index
  if (!startedGame.value) setBombLocations(i)
  gridSet.value[i].show = true
  // if cell is blank check show surroundings except bombs
  // if any surroundings do the same for them
  if (!props.item.count) {
    const adjacentBlanks = new Set()
    showSurrounding(i, adjacentBlanks)
    adjacentBlanks.forEach((idx) => (gridSet.value[idx].show = true))
  }
}
</script>

<template>
  <div
    id="cover"
    class="relative size-8 border-collapse border cursor-default"
    @click="checkCell"
  >
    <div
      v-if="!showCell"
      class="absolute size-full bg-green-500 hover:bg-green-300 cursor-pointer"
    />
    <div
      class="size-full grid place-items-center"
      :class="isBomb ? 'bg-red-400' : 'bg-blue-400'"
    >
      <span class="leading-none font-bold">{{
        isBomb ? 'X' : props.item.count || ''
      }}</span>
    </div>
  </div>
</template>
