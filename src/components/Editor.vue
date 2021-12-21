<template>
  <div class="component-editor">
    <div id="navbarDetails">
      <h1>Note: #{{note.id}}</h1>
      <button @click="closeEditor" id="closeButton">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <form @submit.prevent="handleEdit" class="details-editor">
      <input
        ref="noteTitle"
        type="text"
        id="text"
        placeholder="title"
        maxlength="45"
        :value="note.title"
        required
      />
      <QuillEditor
        theme="snow"
        contentType="html"
        toolbar="full"
        placeholder="type here..."
        id="quill"
        v-model:content="noteValue"
      />
      <el-button class="details-edit-btn-submit" native-type="submit" type="primary">Submit</el-button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import service from "../services/user.service";

export default {
  props: ["note"],
  setup(props, context) {
    const noteTitle = ref(null);
    const noteValue = ref(props.note.noteHtml);
    const closeEditor = () => {
      context.emit("closeEditor");
    };

    const handleEdit = () => {
      const note = {
        id: props.note.id,
        title: noteTitle.value.value,
        noteHtml: noteValue.value,
      };
      service.update(note).then((res) => {
        if (res.status == 200) {
          context.emit("closeEditor");
          context.emit("refreshNotesAfterEditDetails");
        }
      });
    };

    return { closeEditor, handleEdit, noteTitle, noteValue };
  },
};
</script>

<style></style>
