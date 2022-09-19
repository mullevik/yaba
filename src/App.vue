<template>
  <NavigationComponent></NavigationComponent>
  <router-view></router-view>
</template>

<script>
import NavigationComponent from "./components/NavigationComponent.vue"

export default {
  name: 'App',
  components: {
    NavigationComponent,
  }
}
</script>

<style>
#app {
  font-family: serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 1em;
}

body {
  margin: 0;
  color: #d6f1e5;
  background-color: #081610;
}

input[type=text] {
  color: #d6f1e5ff;
}

input[type=text]:focus {
  outline: none;
  background-color: transparent;
}

input[type=text]::placeholder {
  color: #a4b8af;
}

button {
  color: #d6f1e5ff;
  background-color: #1b4e37ff;
  cursor: pointer;
}


button:disabled,
button[disabled] {
  color: #a4b8afff;
  background-color: #133322ff;
  cursor: not-allowed;
}

button.primary {
  color: #040b08ff;
  background-color: #41b883ff;
}

button.primary:disabled,
button.primary[disabled] {
  color: #081610ff;
  background-color: #308962ff;
}
</style>
