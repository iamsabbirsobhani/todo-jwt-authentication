<template>
  <div class="home">
    <div class="parent-card">
      <div v-for="note in notes" :key="note.id">
        <div class="card">
          <div class="options">
            <div class="right-options">
              <input
                v-if="disable"
                type="checkbox"
                name="done"
                :id="note.id"
                @click="handleDone(note.id, note.done)"
                v-model="note.done"
                disabled
              />
              <input
                v-else
                type="checkbox"
                name="done"
                :id="note.id"
                @click="handleDone(note.id, note.done)"
                v-model="note.done"
              />
              <div class="option-button">
                <button @click="handleDelete(note.id)">
                  <i class="done-icon far fa-trash-alt"></i>
                </button>
                <button><i class="fas fa-edit"></i></button>
                <button @click="showInfo(note.id)">
                  <i class="fas fa-info-circle"></i>
                </button>
              </div>
            </div>
            <div v-if="note.done" class="note-done">
              <i class="fas fa-check-circle"></i>
            </div>
          </div>

          <div v-if="info.isShow && info.id == note.id" class="info">
            <p>{{ format(new Date(note.createdAt), "PPp") }}</p>
            <p>By {{ note.user.name }}</p>
          </div>

          <div v-else>
            <h1>{{ note.title }}</h1>
            <p>{{ note.note }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from "@vue/runtime-core";
import service from "../services/user.service.js";
import { format } from "date-fns";
export default {
  name: "Home",
  setup() {
    const notes = ref(null);
    const done = ref();
    const disable = ref(false);
    const info = ref({ isShow: false, id: null });
    const getNotes = () => {
      service.getNotes().then((res) => {
        notes.value = res;
      });
    };

    const handleDone = (noteId, status) => {
      done.value = !status;
      disable.value = true;
      console.log(done.value, noteId);

      let note = {
        id: noteId,
        done: done.value,
      };
      service.isNoteDone(note).then((res) => {
        console.log(res);
      });

      // getNotes();
      note = null;
      disable.value = false;
    };

    const handleDelete = (noteId) => {
      let notes = {
        id: noteId,
      };
      service.deleteNote(notes);
      getNotes();
      notes = null;
    };

    onMounted(() => {
      getNotes();
    });

    const noteid = ref(null);
    const showInfo = (id) => {
      if (id === noteid.value) {
        info.value.isShow = !info.value.isShow;
        info.value.id = id;
      } else {
        info.value.isShow = true;
        info.value.id = id;
      }

      noteid.value = id;
    };

    return {
      notes,
      done,
      handleDone,
      disable,
      handleDelete,
      format,
      showInfo,
      info,
    };
  },
};
</script>
