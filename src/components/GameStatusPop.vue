<script setup>
import { ref, reactive, watch } from "vue";
import { gameStatus } from "@/utils/useGameplay";
import { formattedTime } from "@/utils/useTimer";

const show = ref(false);

const statusText = reactive({
  win: {
    title: "Safe!",
    text: "You cleaned up all this mess in:",
  },
  loss: {
    title: "Boom!",
    text: "We'll send flowers to your loved ones.",
  },
});

watch(gameStatus, (newStatus) => {
  if (newStatus == "win" || newStatus == "loss") {
    show.value = true;
  }
});
</script>

<template>
  <div
    v-if="show"
    class="absolute z-10 inset-0 bg-black/50 flex items-center justify-center p-6"
    @click.self="show = false"
  >
    <div class="bg-white text-black p-4 rounded shadow-xl">
      <h2 class="text-xl font-semibold mb-2">
        {{ statusText[gameStatus].title }}
      </h2>
      <div>
        <p class="text-sm mb-2">{{ statusText[gameStatus].text }}</p>
        <p v-if="gameStatus == 'win'" class="font-semibold">
          {{ formattedTime }}
        </p>
      </div>
    </div>
  </div>
</template>
