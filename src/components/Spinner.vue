<template>
  <div v-if="!timeOut" class="spinner">
    ({{ countDown }}) Loading... {{ countDowns }}
  </div>
  <div v-else class="error">Timeout please reload again.</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const countDown = ref(null);
const timeOut = ref(false);
onMounted(() => {
  countDown.value = Math.round(Math.random() * 5) + 45;
  let stopCount = setInterval(() => {
    timeOut.value = false;
    countDown.value--;
    if (countDown.value < 0) {
      timeOut.value = true;
      clearInterval(stopCount);
    }
  }, 800);
});
</script>

<style lang="scss" scoped></style>
