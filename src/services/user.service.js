// import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service";
import axios from "axios";

const API_URL = "https://todos-note.herokuapp.com/api/users/notes/";

class UserService {
  getNotes(page, pag) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!page) {
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
    } else if (pag) {
      let url = "https://todos-note.herokuapp.com/api/users/allnotes/";
      return fetch(url + user.id, { headers: authHeader() })
        .then((res) => res.json())
        .then((getData) => {
          return getData;
        });
    } else {
      let url = "https://todos-note.herokuapp.com/api/auth/notes/page/";
      return fetch(url + page, { headers: authHeader() })
        .then((res) => res.json())
        .then((getData) => {
          return getData;
        });
    }
  }
  addNote(note) {
    var newNote = { ...note };
    let user = JSON.parse(localStorage.getItem("user"));
    newNote.userId = user.id;
    newNote.done = false;
    return axios
      .post("https://todos-note.herokuapp.com/api/addnote", newNote, {
        headers: authHeader(),
      })
      .then((res) => {
        return res;
      });
  }

  isNoteDone(note) {
    return axios
      .post("https://todos-note.herokuapp.com/api/isnotedone", note, {
        headers: authHeader(),
      })
      .then((res) => {
        return res;
      });
  }
  isNoteImp(note) {
    return axios
      .post("https://todos-note.herokuapp.com/api/isnoteimp", note, {
        headers: authHeader(),
      })
      .then((res) => {
        return res;
      });
  }
  deleteNote(note) {
    return fetch("https://todos-note.herokuapp.com/api/deletenote/" + note.id, {
      headers: authHeader(),
    })
      .then((res) => res.json())
      .then((getData) => {
        return getData;
      });
  }

  update(note) {
    return axios
      .post("https://todos-note.herokuapp.com/api/update/note", note, {
        headers: authHeader(),
      })
      .then((res) => {
        return res;
      });
  }
}

export default new UserService();
