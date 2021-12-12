<template>
  <div class="home">
    <div v-if="showHomeNotes && notes" class="parent-card">
      <div v-for="note in notes.rows" :key="note.id">
        <div class="card">
          <div class="options">
            <div class="right-options">
              <div class="option-button">
                <button
                  :id="note.id"
                  v-if="!note.done"
                  @click="handleDone(note.id, note.done)"
                >
                  <i class="far fa-check-square"></i>
                </button>
                <button
                  :id="note.id"
                  v-else
                  @click="handleDone(note.id, note.done)"
                >
                  <i class="fas fa-check-square"></i>
                </button>

                <button @click="showEdit(note.id)">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="showInfo(note.id)">
                  <i class="fas fa-info-circle"></i>
                </button>
              </div>
            </div>
            <div v-if="doneWaiting.wait && note.id == doneWaiting.id">
              <Spinner :model="true"/>
            </div>
            <div v-if="note.done" class="note-done">
              <i class="fas fa-check-circle"></i>
            </div>
          </div>

          <div v-if="info.isShow && info.id == note.id" class="info">
            <p>Created: {{ format(new Date(note.createdAt), "PPp") }}</p>
            <p v-if="note.updatedAt > note.createdAt">
              Updated: {{ format(new Date(note.updatedAt), "PPp") }}
            </p>
            <p>By {{ note.user.name }}</p>
            <button id="delete-btn" @click="handleDelete(note.id)">
              <i class="done-icon far fa-trash-alt"></i>
            </button>
          </div>
          <div v-else>
            <EditCard
              v-if="showEditCard.show && showEditCard.id == note.id"
              :note="note"
              :id="note.id"
              @editDone="editDone"
            />
            <div v-else>
              <h1>{{ note.title }}</h1>
              <p>{{ note.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Spinner v-else />
    <div class="pagination" v-if="notes">
      <a v-for="(page, index) in notes.page" :key="page" style="color: white">
        <div class="pages" @click="handlePage(index)">
          <div class="page">
            {{ index + 1 }}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from "@vue/runtime-core";
import service from "../services/user.service.js";
import { format } from "date-fns";
import Spinner from "../components/Spinner.vue";
import EditCard from "../components/EditCard.vue";
export default {
  components: { Spinner, EditCard },
  name: "Home",
  setup() {
    const notes = ref(null);
    const showHomeNotes = ref(true);
    const doneWaiting = ref({
      wait: false,
      id: null,
    });
    const pageNo = ref(null);
    const done = ref();
    const showEditCard = ref({
      show: false,
      id: null,
      temp: null,
    });
    const info = ref({ isShow: false, id: null });

    const editDone = () => {
      getNotes(pageNo.value ?? null, true);
      showEditCard.value.show = false;
    };

    const getNotes = (page, show) => {
      showHomeNotes.value = show;
      service.getNotes(page).then((res) => {
        notes.value = res;
        showHomeNotes.value = true;
      });
    };

    const handleDone = (noteId, status) => {
      doneWaiting.value.wait = true;
      doneWaiting.value.id = noteId;
      done.value = !status;
      let note = {
        id: noteId,
        done: done.value,
      };
      service.isNoteDone(note).then(() => {
        getNotes(pageNo.value ?? null, true);
        doneWaiting.value.wait = false;
        doneWaiting.value.id = null;
      });
      note = null;
    };

    const handleDelete = (noteId) => {
      let notes = {
        id: noteId,
      };
      service.deleteNote(notes).then(() => {
        getNotes(pageNo.value ?? null, true);
      });
      notes = null;
    };

    onMounted(() => {
      getNotes();
    });

    const noteid = ref(null);
    const showInfo = (id) => {
      showEditCard.value.show = false;
      if (id === noteid.value) {
        info.value.isShow = !info.value.isShow;
        info.value.id = id;
      } else {
        info.value.isShow = true;
        info.value.id = id;
      }
      noteid.value = id;
    };

    const showEdit = (id) => {
      info.value.isShow = false;
      if (id === showEditCard.value.temp) {
        showEditCard.value.show = !showEditCard.value.show;
        showEditCard.value.id = id;
      } else {
        showEditCard.value.show = true;
        showEditCard.value.id = id;
      }

      showEditCard.value.temp = id;
    };

    const handlePage = (page) => {
      pageNo.value = page;
      getNotes(page);
    };

    return {
      notes,
      done,
      handleDone,
      handleDelete,
      format,
      showInfo,
      info,
      showEditCard,
      showEdit,
      editDone,
      handlePage,
      showHomeNotes,
      doneWaiting,
    };
  },
};
</script>
