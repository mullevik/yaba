<template>
  <BudgetLogsComponent/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import BudgetLogsComponent from "./components/BudgetLogsComponent.vue"

export default {
  name: 'App',
  components: {
    BudgetLogsComponent,
}
}
</script>

<style>
#app {
  font-family: serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
