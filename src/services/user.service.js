// import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service";
import axios from "axios";

const API_URL = "https://todos-note.herokuapp.com/api/users/notes/";

class UserService {
  getNotes() {
    let user = JSON.parse(localStorage.getItem("user"));
    return authService.verifyToken(user.accessToken).then((res) => {
      if (res.data) {
        return fetch(API_URL + user.id, { headers: authHeader() })
          .then((res) => res.json())
          .then((getData) => {
            return getData;
          });
      } else {
        return;
      }
    });
  }
  addNote(note) {
    var newNote = { ...note };

    let user = JSON.parse(localStorage.getItem("user"));
    newNote.userId = user.id;
    newNote.done = false;
    return authService.verifyToken(user.accessToken).then((res) => {
      if (res.data) {
        return axios
          .post("https://todos-note.herokuapp.com/api/addnote", newNote, {
            headers: authHeader(),
          })
          .then((res) => {
            return res;
          });
      } else {
        return;
      }
    });
  }
  isNoteDone(note) {
    let user = JSON.parse(localStorage.getItem("user"));
    return authService.verifyToken(user.accessToken).then((res) => {
      if (res.data) {
        return axios
          .post("https://todos-note.herokuapp.com/api/isnotedone", note, {
            headers: authHeader(),
          })
          .then((res) => {
            return res;
          });
      } else {
        return;
      }
    });
  }
  deleteNote(note) {
    return fetch("https://todos-note.herokuapp.com/api/deletenote/" + note.id, { headers: authHeader() })
    .then((res) => res.json())
    .then((getData) => {
      return getData;
    });
  }

  update(note) {
    let user = JSON.parse(localStorage.getItem("user"));
    return authService.verifyToken(user.accessToken).then((res) => {
      if (res.data) {
        return axios
          .post("https://todos-note.herokuapp.com/api/update/note", note, {
            headers: authHeader(),
          })
          .then((res) => {
            return res;
          });
      } else {
        return;
      }
    });
  }
}

export default new UserService();
