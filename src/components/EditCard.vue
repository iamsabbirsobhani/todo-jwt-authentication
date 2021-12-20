<template>
  <div class="edit-parent">
    <form @submit.prevent="handleUpdate" class="edit-form">
      <input
        ref="noteTitle"
        type="text"
        id="text"
        :value="note.title"
        placeholder="title"
        maxlength="45"
        required
      />
        <!-- :maxlength="note.noteHtml ? 500 : 150" -->
      <textarea
        ref="noteValue"
        name="note"
        size="150"
        id="editArea"
        cols="30"
        placeholder="type..."
        :value="note.note || note.noteHtml"
        required
      ></textarea>
        <!-- :placeholder="
          note.noteHtml
            ? 'type... (within 500 characters)'
            : 'type... (within 150 characters)'
        " -->
      <button>Done</button>
    </form>
  </div>
</template>

<script>
import service from "../services/user.service";
import { ref } from "@vue/reactivity";
export default {
  props: ["note", "id"],
  setup(props, context) {
    const noteTitle = ref(null);
    const noteValue = ref(null);

    const handleUpdate = () => {
      const note = {
        id: props.id,
        title: noteTitle.value.value,
      };
      if (props.note.note) {
        note.note = noteValue.value.value;
      }
      if (props.note.noteHtml) {
        note.note = "";
        note.noteHtml = noteValue.value.value;
      }
      service.update(note).then((res) => {
        if (res.status == 200) {
          context.emit("editDone");
        }
      });
    };

    return { handleUpdate, noteTitle, noteValue };
  },
};
</script>

<style></style>
