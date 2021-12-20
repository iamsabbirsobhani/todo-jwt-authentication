<template>
  <p class="msg">Please add a note</p>

  <form @submit.prevent="handleAdd" class="login-register-form">
    <input
      type="text"
      maxlength="45"
      v-model="title"
      name="title"
      id="title"
      placeholder="title (within 45 characters)"
      required
    />
    <textarea
      name="note"
      maxlength="150"
      size="150"
      v-model="note"
      id="note"
      cols="30"
      rows="10"
      placeholder="type... (within 150 characters)"
      required
    ></textarea>
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import service from "../services/user.service.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref(null);
    const note = ref(null);
    const route = useRouter();
    const handleAdd = () => {
      const addnote = {
        title: title.value,
        note: note.value,
      };
      service.addNote(addnote).then(() => {
        route.push({ name: "Home" });
      });
    };

    return { handleAdd, title, note };
  },
};
</script>

<style></style>
