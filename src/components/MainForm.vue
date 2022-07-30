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
import { createBudgeLog } from "@/budgetUtils"
import { storePendingBudgetLog } from "@/localStorageUtils"
import { sendBudgetLog } from "@/api"


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
      
      // const tmpUrl = "https://script.google.com/macros/s/AKfycbyiSgkHhLqIfB53fBsgwuyl9BXk3tf4tPbg7mRHG-ierELDOZS0tk97W-yCjosJ7MZJig/exec";
      // const tmpApiKey = "Wrong"
      const budgetLog = createBudgeLog(this.amount, this.currency, this.selectedLabels);
      sendBudgetLog(budgetLog)
      .then(responseData => {
        console.log("Successfully sent budget log");
        console.log(responseData);
      })
      .catch(e => {
        console.error("Budget log could not have been sent");
        console.error(e);
        storePendingBudgetLog(budgetLog);
      });
    }
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
