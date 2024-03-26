<script setup>
import { computed } from 'vue'
import { checkCell } from '@/utils/useGameplay'
import UIIcon from './UIIcon.vue'

const props = defineProps({
  item: { type: Object, default: null },
  index: { type: Number, default: null },
})

const showCell = computed(() => props.item.show)
const isBomb = computed(() => props.item.count > 8)
const textColor = computed(() => {
  const colors = {
    1: 'text-blue-700',
    2: 'text-green-700',
    3: 'text-red-600',
    4: 'text-purple-900',
    5: 'text-amber-900',
    6: 'text-black',
  }
  return props.item.count ? colors[props.item.count] : ''
})
</script>

<template>
  <div
    class="relative size-6 border border-gray-200 cursor-default"
    @click="checkCell(item, index)"
  >
    <div
      v-if="!showCell"
      class="absolute size-full bg-gray-400 hover:bg-gray-300 cursor-pointer"
    />
    <div
      class="size-full grid place-items-center"
      :class="isBomb ? 'bg-gray-300' : 'bg-gray-300'"
    >
      <UIIcon
        v-if="isBomb"
        icon="bomb"
        class="leading-none text-base text-red-900"
      />
      <span
        v-else
        class="leading-none font-bold text-base"
        :class="textColor"
        >{{ item.count || '' }}</span
      >
    </div>
  </div>
</template>
