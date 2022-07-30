<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <MainTitle title="yaba" description="yet another budget app"/>
  <MainForm/>
  <SettingsForm/>
  <PendingLogs/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MainTitle from './components/MainTitle.vue'
import MainForm from './components/MainForm.vue'
import SettingsForm from './components/SettingsForm.vue'
import PendingLogs from './components/PendingLogs.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    MainTitle,
    MainForm,
    SettingsForm,
    PendingLogs,
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
