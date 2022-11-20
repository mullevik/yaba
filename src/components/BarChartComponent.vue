<template>
    <div id="container" class="svg-container" align="center">
        <svg id="chart" v-if="redrawToggle === true" :width="svgWidth" :height="svgHeight"></svg>
    </div>

</template>
<script>
import * as d3 from 'd3';


export default {
    name: 'BarChartComponent',
    mounted() {
        this.isLandscape = window.innerHeight < window.innerWidth;
        this.svgWidth = document.getElementById("container").offsetWidth;
        this.addResizeListener();
        this.plot();
    },
    watch: {
        data: {
            deep: true,
            handler() { this.plot(); }
        }
    },
    props: ["data", "currency"],
    data() {
        return {
            svgWidth: 0,
            redrawToggle: true,
            animationDuration: 500,
            animationStepDuration: 100,
            isLandscape: true,
            barHeight: 50,
        }
    },
    methods: {
        plot() {
            this.chart = d3.select("#chart");
            this.chart.selectAll(".data-bar")
                .data(this.data)
                .join("rect")
                .attr("class", "data-bar")
                .attr("x", this.xScale(0))
                .attr("y", d => this.yScale(d.label))
                .attr("fill", d => d.color)
                .attr("height", this.yScale.bandwidth())
                .attr("width", 0)
                .transition()
                .delay((d, i) => i * this.animationStepDuration)
                .duration(this.animationDuration)
                .attr("x", () => this.xScale(0))
                .attr("width", (d) => this.xScale(d.amount) - this.xScale(0));

            this.chart.selectAll(".under-label-bar")
                .data(this.data)
                .join("rect")
                .attr("class", "under-label-bar")
                .attr("x", this.labelColumnWidth)
                .attr("y", d => this.yScale(d.label))
                .attr("width", 0)
                .attr("height", this.yScale.bandwidth())
                .attr("fill", d => d.color)
                .transition()
                .delay((d, i) => i * this.animationStepDuration)
                .duration(this.animationDuration)
                .attr("x", 0)
                .attr("width", this.labelColumnWidth);

            this.chart.selectAll(".label-text")
                .data(this.data)
                .join("text")
                .attr("class", "label-text")
                .attr("x", 0)
                .attr("y", d => this.yScale(d.label) + this.yScale.bandwidth() / 2)
                .attr("dx", "0.5em")
                .attr("dy", "0.25em")
                .attr("font-size", "1em")
                .attr("fill-opacity", 0)
                .text(d => d.label)
                .transition()
                .delay((d, i) => i * this.animationStepDuration)
                .duration(this.animationDuration)
                .attr("x", 0)
                .attr("fill-opacity", 1);

            this.chart.selectAll(".amount-text")
                .data(this.data)
                .join("text")
                .attr("class", "light amount-text")
                .attr("font-family", "sans-serif")
                .attr("font-size", "1em")
                .attr("text-anchor", "start")
                .attr("x", d => this.xScale(d.amount))
                .attr("y", d => this.yScale(d.label) + this.yScale.bandwidth() / 2)
                .attr("dx", "0.5em")
                .attr("dy", "0.25em")
                .attr("fill-opacity", 0)
                .text(d => `${d.amount.toLocaleString()} ${this.currency}`)
                .call(selection => selection
                    .filter(d => d.amount > 0.6 * this.dataMax)
                    .attr("text-anchor", "end")
                    .attr("dx", "-0.5em")
                    .attr("dy", "0.25em")
                    .attr("class", "dark amount-text")
                )
                .transition()
                .delay((d, i) => i * this.animationStepDuration)
                .duration(this.animationDuration)
                .attr("fill-opacity", 1);
        },
        addResizeListener() {
            window.addEventListener("resize", () => {
                this.redrawToggle = false;
                setTimeout(() => {
                    this.isLandscape = window.innerHeight < window.innerWidth;
                    this.redrawToggle = true;
                    this.svgWidth = document.getElementById("container").offsetWidth;
                    this.plot();
                }, 300);
            });
        },
    },
    computed: {
        dataMax() {
            return d3.max(this.data, d => d.amount);
        },
        dataMin() {
            return d3.min(this.data, d => d.amount);
        },
        svgHeight() {
            return this.data.length * this.barHeight;
        },
        yScale() {
            return d3.scaleBand().range([0, this.svgHeight]).padding(0.1).domain(this.data.map((d) => d.label));
        },
        labelColumnWidth() {
            return this.isLandscape ? this.svgWidth / 5 : this.svgWidth / 2.3;
        },
        xScale() {
            return d3.scaleLinear().range([this.labelColumnWidth + 1, this.svgWidth]).domain([0, this.dataMax]);
        }
    }
}
</script>

<style>
.svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 1%;
    vertical-align: top;
    overflow: hidden;
}

.light.amount-text {
    fill: var(--cp-text-light);
}

.dark.amount-text {
    fill: var(--cp-text-dark);
}

.label-text {
    fill: var(--cp-text-dark);
    transition: r 0.2s ease-on-out;
}

.data-bar {
    transition: r 0.2s ease-in-out;
}

.under-label-bar {
    transition: r 0.1s ease-in-out;
}
</style>