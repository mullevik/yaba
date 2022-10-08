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
:root {
  --cp-primary: #41b883ff;
  --cp-primary-dimmed: #36996dff;
  --cp-secondary-light: #34495eff;
  --cp-secondary-light-dimmed: #34495eff;
  --cp-secondary-middle: #263645ff;
  --cp-secondary-dark: #1e2a35ff;
  --cp-text-dark: #070a0eff;
  --cp-text-dark-dimmed: #070a0e90;
  --cp-text-light: #f0f3f7ff;
  --cp-text-light-dimmed: #f0f3f790;
}

#app {
  font-family: serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 1em;
}

body {
  margin: 0;
  color: var(--cp-text-light);
  background-color: var(--cp-secondary-dark);
}

a {
  color: var(--cp-primary);
}

a:visited {
  color: var(--cp-primary-dimmed);
}

a:hover {
  color: var(--cp-text-light);
}

input[type=text] {
  color: var(--cp-text-light);
}

input[type=text]:focus {
  outline: none;
  background-color: transparent;
}

input[type=text]::placeholder {
  color: var(--cp-text-light-dimmed);
}

button {
  color: var(--cp-text-light);
  background-color: var(--cp-secondary-light);
  cursor: pointer;
  font-size: 1em;
  padding: 0.8em 1em;
  border: none;
  border-radius: 0.7em;
}


button:disabled,
button[disabled] {
  color: var(--cp-text-light-dimmed);
  background-color: var(--cp-secondary-light-dimmed);
  cursor: not-allowed;
}

button.primary {
  color: var(--cp-text-dark);
  background-color: var(--cp-primary);
}

button.primary:disabled,
button.primary[disabled] {
  color: var(--cp-text-dark-dimmed);
  background-color: var(--cp-primary-dimmed);
}
</style>
