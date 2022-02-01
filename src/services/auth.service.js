import axios from "axios";

// const API_URL = "https://todos-note.herokuapp.com/api/auth/";
const API_URL = "https://todo-note.onrender.com/api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        name: user.name,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  verifyToken() {
    let token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      return axios(API_URL + "verifyToken/" + token.accessToken);
    }
  }
}

export default new AuthService();
