<template>
<p class="msg">Please Register</p>
  <form @submit.prevent="handleRegister" class="login-register-form">
    <input type="text" name="name" v-model="name" placeholder="name" required />
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

    const handleRegister = () => {
      error.value = false;
      const user = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      store.dispatch("auth/register", user).then(
        () => {
          route.push({name: "Login"});
        },
        (err) => {
          error.value = true;
          console.log(err);
        }
      );
      console.log(user);
    };

    return { name, email, password, handleRegister, error };
  },
};
</script>

<style></style>
