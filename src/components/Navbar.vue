<template>
  <div>
    <nav id="navbar">
      <div class="nav-left">To Do</div>
      <div class="nav-right">
        <ul>
          <li><router-link to="/">Home</router-link></li>

          <li><router-link to="/addnote">Add note</router-link></li>

          <li><router-link to="/about">About</router-link></li>

          <li><router-link to="/login">Login</router-link></li>

          <li><router-link to="/register">Register</router-link></li>

          <li><router-link to="/logout">Logout</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#navbar {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
