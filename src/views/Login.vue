<template>
      <p class="msg">Please login first</p>
  <form @submit.prevent="handleLogin" class="login-register-form home">
      <input type="text" name="name" v-model="name" placeholder="name" required>
      <!-- <input type="email" name="email" v-model="email" placeholder="email" required> -->
      <input type="password" name="password" placeholder="password" v-model="password" required>
      <div v-if="error" class="error">
          <p>name or password is incorrect</p>
      </div>
      <button>Login</button>
  </form>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup() {
       const store = useStore();
       const route = useRouter();

        const name = ref(null)
        const error = ref(false)
        // const email = ref(null)
        const password = ref(null)
       const  loggedIn = computed(() => {
           return store.state.auth.status.loggedIn;
       })

       const handleLogin = () => {
           error.value = false;
           let user = {
               name: name.value,
               password: password.value
           }
        //    console.log(email.value)
           console.log(loggedIn)
           store.dispatch('auth/login', user).then(
               () => {
                   route.push('/');
               },
               (err) => {
                   error.value = true;
                   console.log(err);
               }
           )
       }

       return {
           handleLogin, name, password, error
       }
    }
}
</script>

<style>

</style>