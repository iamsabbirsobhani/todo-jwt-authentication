<template>
  <div class="home">
    <Posts :pag="true" :imp="false" />
  </div>
</template>

<script setup>
import Posts from '../components/Posts.vue'
</script>
