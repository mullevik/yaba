<template>
    <div class="month-selection">
        <button id="month-prev" class="month-selection-item" @click="selectPreviousMonth"><font-awesome-icon icon="fa-solid fa-arrow-left" /></button>
        <span id="month-current" class="month-selection-item">{{selectedDate.toLocaleDateString(getLocale(), {month: 'long'})}}
            {{selectedDate.getFullYear()}}</span>
        <button id="month-next" class="month-selection-item" @click="selectNextMonth" :disabled="!hasNextMonth"><font-awesome-icon icon="fa-solid fa-arrow-right" /></button>

    </div>
    <div>
        <div class="info-note" v-if="monthlyData.length == 0 && !isFetching">No monthly data available</div>
        <div class="info-note" v-if="isFetching">
            <font-awesome-icon icon="fa-solid fa-spinner" spin/>
            obtaining data for {{selectedDate.toLocaleDateString(getLocale(), {month: 'long'})}} {{selectedDate.getFullYear()}}
        </div>
        <div v-if="monthlyData.length > 0 && !isFetching">
            <div class="info-note">{{this.total.toLocaleString()}} {{this.currency}} spent in total</div>
            <BarChartComponent :data="this.monthlyData" :currency="this.currency"></BarChartComponent>
        </div>
        
    </div>
</template>
<script>
import { COLOR, LABELS } from '@/models';
import { getMonthlyLogs } from '@/api'
import BarChartComponent from './BarChartComponent.vue';

const LABEL_COLOR_MAP = {}
for (const label of LABELS) {
    LABEL_COLOR_MAP[label.name.toLowerCase()] = label.color;
}

function transform(data) {

    function cleanLabelName(label) {
        return label.toLocaleLowerCase().replace(",", "").trim();
    }

    const aggregatedResults = {};
    for (const row of data["rows"]) {
        const labels = row[1];
        const amount = row[0];
        for (const label of labels.split(" ")) {
            const cleanLabel = cleanLabelName(label);
            aggregatedResults[cleanLabel] = cleanLabel in aggregatedResults ? aggregatedResults[cleanLabel] + amount : amount;
        }
    }
    const results = [];
    for (const [key, value] of Object.entries(aggregatedResults)) {
        results.push({ "label": key, "amount": value, "color": key in LABEL_COLOR_MAP ? LABEL_COLOR_MAP[key] : COLOR.GRAY });
    }
    return results.sort((a, b) => a["amount"] > b["amount"] ? -1 : (a["amount"] < b["amount"] ? 1 : 0));
}
export default {
    name: "MonthlyComponent",
    mounted() {
        this.fetchMonthlyData();
    },
    data() {
        return {
            currentDate: new Date(),
            selectedDate: new Date(),
            monthlyData: [],
            isFetching: false,
            currency: ",-",
        };
    },
    computed: {
        hasNextMonth() {
            return ((this.selectedDate.getMonth() < this.currentDate.getMonth()) && (this.selectedDate.getFullYear() <= this.currentDate.getFullYear()));
        },
        total() {
            return this.monthlyData.map(x => x["amount"]).reduce((a, b) => a + b, 0);
        }
    },
    watch: {
        // eslint-disable-next-line
        selectedDate(newDate, oldDate) {
            this.fetchMonthlyData();
        },
    },
    methods: {
        getLocale() {
            if (navigator.languages != undefined)
                return navigator.languages[0];
            return navigator.language;
        },
        selectPreviousMonth() {
            const newDate = new Date(this.selectedDate.getTime());
            if (newDate.getMonth() != 0) {
                newDate.setMonth(this.selectedDate.getMonth() - 1);
            }
            else {
                newDate.setMonth(11);
                newDate.setFullYear(this.selectedDate.getFullYear() - 1);
            }
            this.selectedDate = newDate;
        },
        selectNextMonth() {
            const newDate = new Date(this.selectedDate.getTime());
            if (newDate.getMonth() != 11) {
                newDate.setMonth(this.selectedDate.getMonth() + 1);
            }
            else {
                newDate.setMonth(0);
                newDate.setFullYear(this.selectedDate.getFullYear() + 1);
            }
            this.selectedDate = newDate;
        },
        fetchMonthlyData() {
            this.isFetching = true;
            getMonthlyLogs(this.selectedDate.getFullYear(), this.selectedDate.getMonth()).then(responseData => {
                this.monthlyData = transform(responseData);
                this.currency = responseData["currency"];
            }).catch(() => {
                this.monthlyData = [];
            }).finally(() => {
                this.isFetching = false;
            });
        },
    },
    components: { BarChartComponent }
}
</script>

<style>
.info-note {
    color: var(--cp-text-light-dimmed);
    font-size: 1em;
    padding: 1em;
}

.month-selection {
    display: grid;
    grid-template-areas: "prev month next";
    background-color: var(--cp-secondary-middle);
    text-align: center;
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
    font-size: 1em;
}

#month-prev {
    grid-area: prev;
    justify-self: start;
    align-self: center;
}

#month-current {
    grid-area: month;
    justify-self: center;
    align-self: center;
}
#month-next {
    grid-area: next;
    justify-self: end;
    align-self: center;
}
</style>