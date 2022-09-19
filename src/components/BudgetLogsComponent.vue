<template>

    <div v-show="!formOpen_">
        <section>
            <span v-if="pastLogs.length < 1" style="position: relative; top: 2em;">No past submissions... <i><a href="#"
                        @click="onNewSubmit">add new expense</a></i></span>
            <div class="budget-log-item" v-else v-for="(log, index) in pastLogs" :key="index"
                @click="selectPastLog(index)">
                <div class="labels">
                    <span class="date">{{log.pending ? "pending" : new Date(log.unixTimestamp *
                    1000).toLocaleDateString()}}</span>

                    <LabelComponent v-for="(labelName, labelId) in log.labels" :name="labelName"
                        :color="getLabelColor(labelName)" :key="labelId" :clickable="true" :miniature="true">
                    </LabelComponent>
                </div>
                <span class="amount">{{log.amount}} {{log.currency.toUpperCase()}}</span>
            </div>
        </section>

        <section class="buttons">
            <PendingLogs></PendingLogs>
            <button class="primary" @click="onNewSubmit">
                <font-awesome-icon icon="fa-solid fa-circle-plus" /> New expense
            </button>
        </section>
    </div>
    <SubmitBudgetLogComponent v-if="formOpen_" :past-log="selectedPastLog" @on-submit-done="onSubmitDone">
    </SubmitBudgetLogComponent>

</template>

<script>
import { LABELS } from '@/models';
import LabelComponent from './LabelComponent.vue';
import SubmitBudgetLogComponent from './SubmitBudgetLogComponent.vue';
import { getBudgetLogs } from '@/localStorageUtils';
import { onBudgetLogsChanged } from '@/events';
import PendingLogs from './PendingLogs.vue';
function getAvailableLabels() {
    return LABELS;
}

const DEFAULT_PAST_BUDGET_LOG = {
    amount: null,
    currency: "czk",
    labels: [],
}

export default {
    name: 'BudgetLogsComponent',
    components: { LabelComponent, SubmitBudgetLogComponent, PendingLogs },
    data() {
        return {
            pastLogs: getBudgetLogs(),
            availableLabels: getAvailableLabels(),
            formOpen_: false,
            selectedPastLog: DEFAULT_PAST_BUDGET_LOG,
            showSettings_: false,
        }
    },
    mounted() {
        onBudgetLogsChanged(() => {
            this.pastLogs = getBudgetLogs();
        });
    },
    methods: {
        getLabelColor(labelName) {
            const matchingLabels = this.availableLabels.filter(x => x.name === labelName);
            if (matchingLabels.length < 1) {
                return null;
            }
            return matchingLabels[0].color;
        },
        selectPastLog(index) {
            this.selectedPastLog = this.pastLogs[index];
            this.formOpen_ = true;
        },
        onNewSubmit() {
            this.selectedPastLog = DEFAULT_PAST_BUDGET_LOG;
            this.formOpen_ = true;
        },
        onSubmitDone() {
            this.formOpen_ = false;
        }
    }
}
</script>

<style scoped>
.budget-log-item {
    border-radius: 0.5em;
    box-sizing: border-box;
    margin: 0.8em;
    padding: 0.6em 0.8em 0.4em 0.8em;
    cursor: pointer;
    background-color: #102d1f;
}

.date {
    display: inline-block;
    box-sizing: border-box;
    margin-right: 0.8em;
    font-size: 0.7em;
}

.labels {
    display: inline-block;
    width: 80%;
    box-sizing: border-box;
    text-align: left;
}

.amount {
    display: inline-block;
    width: 20%;
    text-align: right;
    box-sizing: border-box;
    font-size: 0.7em;
}

.buttons {
    display: grid;
    grid-template-areas: "resubmit submit-new";
    position: fixed;
    background-color: transparent;
    bottom: 3.4em;
    text-align: center;
    width: 100%;
}

.buttons button {
    justify-self: center;
    border: none;
    margin: 1em;
    font-size: 1em;
    padding: 0.8em 1em;
    border-radius: 0.7em;
}

.buttons button:first-of-type {
    grid-area: resubmit;
    justify-self: start;
}

.buttons button:last-of-type {
    grid-area: submit-new;
    justify-self: end;
}
</style>