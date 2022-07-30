<template>
  <div class="form">
    <form id="settings-form">

      <label for="api-endpoint">API Endpoint</label><br>
      <input type="input" name="api-endpoint" id="api-endpoint" v-model="apiEndpoint"><br>
      <label for="api-key">API Key</label><br>
      <input type="input" name="api-key" id="api-key" v-model="apiKey"><br>

    </form>
  </div>
</template>

<script>
import {getApiKey, getApiEndpoint, setApiKey, setApiEndpoint} from "@/localStorageUtils"
import _ from 'lodash';

export default {
  name: 'SettingsForm',
  components: { },
  data () {
    return {
      apiEndpoint: getApiEndpoint(),
      apiKey: getApiKey(),
    }
  },
  watch: {
    apiEndpoint: _.debounce(function (val) {
      setApiEndpoint(val);
    }, 400),
    apiKey: _.debounce(function (val) {
      setApiKey(val);
    }, 400),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
