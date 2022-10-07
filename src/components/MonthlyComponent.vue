<template>
    <p>Monthly component</p>
    <div>
        <svg id="monthly-labels"></svg>
    </div>

</template>
<script>
import { COLOR, LABELS } from '@/models';
import * as d3 from 'd3';

const LABEL_COLOR_MAP = {}
for (const label of LABELS) {
    LABEL_COLOR_MAP[label.name] = label.color;
}

const rawData = {
    "rows": [
        [Math.floor(new Date().getTime() / 1000), 100, "CZK", "some body"],
        [Math.floor(new Date().getTime() / 1000), 200, "CZK", "food"],
        [Math.floor(new Date().getTime() / 1000), 300, "CZK", "told me some"],
        [Math.floor(new Date().getTime() / 1000), 1, "CZK", "new"],
    ],
    "column_names": ["unix_timestamp", "amount", "currency", "labels"]
}

function transform(data) {
    const aggregatedResults = {};
    for (const row of data["rows"]) {
        const labels = row[3];
        const amount = row[1];
        for (const label of labels.split(" ")) {
            aggregatedResults[label] = label in aggregatedResults ? aggregatedResults[label] + amount : amount;
        }
    }
    const results = [];
    for (const [key, value] of Object.entries(aggregatedResults)) {
        results.push({ "label": key, "amount": value, "color": key in LABEL_COLOR_MAP ? LABEL_COLOR_MAP[key] : COLOR.GRAY})
    }
    return results.sort((a, b) => a["amount"] > b["amount"] ? 1 : (a["amount"] < b["amount"] ? -1 : 0));
}
export default {
    name: 'MonthlyComponent',

    mounted() {
        const data = transform(rawData)
        console.log(data);
        const labelNameWidth = 100;
        const width = 800;
        const height = 500;
        const svg = d3.select("#monthly-labels")
            .attr("preserveAspectRatio", "xMinYMin meet")
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
</style>