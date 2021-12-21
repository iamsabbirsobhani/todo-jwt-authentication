<template>
  <div v-if="showHomeNotes && notes" class="parent-card">
    <div v-for="note in notes.rows" :key="note.id">
      <div v-if="!imp || note.isImp" class="card">
        <div class="options">
          <div class="right-options">
            <div class="option-button">
              <button
                :id="note.id"
                v-if="!note.isImp"
                @click="handleImportant(note.id, note.imp)"
              >
                <i class="far fa-star"></i>
              </button>
              <button
                :id="note.id"
                v-else
                @click="handleImportant(note.id, note.isImp)"
              >
                <i class="fas fa-star"></i>
              </button>
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
            <Spinner :model="true" />
          </div>
          <div id="isIcon">
            <div v-if="note.done" class="note-done" id="done">
              <i class="fas fa-check-circle"></i>
            </div>
            <div v-if="note.isImp" class="note-done" id="star">
              <i class="fas fa-star"></i>
            </div>
          </div>
        </div>

        <div v-if="info.isShow && info.id == note.id" class="info">
          <p>Note: #{{ note.id }}</p>
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
            <div v-if="note.noteHtml">
              <div v-if="note.noteHtml.length > 150">
                <p
                  id="noteHtml"
                  v-html="note.noteHtml.slice(0, 280) + `...`"
                ></p>
                <h5 id="seeMore" @click="seeMoreDetail(note.id)">
                  See more...
                </h5>
                <Details
                  v-if="seeMore && seeDetials.id == note.id"
                  @closeDetails="closeDetails"
                  :notes="note"
                />
              </div>
              <div v-else>
                <p id="noteHtml" v-html="note.noteHtml"></p>
              </div>
            </div>
            <div v-else>
              <div v-if="note.note.length > 150">
                <p>{{ note.note.slice(0, 400) }}...</p>
                <h5 id="seeMore" @click="seeMoreDetail(note.id)">
                  See more...
                </h5>
                <Details
                  v-if="seeMore && seeDetials.id == note.id"
                  @closeDetails="closeDetails"
                  :notes="note"
                />
              </div>
              <div v-else>
                <p>{{ note.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Spinner v-else />
  <div class="pagination" v-if="pag && notes">
    <a v-for="(page, index) in notes.page" :key="page" style="color: white">
      <div class="pages" @click="handlePage(index)">
        <div class="page">
          {{ index + 1 }}
        </div>
      </div>
    </a>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from "@vue/runtime-core";
import service from "../services/user.service.js";
import { format } from "date-fns";
import Spinner from "../components/Spinner.vue";
import EditCard from "../components/EditCard.vue";
import Details from "../components/Details.vue";
export default {
  props: ["imp", "pag", "allnotes"],
  components: { Spinner, EditCard, Details },
  name: "Home",
  setup(props) {
    const notes = ref(null);
    const showHomeNotes = ref(true);
    const seeMore = ref(false);
    const seeDetials = ref({ id: null });
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
      if (!props.allnotes) {
        service.getNotes(page).then((res) => {
          notes.value = res;
          showHomeNotes.value = true;
        });
      } else if (props.allnotes) {
        service.getNotes(true, true).then((res) => {
          notes.value = res;
          showHomeNotes.value = true;
        });
      }
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

    const closeDetails = () => {
      seeMore.value = false;
    };

    const seeMoreDetail = (id) => {
      seeDetials.value.id = id;
      seeMore.value = true;
    };

    const imp = ref("");

    const handleImportant = (id, important) => {
      doneWaiting.value.wait = true;
      doneWaiting.value.id = id;
      imp.value = !important;
      let note = {
        id: id,
        done: imp.value,
      };
      service.isNoteImp(note).then(() => {
        getNotes(pageNo.value ?? null, true);
        doneWaiting.value.wait = false;
        doneWaiting.value.id = null;
      });
      note = null;
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
      seeMore,
      closeDetails,
      seeMoreDetail,
      seeDetials,
      handleImportant,
    };
  },
};
</script>
