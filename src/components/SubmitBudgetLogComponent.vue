<template>
  <SelectedLabelsComponent v-model="selectedLabels" class="selected-labels-section" :style="cssVars">
  </SelectedLabelsComponent>
  <AvailableLabelsComponent v-model="availableLabels" @on-label-selected="this.selectLabel"
    class="available-labels-section" :style="cssVars">
  </AvailableLabelsComponent>

  <div class="amount-section">
    <input ref="inputAmount" type="number" name="amount" id="input-amount" v-model="amount" placeholder="0">
    <select name="currency" id="input-currency" form="main-form" v-model="currency">
      <option value="CZK" selected>CZK</option>
      <option value="EUR">EUR</option>
    </select>
    <button :style="cssVars" :disabled="!ableToSubmit" @click="submitAmount">Submit</button>
  </div>
  <div class="under-amount-section-filler" :style="cssVars"></div>

</template>

<script>
import { createBudgeLog } from "@/budgetUtils"
import { sendBudgetLog } from "@/api"
import SelectedLabelsComponent from './SelectedLabelsComponent.vue'
import AvailableLabelsComponent from './AvailableLabelsComponent.vue'
import { LABELS } from "../models"
import { storeBudgetLog } from "../localStorageUtils"

function getAvailableLabels() {
  return LABELS;
}

export default {
  name: 'SubmitBudgetLogComponent',
  components: { SelectedLabelsComponent, AvailableLabelsComponent },
  props: {
    pastLog: {
      type: Object,
      default() {
        return {
          amount: null,
          currency: "czk",
          labels: [],
        }
      }
    },
  },
  emits: ["onSubmitDone"],
  data() {
    return {
      amount: null,
      currency: "CZK",
      selectedLabels: [],
      availableLabels: getAvailableLabels(),
      ableToSubmit: false,
    }
  },
  mounted() {
    this.$refs.inputAmount.focus();
    this.currency = this.pastLog.currency.toUpperCase();
    const initialLabels = [];
    const availableLabelNames = this.availableLabels.map(x => x.name);
    for (const labelName of this.pastLog.labels) {
      const index = availableLabelNames.indexOf(labelName);
      if (index >= 0) {
        initialLabels.push({name: labelName, color: this.availableLabels[index].color});
      } else {
        initialLabels.push({name: labelName, color: null});
      }
    }
    this.selectedLabels = initialLabels;
  },
  computed: {
    cssVars() {
      return {
        '--submit-button-bg-color': "#41B882",
        '--selected-labels-section-height': "5em",
        '--amount-section-height': "20em",
      }
    }
  },
  watch: {
    amount: function (value) {
      console.log(value)
      if (value !== null && value !== 0) { this.ableToSubmit = true; } else { this.ableToSubmit = false; }
    }
  },
  methods: {
    clearData() {
      this.amount = null,
        this.selectedLabels = [];
    },
    selectLabel(name) {
      const newLabels = this.selectedLabels.map(x => x);
      const chosenLabels = this.availableLabels.filter(x => x.name === name);
      if (chosenLabels.length !== 1) {
        console.warn(`Label with name ${name} not found in available labels.`)
      }
      newLabels.push(chosenLabels[0]);
      this.selectedLabels = newLabels;
    },
    submitAmount() {
      this.ableToSubmit = false;
      const budgetLog = createBudgeLog(this.amount, this.currency, this.selectedLabels.map(x => x.name));
      sendBudgetLog(budgetLog).then(responseData => {
        budgetLog.pending = false;
        console.log("Successfully sent budget log");
        console.log(responseData);
      })
      .catch(e => {
        console.error("Budget log could not have been sent");
        console.error(e);
        budgetLog.pending = true;
      }).finally(() => {
        this.clearData();
        storeBudgetLog(budgetLog);
        this.$emit("onSubmitDone", budgetLog);
        this.ableToSubmit = true;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selected-labels-section {
  width: 100%;
  background-color: white;
  min-height: 8em;
}

div.amount-section {
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: white;
}

div.under-amount-section-filler {
  display: block;
  height: var(--amount-section-height);
}

input[type=number] {
  font-size: 3em;
  display: inline-block;
  box-sizing: border-box;
  width: calc(100% - 3em);
  border: none;
  text-align: right;
  font-weight: bold;
  background-color: transparent;
}

input[type=number]:focus {
  outline: none;
}

select {
  border: none;
  outline: none;
  background-color: transparent;
  text-align: center;
  box-sizing: border-box;
  display: inline-block;
  width: 3em;
  font-size: 3em;
  font-weight: bold;
}

button {
  display: block;
  border: none;
  font-size: 1.5em;
  background-color: var(--submit-button-bg-color);
  width: 100%;
  padding: 0.5em;
  cursor: pointer;
}
</style>
