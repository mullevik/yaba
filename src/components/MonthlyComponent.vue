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
        <svg id="monthly-labels"></svg>
    </div>
    <div style="height: 7.5em"></div>

</template>
<script>
import { COLOR, LABELS } from '@/models';
import * as d3 from 'd3';
import { getMonthlyLogs } from '@/api'

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
        const labels = row[3];
        const amount = row[1];
        for (const label of labels.split(" ")) {
            const cleanLabel = cleanLabelName(label);
            aggregatedResults[cleanLabel] = cleanLabel in aggregatedResults ? aggregatedResults[cleanLabel] + amount : amount;
        }
    }
    const results = [];
    for (const [key, value] of Object.entries(aggregatedResults)) {
        results.push({ "label": key, "amount": value, "color": key in LABEL_COLOR_MAP ? LABEL_COLOR_MAP[key] : COLOR.GRAY });
    }
    return results.sort((a, b) => a["amount"] > b["amount"] ? 1 : (a["amount"] < b["amount"] ? -1 : 0));
}
export default {
    name: 'MonthlyComponent',
    mounted() {
        this.fetchMonthlyData();
    },
    data() {
        return {
            currentDate: new Date(),
            selectedDate: new Date(),
            monthlyData: [],
            isFetching: false,
        }
    },
    computed: {
        hasNextMonth() {
            return ((this.selectedDate.getMonth() < this.currentDate.getMonth()) && (this.selectedDate.getFullYear() <= this.currentDate.getFullYear()));
        }
    },
    watch: {
        // eslint-disable-next-line
        selectedDate(newDate, oldDate) {
            this.fetchMonthlyData();
        },
        // eslint-disable-next-line
        monthlyData(newMonthlyData, oldMonthlyData) {
            this.renderData(newMonthlyData);
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
            } else {
                newDate.setMonth(11);
                newDate.setFullYear(this.selectedDate.getFullYear() - 1);
            }
            this.selectedDate = newDate;
        },
        selectNextMonth() {
            const newDate = new Date(this.selectedDate.getTime());
            if (newDate.getMonth() != 11) {
                newDate.setMonth(this.selectedDate.getMonth() + 1);
            } else {
                newDate.setMonth(0);
                newDate.setFullYear(this.selectedDate.getFullYear() + 1);
            }
            this.selectedDate = newDate;
        },
        fetchMonthlyData() {
            this.destroyData();
            this.isFetching = true;
            getMonthlyLogs(this.selectedDate.getFullYear(), this.selectedDate.getMonth()).then(responseData => {
                this.monthlyData = transform(responseData);
            }).catch(() => {
                this.monthlyData = [];
            }).finally(() => {
                this.isFetching = false;
            });
        },
        destroyData() {
            const svg = d3.select("#monthly-labels");
            svg.selectAll("*").remove();  // fixme: this is a bad way of doing the rendering... it should react to changes instead of nuking everything and then showing it again
        },
        renderData(data) {
            const width = 1000;
            const labelNameWidth = width / 5;
            const height = data.length * 50;
            const svg = d3.select("#monthly-labels")
                .attr("viewBox", `0 0 ${width} ${height}`);
            const maxValue = d3.max(data, (d) => d.amount);

            const yScale = d3.scaleBand().range([height, 0]).padding(0.1);
            const xScale = d3.scaleLinear().range([labelNameWidth + 1, width]);

            yScale.domain(data.map((d) => d.label));
            xScale.domain([0, maxValue]);
            svg.selectAll("rect")
                .data(data)
                .join("rect")
                .attr("class", "data-bar")
                .attr("fill", d => d.color)
                .attr("x", xScale(0))
                .attr("y", (d) => yScale(d.label))
                .attr("height", yScale.bandwidth())
                .attr("width", (d) => xScale(d.amount) - xScale(0));

            svg.append("g").selectAll("rect")
                .data(data)
                .join("rect")
                .attr("class", "under-label-bar")
                .attr("fill", d => d.color)
                .attr("x", 0)
                .attr("y", (d) => yScale(d.label))
                .attr("height", yScale.bandwidth())
                .attr("width", labelNameWidth);

            svg.append("g")
                .attr("class", "label-text")
                .attr("text-anchor", "start")
                .attr("font-family", "sans-serif")
                .attr("font-size", "1em")
                .selectAll("text")
                .data(data)
                .join("text")
                .attr("x", 0)
                .attr("y", d => yScale(d.label) + yScale.bandwidth() / 2)
                .attr("dx", "0.5em")
                .attr("dy", "0.25em")
                .text(d => d.label);

            svg.append("g")
                .attr("class", "amount-text")
                .attr("font-family", "sans-serif")
                .attr("font-size", "1em")
                .selectAll("text")
                .attr("text-anchor", "start")
                .data(data)
                .join("text")
                // .filter(d => d.amount <= maxValue / 2)
                .attr("x", d => xScale(d.amount))
                .attr("y", d => yScale(d.label) + yScale.bandwidth() / 2)
                .attr("dx", "0.5em")
                .attr("dy", "0.25em")
                .text(d => d.amount)
                .call(selection => selection
                    .filter(d => d.amount > 0.6 * maxValue)
                    .attr("text-anchor", "end")
                    .attr("x", d => xScale(d.amount))
                    .attr("y", d => yScale(d.label) + yScale.bandwidth() / 2)
                    .attr("dx", "-0.5em")
                    .attr("dy", "0.25em")
                    .attr("fill", "var(--cp-text-dark)")
                );
        }
    },
}
</script>

<style>
.under-label-bar {
    /* fill: rgba(77, 207, 51, 0.753); */
}

.data-bar {
    /* fill: rgba(95, 36, 36, 0.438); */
}

.amount-text {
    fill: var(--cp-text-light);
}

.label-text {
    fill: var(--cp-text-dark);
}

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