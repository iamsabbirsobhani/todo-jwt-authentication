<template>
  <p class="msg">Please login first</p>
  <form @submit.prevent="handleLogin" class="login-register-form home">
    <input type="text" name="name" v-model="name" placeholder="user name" required />
    <!-- <input type="email" name="email" v-model="email" placeholder="email" required> -->
    <input
      type="password"
      name="password"
      placeholder="password"
      v-model="password"
      required
    />
    <div v-if="error" class="error">
      <p>name or password is incorrect</p>
    </div>
    <div class="is-loading" v-show="isLoading && !error">
      <p>Please wait...</p>
    </div>
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const route = useRouter();

    const name = ref(null);
    const error = ref(false);
    const isLoading = ref(false);
    const password = ref(null);

    const handleLogin = () => {
      error.value = false;
      isLoading.value = true;
      let user = {
        name: name.value,
        password: password.value,
      };

      store.dispatch("auth/login", user).then(
        () => {
          isLoading.value = true;
          route.push("/");
        },
        (err) => {
          error.value = true;
          console.log(err);
        }
      );
    };

    return {
      handleLogin,
      name,
      password,
      error,
      isLoading,
    };
  },
};
</script>

<style></style>
