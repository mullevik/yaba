<template>
  <div class="form">
    <form id="main-form">

      <input type="number" name="amount" id="input-amount" v-model="amount">
      <select name="cars" id="input-currency" form="main-form" v-model="currency">
        <option value="CZK" selected>CZK</option>
        <option value="EUR">EUR</option>
      </select>

      <Multiselect v-model="selectedLabels" :options="availableLabels" mode="tags" searchable="true"/>

      <input type="button" value="Log paid amount" v-on:click="logPaidAmount()">

    </form>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'


export default {
  name: 'MainForm',
  components: { Multiselect },
    data () {
      return {
        amount: null,
        currency: "CZK",
        selectedLabels: [],
        availableLabels: ['groceries', 'sport', 'restaurants'],
      }
    },
  methods: {
    logPaidAmount() {
      console.log(`Amount: ${this.amount}, Currency: ${this.currency}, Tags: ${this.selectedLabels}`);

      const tmpUrl = "https://script.google.com/macros/s/AKfycbyiSgkHhLqIfB53fBsgwuyl9BXk3tf4tPbg7mRHG-ierELDOZS0tk97W-yCjosJ7MZJig/exec";
      const tmpApiKey = "Wrong"
      const bodyData = {
        "api_key": tmpApiKey,
        "unix_timestamp": Math.floor(new Date().getTime() / 1000),
        "amount": this.amount,
        "currency": this.currency,
        "labels": this.selectedLabels,
      };

      fetch(tmpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': "text/plain;charset=utf-8",
        },
        redirect: "follow",
        body: JSON.stringify(bodyData)
      })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
      })
      .catch(e => {
        console.log("Catching error");
        console.error(e);
      });
    }
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
