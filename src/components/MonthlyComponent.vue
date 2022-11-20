<template>
    <div class="month-selection">
        <button id="month-prev" class="month-selection-item" @click="selectPreviousMonth"><font-awesome-icon icon="fa-solid fa-arrow-left" /></button>
        <span id="month-current" class="month-selection-item">{{selectedDate.toLocaleDateString(getLocale(), {month: 'long'})}}
            {{selectedDate.getFullYear()}}</span>
        <button id="month-next" class="month-selection-item" @click="selectNextMonth" :disabled="!hasNextMonth"><font-awesome-icon icon="fa-solid fa-arrow-right" /></button>

    </div>
    <LabelSelectionComponent v-model="labelsToFilter" :available-labels="availableLabels"></LabelSelectionComponent>
    <div>
        <div class="info-note" v-if="filteredMonthlyData.length == 0 && !isFetching">No monthly data available</div>
        <div class="info-note" v-if="isFetching">
            <font-awesome-icon icon="fa-solid fa-spinner" spin/>
            obtaining data for {{selectedDate.toLocaleDateString(getLocale(), {month: 'long'})}} {{selectedDate.getFullYear()}}
        </div>
        <div v-if="filteredMonthlyData.length > 0 && !isFetching">
            <div class="info-note">{{this.total.toLocaleString()}} {{this.currency}} spent in total</div>
            <BarChartComponent :data="this.filteredMonthlyData" :currency="this.currency"></BarChartComponent>
        </div>
        
    </div>
</template>
<script>
import { COLOR, LABELS } from '@/models';
import { getMonthlyLogs } from '@/api'
import BarChartComponent from './BarChartComponent.vue';
import LabelSelectionComponent from './LabelSelectionComponent.vue';

const LABEL_COLOR_MAP = {}
for (const label of LABELS) {
    LABEL_COLOR_MAP[label.name.toLowerCase()] = label.color;
}

function getAvailableLabels() {
    return LABELS;
}

function transform(data, labelNamesToFilter) {
    if (data == null) {
        return [];
    }

    function cleanLabelName(label) {
        return label.toLocaleLowerCase().replace(",", "").trim();
    }

    const aggregatedResults = {};
    for (const row of data["rows"]) {
        const labels = row[1];
        const amount = row[0];
        const cleanLabels = new Set(labels.split(" ").map(x => cleanLabelName(x)));
        const labelIntersection = new Set([...cleanLabels].filter(x => labelNamesToFilter.has(x)));  // cleanLabels.intersection(labelNamesToFilter)
        if (labelNamesToFilter.size > 0 && labelIntersection.size == 0) {
            continue;  // ignore rows with empty intersection with filter
        }
        for (const cleanLabel of cleanLabels) {
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
            rawMonthlyData: null,
            isFetching: false,
            currency: ",-",
            labelsToFilter: [],
            availableLabels: getAvailableLabels(),
        };
    },
    computed: {
        hasNextMonth() {
            return ((this.selectedDate.getMonth() < this.currentDate.getMonth()) && (this.selectedDate.getFullYear() <= this.currentDate.getFullYear()));
        },
        total() {
            return this.filteredMonthlyData.map(x => x["amount"]).reduce((a, b) => a + b, 0);
        },
        filteredMonthlyData() {
            return transform(this.rawMonthlyData, new Set(this.labelsToFilter.map(x => x.name)));
        }
    },
    watch: {
        // eslint-disable-next-line
        selectedDate(newDate, oldDate) {
            this.fetchMonthlyData();
        },
        labelsToFilter() {
            // fixme: this is a hack to always destroy the chart component...
            // this can be fixed with better implementation of the chart component
            this.isFetching = true;
            setTimeout(() => {
                this.isFetching = false;
            }, 100);
        }
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
                this.rawMonthlyData = responseData;
                this.currency = responseData["currency"];
            }).catch(() => {
                this.rawMonthlyData = [];
            }).finally(() => {
                this.isFetching = false;
            });
        },
    },
    components: { BarChartComponent, LabelSelectionComponent }
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