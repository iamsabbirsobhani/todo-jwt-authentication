<template>
  <div class="edit-parent">
    <form @submit.prevent="handleUpdate" class="edit-form">
      <input
        ref="noteTitle"
        type="text"
        id="text"
        :value="note.title"
        placeholder="title"
        required
      />
      <textarea
        ref="noteValue"
        name="note"
        maxlength="150"
        size="150"
        id="editArea"
        cols="30"
        placeholder="type..."
        :value="note.note"
        required
      ></textarea>
      <button>Done</button>
    </form>
  </div>
</template>

<script>
import service from '../services/user.service';
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
        note: noteValue.value.value,
      };
      service.update(note).then(() => {
        //   console.log(res);
      });
        context.emit('editDone');
    };

    return { handleUpdate, noteTitle, noteValue };
  },
};
</script>

<style></style>
