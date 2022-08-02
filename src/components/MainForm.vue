<template>
  <div class="form">
    <form id="main-form">

      <input type="number" name="amount" id="input-amount" v-model="amount">
      <select name="currency" id="input-currency" form="main-form" v-model="currency">
        <option value="CZK" selected>CZK</option>
        <option value="EUR">EUR</option>
      </select>
      <br>
      <br>

      <Multiselect v-model="selectedLabels" :options="availableLabels" mode="tags" searchable="true" createOption="true" />
      <br>
      <br>

      <input type="button" :value="sendingButtonLabel_" v-on:click="logPaidAmount()" :disabled="sendingButtonDisabled_">

    </form>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import { createBudgeLog } from "@/budgetUtils"
import { storePendingBudgetLog } from "@/localStorageUtils"
import { sendBudgetLog } from "@/api"

const SENDING_STATE = {
  READY: "ready",
  SENDING: "sending",
  SUCCESS: "success",
  FAILED: "failed"
}

export default {
  name: 'MainForm',
  components: { Multiselect },
  data() {
    return {
      amount: null,
      currency: "CZK",
      selectedLabels: [],
      availableLabels: [
        "groceries", "fuel", "rent", "restaurant", "food",
        "alcohol", "entertainment", "sport", "drugstore", "accommodation",
        "pharmacy", "public-transport", "subscription", "traveling",
        "music", "clothes", "fashion", "home", "fast-food",
        "patisserie", "video-games", "technology", "furniture",
        "outdoor", "new"
      ],
      sendingState_: SENDING_STATE.READY,
    }
  },
  computed: {
    sendingButtonLabel_() {
      if (this.sendingState_ == SENDING_STATE.READY) { return "Send" }
      if (this.sendingState_ == SENDING_STATE.SENDING) { return "Sending..." }
      if (this.sendingState_ == SENDING_STATE.SUCCESS) { return "Successfully sent" }
      if (this.sendingState_ == SENDING_STATE.FAILED) { return "Failed to send" }
      return "Send";
    },
    sendingButtonDisabled_() {
      return this.sendingState_ == SENDING_STATE.SENDING || this.amount === null;
    }
  },
  watch: {
    amount: function (value) {
      if (value !== null) { this.sendingState_ = SENDING_STATE.READY }
    }
  },
  methods: {
    clearData() {
      this.amount = null,
        this.selectedLabels = [];
    },
    logPaidAmount() {

      // const tmpUrl = "https://script.google.com/macros/s/AKfycbyiSgkHhLqIfB53fBsgwuyl9BXk3tf4tPbg7mRHG-ierELDOZS0tk97W-yCjosJ7MZJig/exec";
      // const tmpApiKey = "Wrong"
      const budgetLog = createBudgeLog(this.amount, this.currency, this.selectedLabels);
      this.sendingState_ = SENDING_STATE.SENDING;
      sendBudgetLog(budgetLog)
        .then(responseData => {
          console.log("Successfully sent budget log");
          console.log(responseData);
          this.clearData();
          this.sendingState_ = SENDING_STATE.SUCCESS;
        })
        .catch(e => {
          console.error("Budget log could not have been sent");
          console.error(e);
          storePendingBudgetLog(budgetLog);
          this.clearData();
          this.sendingState_ = SENDING_STATE.FAILED;
        });
    }
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css">
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
