<template>
    <div id="container" class="svg-container" align="center">
        <svg v-if="redrawToggle === true" :width="svgWidth" :height="svgHeight">
            <g>
                <rect v-for="item in data" class="data-bar" :key="item.label" :x="xScale(0)" :y="yScale(item.label)"
                    :width="0" :height="yScale.bandwidth()" :fill="item.color"></rect>
            </g>
            <g>
                <rect v-for="item in data" class="under-label-bar" :key="item.label" :x="labelColumnWidth"
                    :y="yScale(item.label)" :width="0" :height="yScale.bandwidth()" :fill="item.color"></rect>
            </g>
            <g>
                <text v-for="item in data" class="label-text" :key="item.label" :x="0"
                    :y="yScale(item.label) + yScale.bandwidth() / 2" dx="0.5em" dy="0.25em"
                    font-size="1em" fill-opacity="0">{{ item.label }}</text>
            </g>
            <g>
                <g v-for="item in data" :key="item.label">
                    <text v-if="item.amount > 0.6 * this.dataMax" class="dark amount-text" :x="xScale(item.amount)"
                        :y="yScale(item.label) + yScale.bandwidth() / 2" dx="-0.5em" dy="0.25em" text-anchor="end"
                        fill-opacity="0" font-size="1em">{{ item.amount.toLocaleString() }} {{
                                this.currency
                        }}</text>

                    <text v-else class="light amount-text" :x="xScale(item.amount)"
                        :y="yScale(item.label) + yScale.bandwidth() / 2" dx="0.5em" dy="0.25em" text-anchor="start"
                        fill-opacity="0" font-size="1em">{{ item.amount.toLocaleString() }} {{
                                this.currency
                        }}</text>
                </g>
            </g>
        </svg>
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
        this.animateLoad();
    },
    watch: {
        data: {
            deep: true,
            handler() { this.animateLoad(); }
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
        animateLoad() {
            d3.selectAll(".data-bar")
                .data(this.data)
                .transition()
                .delay((d, i) => i * this.animationStepDuration)
                .duration(this.animationDuration)
                .attr("x", () => this.xScale(0))
                .attr("width", (d) => this.xScale(d.amount) - this.xScale(0));

            d3.selectAll(".under-label-bar")
                .data(this.data)
                .transition()
                .delay((d, i) => i * this.animationStepDuration)
                .duration(this.animationDuration)
                .attr("x", 0)
                .attr("width", this.labelColumnWidth);

            d3.selectAll(".label-text")
                .transition()
                .delay((d, i) => i * this.animationStepDuration)
                .duration(this.animationDuration)
                .attr("x", 0)
                .attr("fill-opacity", 1);

            d3.selectAll(".amount-text")
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
                    this.animateLoad();
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