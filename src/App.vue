<template>
  <div id="nav">
    <div style="display: flex">
      <router-link to="/"><h1>To Do</h1></router-link>
      <h1 id="profilename" v-if="loggedIn">&nbsp;{{ name }}</h1>
    </div>
    <div class="right-options">
      <router-link v-if="loggedIn" to="/">Home</router-link>
      <router-link v-if="loggedIn" to="/addnote"
        ><i class="fas fa-plus-circle"></i> Add note</router-link
      >
      <router-link v-if="!loggedIn" to="/login">Login</router-link>
      <router-link v-if="loggedIn" to="/imp"
        ><i class="fas fa-star"></i
      ></router-link>
      <router-link v-if="loggedIn" @click="loggedOut" to="/login"
        >Logout</router-link
      >
      <router-link v-if="!loggedIn" to="/register">Register</router-link>
    </div>
  </div>

  <div id="navmob">
    <div style="display: flex">
      <router-link to="/"><h1>To Do</h1></router-link>
      <h1 id="profilename" v-if="loggedIn">&nbsp; {{ name }}</h1>
    </div>
    <div class="right-options">
      <router-link v-if="loggedIn" to="/">Home</router-link>
      <router-link v-if="loggedIn" to="/addnote"
        ><i class="fas fa-plus-circle"></i> Add note</router-link
      >
      <router-link v-if="!loggedIn" to="/login">Login</router-link>
      <router-link v-if="loggedIn" to="/imp"
        ><i class="fas fa-star"></i
      ></router-link>
      <router-link v-if="loggedIn" @click="loggedOut" to="/login"
        >Logout</router-link
      >
      <router-link v-if="!loggedIn" to="/register">Register</router-link>
    </div>
  </div>
  <router-view />
  <Footer />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Footer from "./components/Footer.vue";
const store = useStore();

const route = useRouter();
const loggedIn = computed(() => {
  return store.state.auth.status.loggedIn;
});
const name = computed(() => {
  return store.state.auth.name;
});

const loggedOut = () => {
  store.dispatch("auth/logout");
  route.push({ name: "Login" });
};

onMounted(() => {
  document.title = "To Do | App";
});
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#navmob {
  display: none !important;
}
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  backdrop-filter: blur(5px);
  a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
    margin-left: 15px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
