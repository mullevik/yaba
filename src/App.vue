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
  font-size: 1em;
}
body {
  margin: 0;
  color: #d6f1e5;
  background-color: #081610;
}
</style>
