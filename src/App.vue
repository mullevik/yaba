<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <MainTitle title="yaba" description="yet another budget app"/>
  <MainForm/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MainTitle from './components/MainTitle.vue'
import MainForm from './components/MainForm.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
    MainTitle,
    MainForm
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
  margin-top: 60px;
}
</style>
