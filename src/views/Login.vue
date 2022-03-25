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
    <div class="is-loading" v-if="isLoading && !error">
      <p>Please wait...</p>
    </div>
    <div class="error-alert" style="color: white" v-if="ifError">
      {{ ifError.data.message }}

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
    const ifError = ref(null);

    const handleLogin = () => {
      error.value = false;
      isLoading.value = true;
      ifError.value = null;

      let user = {
        name: name.value,
        password: password.value,
      };

      store
        .dispatch("auth/login", user)
        .then(
          (res) => {
            isLoading.value = false;
            if (res.response !== undefined && res.response.status !== 200) {
              // console.log(res.response);
              ifError.value = res.response;
            }
            route.push("/");
          },
          (err) => {
            isLoading.value = false;
            error.value = true;
            console.log(err);
          }
        )
        .catch((error) => {

          console.log(error);
        });
    };

    return {
      handleLogin,
      name,
      password,
      error,
      isLoading,
      store,
      ifError,
    };
  },
};
</script>

<style lang="scss" scoped>
.msg-login-first {
  position: relative;
  margin-top: 120px;
  font-size: 22px;
  font-weight: 800;
  color: #fbbf24;
  text-shadow: 1px 1px #fde68a;
}
.msg-login-first::before {
  content: "";
  height: 2px;
  width: 50px;
  border-radius: 4px;
  position: absolute;
  background: #4ade80;
  transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 1px 1px 10px gray;
  z-index: -1;
}

@media (max-width: 500px) {
  .msg-login-first {
    margin-top: 60px !important;
  }
}
</style>
