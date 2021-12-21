<template>
  <div class="details-card">
    <div id="navbarDetails">
      <h1>Note: #{{ notes.id }}</h1>
      <button @click="closeDetails" id="closeButton">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div v-if="notes && notes.note" id="detailsPost">
      <div>
        <h1>{{ notes.title }}</h1>
        <p>{{ notes.note }}</p>
      </div>
      <div class="details">
        <p>By: {{ notes.user.name }}</p>
        <p>Email: {{ notes.user.email }}</p>
        <p>Created: {{ format(new Date(notes.createdAt), "PPPpp") }}</p>
        <p>Updated: {{ format(new Date(notes.updatedAt), "PPPpp") }}</p>
      </div>
    </div>
    <div v-if="notes && notes.noteHtml" id="detailsPost">
      <div>
        <h1>{{ notes.title }}</h1>
        <p v-html="notes.noteHtml"></p>
      </div>
      <div class="details">
        <p>By: {{ notes.user.name }}</p>
        <p>Email: {{ notes.user.email }}</p>
        <p>Created: {{ format(new Date(notes.createdAt), "PPPpp") }}</p>
        <p>Updated: {{ format(new Date(notes.updatedAt), "PPPpp") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: ["notes"],
  setup(props, context) {
    const closeDetails = () => {
      context.emit("closeDetails");
    };
    return { closeDetails, format };
  },
};
</script>

<style></style>
