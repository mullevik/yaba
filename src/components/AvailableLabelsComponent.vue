<template>
    <section>
        <div>
            <h3>Available labels</h3>
            <input type="text" placeholder="search labels" :value="searchText" @input="e => searchText = e.target.value">
        </div>
        <div class="labels">
            <LabelComponent v-for="(label, index) in filteredLabels" :key="index" :name="label.name" :color="label.color"
                :clickable="true" @click="this.$emit('onLabelSelected', label.name)">
            </LabelComponent>
        </div>
    </section>
</template>

<script>


import { getLabelScoreMap } from '@/localStorageUtils';
import LabelComponent from './LabelComponent.vue';
export default {
    name: "AvailableLabels",
    components: { LabelComponent },
    props: ["modelValue"],
    emits: ["update:modelValue", "onLabelSelected"],
    computed: {
        sortedLabels() {
            return [...this.modelValue].sort((a, b) => {
                return a.name.localeCompare(b.name);
            }).sort((a, b) => {
                const aScore = (a.name in this.labelScoreMap) ? this.labelScoreMap[a.name] : 0;
                const bScore = (b.name in this.labelScoreMap) ? this.labelScoreMap[b.name] : 0;
                if (aScore < bScore) {
                    return 1;
                } else if (aScore > bScore) {
                    return -1;
                } else {
                    return 0
                }
            });
        },
        filteredLabels() {
            return this.sortedLabels.filter(x => x.name.toLowerCase().includes(this.searchText.toLocaleLowerCase()));
        }
    },
    data() {
        return {
            searchText: "",
            labelScoreMap: getLabelScoreMap(),
        }
    }
}
</script>

<style scoped>
section {
    text-align: left;
    padding: 0.5em;
}

div.labels {
    line-height: 1em;
    padding: 0.3em 0 0 0.3em;
}

h3 {
    display: inline-block;
    width: 50%;
    margin: 0;
}

input[type=text] {
    text-align: right;
    box-sizing: border-box;
    width: 50%;
    display: inline-block;
    border: none;
    font-size: 0.95em;
    background-color: transparent;
    padding: 0.6em;
}
</style>