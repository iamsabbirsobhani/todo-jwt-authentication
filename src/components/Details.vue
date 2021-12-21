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
    <el-button class="details-edit-btn" v-if="notes.noteHtml" @click="showEditorTab" type="success"
      >Edit</el-button
    >
    <Editor
      @closeEditor="closeEditor"
      @refreshNotesAfterEditDetails="refreshNotesAfterEditDetails"
      v-if="notes.noteHtml && showEditor"
      :note="notes"
    />
  </div>
</template>

<script>
import { format } from "date-fns";
import Editor from "./Editor.vue";
import { ref } from "@vue/reactivity";
export default {
  props: ["notes"],
  components: { Editor },
  setup(props, context) {
    const showEditor = ref(false);

    const closeDetails = () => {
      context.emit("closeDetails");
    };
    const closeEditor = () => {
      showEditor.value = false;
    };

    const refreshNotesAfterEditDetails = () => {
      context.emit("refreshNotesAfterEditDetails");
    };

    const showEditorTab = () => {
      showEditor.value = true;
    };

    return {
      closeDetails,
      format,
      closeEditor,
      showEditor,
      showEditorTab,
      refreshNotesAfterEditDetails,
    };
  },
};
</script>

<style></style>
