<script setup>
import { computed } from "vue";
import { checkCell, flagCell } from "@/utils/useGameplay";
import UIIcon from "./UIIcon.vue";

const props = defineProps({
  item: { type: Object, default: null },
  index: { type: Number, default: null },
});

const showCell = computed(() => props.item.show);
const isBomb = computed(() => props.item.count > 8);
const isFlagged = computed(() => props.item.flagged);


const textColor = computed(() => {
  const colors = {
    1: "text-blue-700",
    2: "text-green-700",
    3: "text-red-600",
    4: "text-purple-900",
    5: "text-amber-900",
    6: "text-black",
  };
  return props.item.count ? colors[props.item.count] : "";
});


</script>

<style scoped>
.border-outset {
  border-style: outset;
}
</style>

<template>
  <div class="relative size-6 cursor-default" @click="checkCell(index)" @contextmenu.prevent="flagCell(index)" >
    <div
      v-if="!showCell"
      class="absolute grid place-items-center size-full bg-gray-300 border-2 border-outset hover:bg-gray-300 cursor-pointer"
    >
      <UIIcon
        v-if="isFlagged"
        icon="flag"
        class="leading-none text-base text-red-600"
      />
    </div>
    <div
      class="size-full grid place-items-center border border-white bg-gray-200"
    >
      <UIIcon
        v-if="isBomb"
        icon="bomb"
        class="leading-none text-base text-black"
      />
      <span
        v-else
        class="leading-none font-bold text-base"
        :class="textColor"
        >{{ item.count || "" }}</span
      >
    </div>
  </div>
</template>
