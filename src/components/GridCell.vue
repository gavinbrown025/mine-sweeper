<script setup>
import { computed } from "vue";
import { checkCell } from "@/utils/useGameplay";
import { flagCell, flagMode } from "@/utils/useFlags";
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

const cellClicked = (index, rClick) => {
  if (props.item.show) return;

  if (rClick) {
    if (flagMode.value) return checkCell(index);
    return flagCell(index);
  }

  if (flagMode.value) return flagCell(index);
  if (props.item.flagged) return;
  checkCell(index);
};
</script>

<style scoped>
.border-outset {
  border-style: outset;
}
</style>

<template>
  <div
    class="relative size-6 cursor-default"
    @click="cellClicked(index)"
    @contextmenu.prevent="cellClicked(index, 1)"
  >
  <!-- Initial Cell cover -->
    <div
      v-if="!showCell"
      class="absolute grid place-items-center size-full bg-gray-300 border-2 border-outset hover:bg-gray-300 cursor-pointer"
    >
      <UIIcon
        v-if="isFlagged"
        icon="location_on"
        class="leading-none text-base text-red-600"
      />
    </div>

    <!-- End of Game Show Flagged Cells -->
    <div
      v-if="showCell && isFlagged"
      class="absolute grid place-items-center size-full bg-gray-300 border-2 border-outset hover:bg-gray-300 cursor-pointer"
    >
    <!-- Bomb Flag Correct -->
      <UIIcon
        v-if="isBomb"
        icon="location_on"
        class="leading-none text-base text-red-600"
      />
      <!-- Incorrect Bomb Flag -->
      <UIIcon
        v-else
        icon="location_off"
        class="leading-none text-base text-red-600"
      />
    </div>

    <!-- Revealed Cells  -->
    <div
      class="size-full grid place-items-center border border-white bg-gray-200"
    >
      <UIIcon
        v-if="isBomb"
        icon="bomb"
        class="leading-none text-base text-black fill"
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
