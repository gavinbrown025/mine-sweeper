<template>
  <UIButton
    type="button"
    :class="[
      'px-1 py-[3px] rounded-md border-2 !text-xs ',
      selected ? 'border-white' : 'border-gray-500',
    ]"
    @click="setValue"
  >
    <slot />
  </UIButton>
</template>

<script setup>
import { computed, defineModel } from "vue";

import UIButton from "./UIButton.vue";

const props = defineProps({ value: [String, Number, Object] });
const model = defineModel();

const setValue = () => (model.value = props.value);

const selected = computed(() => model.value === props.value);
</script>
