<template>
  <div class="important">
      <Posts :pag="false" :allnotes="true" :imp="true"/>
  </div>
</template>

<script setup>
import Posts from '../components/Posts.vue'
</script>

<style>

</style>