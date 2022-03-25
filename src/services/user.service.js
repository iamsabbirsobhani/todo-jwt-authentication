// import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service";
import axios from "axios";

// const API = "https://todos-note.herokuapp.com/";
const API = "https://todo-note.onrender.com/";
const API_URL = "https://todo-note.onrender.com/api/users/notes/";
// const API_URL = "https://todos-note.herokuapp.com/api/users/notes/";

class UserService {
  getNotes(page, pag) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!page) {
      return authService
        .verifyToken(user.accessToken)
        .then((res) => {
          if (res.data) {
            return fetch(API_URL + user.id, { headers: authHeader() })
              .then((res) => res.json())
              .then((getData) => {
                return getData;
              });
          } else {
            return;
          }
        })
        .catch((error) => {
          return error;
        });
    } else if (pag) {
      let url = API + "api/users/allnotes/";
      return fetch(url + user.id, { headers: authHeader() })
        .then((res) => res.json())
        .then((getData) => {
          return getData;
        })
        .catch((error) => {
          return error;
        });
    } else {
      let url = API + "api/auth/notes/page/";
      return fetch(url + page, { headers: authHeader() })
        .then((res) => res.json())
        .then((getData) => {
          return getData;
        })
        .catch((error) => {
          return error;
        });
    }
  }
  addNote(note) {
    var newNote = { ...note };
    let user = JSON.parse(localStorage.getItem("user"));
    newNote.userId = user.id;
    newNote.done = false;
    return axios
      .post(API + "api/addnote", newNote, {
        headers: authHeader(),
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  isNoteDone(note) {
    return axios
      .post(API + "api/isnotedone", note, {
        headers: authHeader(),
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  isNoteImp(note) {
    return axios
      .post(API + "api/isnoteimp", note, {
        headers: authHeader(),
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
  deleteNote(note) {
    return fetch(API + "api/deletenote/" + note.id, {
      headers: authHeader(),
    })
      .then((res) => res.json())
      .then((getData) => {
        return getData;
      })
      .catch((error) => {
        return error;
      });
  }

  update(note) {
    return axios
      .post(API + "api/update/note", note, {
        headers: authHeader(),
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default new UserService();
