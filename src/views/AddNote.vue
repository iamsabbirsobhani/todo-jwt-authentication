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
      <!-- :maxlength="form == 'HTML' ? 500 : 500" -->
    <textarea
      v-if="form == 'Raw'"
      name="note"
      size="150"
      v-model="note"
      id="note"
      cols="30"
      rows="10"
      placeholder="type..."
      required
    ></textarea>
      <!-- :placeholder="
        form == 'HTML'
          ? 'type... (within 500 characters)'
          : 'type... (within 150 characters)'
      " -->
    <QuillEditor
      v-else
      theme="snow"
      contentType="html"
      toolbar="full"
      v-model:content="note"
      placeholder="type here within 500 characters..."
      id="quill"
    />
    <div>
      <el-radio-group v-model="form" fill="#599EFF" text-color="#4ade80">
        <el-radio label="Raw"></el-radio>
        <el-radio label="HTML"></el-radio>
      </el-radio-group>
    </div>
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
    const form = ref("Raw");
    const route = useRouter();
    const handleAdd = () => {
      const addnote = {
        title: title.value,
      };
      if (form.value == "Raw") {
        addnote.note = note.value;
      }
      if (form.value == "HTML") {
        addnote.note = "";
        addnote.noteHtml = note.value;
      }
      service.addNote(addnote).then(() => {
        route.push({ name: "Home" });
      });
    };

    return { handleAdd, title, note, form };
  },
};
</script>

<style lang="scss"></style>
