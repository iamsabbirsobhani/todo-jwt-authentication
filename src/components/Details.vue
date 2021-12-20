<template>
  <div class="details-card">
    <div id="navbarDetails">
      <h1>Post id: {{ notes.id }}</h1>
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
        <p>{{ notes.user.name }}</p>
        <p>{{ notes.user.email }}</p>
        <p>{{ notes.createdAt }}</p>
        <p>{{ notes.updatedAt }}</p>
      </div>
    </div>
    <div v-if="notes && notes.noteHtml" id="detailsPost">
      <div>
        <h1>{{ notes.title }}</h1>
        <p v-html="notes.noteHtml"></p>
      </div>
      <div class="details">
        <p>Post id: {{ notes.id }}</p>
        <p>{{ notes.user.name }}</p>
        <p>{{ notes.user.email }}</p>
        <p>{{ format(new Date(notes.createdAt), 'PPPppp') }}</p>
        <p>{{ format(new Date(notes.updatedAt), 'PPPppp') }}</p>
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
