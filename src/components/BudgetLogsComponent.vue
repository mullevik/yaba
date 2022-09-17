<template>

    <div v-show="!formOpen_">
        <section>
            <div class="budget-log-item" v-for="(log, index) in pastLogs" :key="index" @click="selectPastLog(index)">
                <span class="date">{{log.pending ? "pending" : new Date(log.unixTimestamp *
                1000).toLocaleDateString()}}</span>
                <div class="labels">
                    <LabelComponent v-for="(labelName, labelId) in log.labels" :name="labelName"
                        :color="getLabelColor(labelName)" :key="labelId" :clickable="false"></LabelComponent>
                </div>
                <span class="amount">{{log.amount}} {{log.currency.toUpperCase()}}</span>
            </div>
        </section>

        <section>
            <button>Resubmit pending</button>
            <button>New submit</button>
        </section>
    </div>
    <SubmitBudgetLogComponent v-if="formOpen_" :past-log="selectedPastLog"></SubmitBudgetLogComponent>

</template>

<script>
import { LABELS, TMP_PAST_LOGS } from '@/models';
import LabelComponent from './LabelComponent.vue';
import SubmitBudgetLogComponent from './SubmitBudgetLogComponent.vue';

function getAvailableLabels() {
    return LABELS;
}

function getPastLogs() {
    return TMP_PAST_LOGS;
}

export default {
    name: 'BudgetLogsComponent',
    components: { LabelComponent, SubmitBudgetLogComponent },
    data() {
        return {
            pastLogs: TMP_PAST_LOGS,
            availableLabels: getAvailableLabels(),
            formOpen_: false,
            selectedPastLog: {
                amount: null,
                currency: "czk",
                labels: [],
            },
        }
    },
    methods: {
        getLabelColor(labelName) {
            const matchingLabels = this.availableLabels.filter(x => x.name === labelName);
            if (matchingLabels.length !== 1) {
                return null;
            }
            return matchingLabels[0].color;
        },
        selectPastLog(index) {
            this.selectedPastLog = this.pastLogs[index];
            this.formOpen_ = true;
        }
    }
}
</script>

<style scoped>
.budget-log-item {
    border: 2px solid #41B882;
    border-radius: 5px;
    box-sizing: border-box;
    margin: 0.8em;
    padding: 0.6em 0.8em 0.4em 0.8em;
}

.date {
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    text-align: left;
}

.labels {
    display: inline-block;
    width: 60%;
    box-sizing: border-box;
    text-align: left;
}

.amount {
    display: inline-block;
    width: 20%;
    text-align: right;
    box-sizing: border-box;
}
</style>