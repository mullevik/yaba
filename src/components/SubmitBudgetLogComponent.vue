<template>
  <LabelSelectionComponent v-model="selectedLabels" :available-labels="availableLabels" class="selected-labels-section" :style="cssVars" :always-expanded="true">
  </LabelSelectionComponent>

  <div class="amount-section">
    <input ref="inputAmount" type="number" name="amount" id="input-amount" v-model="amount" placeholder="0">
    <select name="currency" id="input-currency" form="main-form" v-model="currency">
      <option value="CZK" selected>CZK</option>
      <option value="EUR">EUR</option>
    </select>
    <button :style="cssVars" :disabled="!ableToSubmit" @click="submitAmount" class="primary">
       <span v-if="pendingSubmit"><font-awesome-icon icon="fa-solid fa-spinner" spin/></span><span v-else><font-awesome-icon icon="fa-solid fa-paper-plane" /> Submit</span>
    </button>
  </div>
  <div class="under-amount-section-filler" :style="cssVars"></div>

</template>

<script>
import { createBudgeLog } from "@/budgetUtils"
import { sendBudgetLog } from "@/api"
import LabelSelectionComponent from './LabelSelectionComponent.vue'
import { storeBudgetLog } from "../localStorageUtils"
import { LABELS } from "../models"

function getAvailableLabels() {
  return LABELS;
}

export default {
  name: 'SubmitBudgetLogComponent',
  components: { LabelSelectionComponent },
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
      pendingSubmit: false,
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
        '--selected-labels-section-height': "5em",
        '--amount-section-height': "20em",
      }
    }
  },
  watch: {
    amount: function (value) {
      if (value !== null && value !== 0 && value !== "") { this.ableToSubmit = true; } else { this.ableToSubmit = false; }
    }
  },
  methods: {
    clearData() {
      this.amount = null,
        this.selectedLabels = [];
    },
    submitAmount() {
      this.ableToSubmit = false;
      this.pendingSubmit = true;
      const budgetLog = createBudgeLog(this.amount, this.currency, this.selectedLabels.map(x => x.name));
      sendBudgetLog(budgetLog).then(() => {
        budgetLog.pending = false;
      }).catch(e => {
        console.error("Budget log could not have been sent");
        console.error(e);
        budgetLog.pending = true;
        this.pendingSubmit = false;
      }).finally(() => {
        this.clearData();
        storeBudgetLog(budgetLog);
        this.ableToSubmit = true;
        this.pendingSubmit = false;
        this.$emit("onSubmitDone", budgetLog);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selected-labels-section {
  /* width: 100%; */
  background-color: var(--cp-secondary-middle);
  text-align: left;
}

div.amount-section {
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: var(--cp-secondary-middle);
}

div.amount-section input[type=number] {
  color: var(--cp-text-light-dimmed);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  margin: 0;
}


div.amount-section input[type=number]::placeholder {
  color: var(--cp-text-light-dimmed);
}

div.amount-section select {
  color: var(--cp-text-light-dimmed);
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
  font-size: 1.5em;
  width: 100%;
  padding: 0.5em;
  cursor: pointer;
  border-radius: 0;
}
</style>
