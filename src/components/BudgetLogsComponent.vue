<template>

    <div v-show="!formOpen_">
        <section v-show="showSettings_">
            <SettingsForm></SettingsForm>
        </section>

        <section>
            <span v-if="pastLogs.length < 1">No past submissions... start with <i>New submit</i></span>
            <div class="budget-log-item" v-else v-for="(log, index) in pastLogs" :key="index" @click="selectPastLog(index)">
                <span class="date">{{log.pending ? "pending" : new Date(log.unixTimestamp *
                1000).toLocaleDateString()}}</span>
                <div class="labels">
                    <LabelComponent v-for="(labelName, labelId) in log.labels" :name="labelName"
                        :color="getLabelColor(labelName)" :key="labelId" :clickable="true"></LabelComponent>
                </div>
                <span class="amount">{{log.amount}} {{log.currency.toUpperCase()}}</span>
            </div>
        </section>

        <section class="buttons">
            <PendingLogs></PendingLogs>
            <button style="background-color: #4F61B6;"
                @click="() => this.showSettings_ = !this.showSettings_">Settings</button>
            <button style="background-color: #41B882;" @click="onNewSubmit">New submit</button>
        </section>
    </div>
    <SubmitBudgetLogComponent v-if="formOpen_" :past-log="selectedPastLog" @on-submit-done="onSubmitDone">
    </SubmitBudgetLogComponent>

</template>

<script>
import { LABELS } from '@/models';
import LabelComponent from './LabelComponent.vue';
import SubmitBudgetLogComponent from './SubmitBudgetLogComponent.vue';
import SettingsForm from './SettingsForm.vue';
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
    components: { LabelComponent, SubmitBudgetLogComponent, SettingsForm, PendingLogs },
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
            console.log(`Budget logs have changed`);
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
        onSubmitDone(budgetLog) {
            console.log("budget component", budgetLog);
            this.formOpen_ = false;
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
    cursor: pointer;
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

.buttons {
    position: fixed;
    background-color: transparent;
    bottom: 0;
    text-align: center;
    width: 100%;
}

.buttons button {
    cursor: pointer;
    border: none;
    margin: 1em;
    font-size: 1em;
    padding: 1em;
    border-radius: 0.5em;
}
</style>