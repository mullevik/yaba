<template>
  <button v-on:click="manualSync()" :disabled="!hasPendingLogs">
    <span v-if="syncing_"><font-awesome-icon icon="fa-solid fa-spinner" spin/></span>
    <span v-else><font-awesome-icon icon="fa-solid fa-repeat" /> <span v-if="pendingLogs.length > 0">{{pendingLogs.length}}</span></span>
  </button>
</template>

<script>
import { getBudgetLogs, removePendingBudgetLog } from "@/localStorageUtils"
import { sendBudgetLog } from "@/api"
import { onBudgetLogsChanged } from "@/events";

export default {
  name: 'PendingLogs',
  components: {},
  data() {
    return {
      pendingLogs: getBudgetLogs().filter(x => x.pending),
      syncing_: false,
    }
  },
  computed: {
    hasPendingLogs() {
      return this.pendingLogs.length > 0 && !this.syncing_;
    }
  },
  mounted() {
    onBudgetLogsChanged(() => {
      this.pendingLogs = getBudgetLogs().filter(x => x.pending);
    });
  },
  methods: {
    _recursiveSync(index, pendingLogsCopy) {
      if (index >= pendingLogsCopy.length) {
        this.syncing_ = false;
        return;
      }
      const currentPendingBudgetLog = pendingLogsCopy.at(index);
      sendBudgetLog(currentPendingBudgetLog)
        .then(_ => { // eslint-disable-line no-unused-vars
          this.removePendingLog(currentPendingBudgetLog);
          this._recursiveSync(index + 1, pendingLogsCopy);
        })
        .catch(e => {
          console.error(`Can not sync pending log ${JSON.stringify(currentPendingBudgetLog)}`);
          console.error(`${e}`);
          this.syncing_ = false;
        });
    },
    manualSync() {
      const pendingLogsCopy = [...this.pendingLogs];
      if (pendingLogsCopy.length < 1) {
        return;
      }
      this.syncing_ = true;
      this._recursiveSync(0, pendingLogsCopy);
    },
    removePendingLog(budgetLog) {
      removePendingBudgetLog(budgetLog);
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
