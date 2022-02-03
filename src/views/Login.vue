<template>
  <p class="msg" v-if="!store.state.registrationSuccessMsg">Please login</p>
  <p class="msg-login-first" v-else>
    {{ store.state.registrationSuccessMsg }}!
  </p>
  <form @submit.prevent="handleLogin" class="login-register-form home">
    <input
      type="text"
      name="name"
      v-model="name"
      placeholder="user name"
      required
    />
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
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.msg-login-first {
  position: relative;
  margin-top: 100px;
  font-size: 22px;
  font-weight: 800;
  color: #f43f5e;
  text-shadow: 1px 1px #faf6f7;
}
.msg-login-first::before {
  content: "";
  height: 50px;
  width: 90px;
  border-radius: 4px;
  position: absolute;
  background: #be123c;
  transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: rotate3d(9, -1, 1, 130deg);
  box-shadow: 1px 1px 10px gray;
  z-index: -1;
}
</style>
