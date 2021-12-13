<template>
  <p class="msg">Please add a note</p>

  <form @submit.prevent="handleAdd" class="login-register-form">
    <input
      type="text"
      maxlength="45"
      v-model="title"
      name="title"
      id="title"
      placeholder="title"
      required
    />
    <!-- <textarea
      name="note"
      maxlength="150"
      size="150"
      v-model="note"
      id="note"
      cols="30"
      rows="10"
      placeholder="type..."
      required
    ></textarea> -->
    <QuillEditor theme="snow" contentType="html" v-model:content="note" placeholder="type here within 150 characters..." id="quill"/>
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
      const newNote = note.value.slice(0, 150);
      const addnote = {
        title: title.value,
        // note: note.value.ops[0].insert,
        note: newNote,
      };
      service.addNote(addnote).then(() => {
        // console.log(res);
        route.push({ name: "Home" });
      });
      console.log(addnote);
    };

    return { handleAdd, title, note };
  },
};
</script>

<style></style>
