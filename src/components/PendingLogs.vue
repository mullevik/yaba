<template>
  <h2>Pending logs</h2> 
  
  <p>
    <span v-if="pendingLogs.length == 1">{{ pendingLogs.length }} log is pending</span>
    <span v-else-if="pendingLogs.length > 0">{{ pendingLogs.length }} logs are pending</span>
    <span v-else>no logs are pending</span>  
  </p>
  <button v-on:click="manualSync()" :disabled="!hasPendingLogs">
    <span v-if="syncing_">Syncing...</span>
    <span v-else>Sync manually</span>
  </button>
</template>

<script>
import { getPendingBudgetLogs, removePendingBudgetLog } from "@/localStorageUtils"
import { sendBudgetLog } from "@/api"
import { onBudgetLogsChanged } from "@/events";

export default {
  name: 'PendingLogs',
  components: {},
  data() {
    return {
      pendingLogs: getPendingBudgetLogs(),
      syncing_: false,
    }
  },
  computed: {
    hasPendingLogs() {
      return this.pendingLogs.length > 0;
    }
  },
  mounted() {
    onBudgetLogsChanged(() => {
      console.log(`Pending logs have changed`);
      this.pendingLogs = getPendingBudgetLogs();
    });
  },
  methods: {
    _recursiveSync(index, pendingLogsCopy) {
      if (index >= pendingLogsCopy.length) {
        console.log("All pending objects synced");
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
        console.log("No budget logs to sync manually");
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
