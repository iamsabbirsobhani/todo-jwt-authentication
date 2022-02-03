<template>
  <p class="msg">Please register</p>
  <form @submit.prevent="handleRegister" class="login-register-form">
    <input
      type="text"
      name="name"
      maxlength="7"
      v-model="name"
      placeholder="user name"
      required
    />
    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email"
      required
    />
    <input
      type="password"
      name="password"
      placeholder="password"
      v-model="password"
    />
    <div v-if="error" class="error">
      <p>(Error!) please fill out all the fields carefully.</p>
      <p>(Error!) duplicate "user name" or "email" not supported.</p>
    </div>
    <div class="is-loading" v-show="isLoading && !error">
      <p>Please wait...</p>
      <div class="tip-msg">
        <p>Once finished registration, please login</p>
      </div>
    </div>
    <button>Register</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const route = useRouter();
    const store = useStore();

    const name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const error = ref(false);
    const isLoading = ref(false);

    const handleRegister = () => {
      error.value = false;
      isLoading.value = true;
      const user = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      store.dispatch("auth/register", user).then(
        (res) => {
          store.commit('setRegistrationSuccessMsg', res.action)
          isLoading.value = true;
          route.push({ name: "Login" });
        },
        (err) => {
          error.value = true;
          console.log(err);
        }
      );
    };

    return { name, email, password, handleRegister, error, isLoading };
  },
};
</script>

<style>
</style>
