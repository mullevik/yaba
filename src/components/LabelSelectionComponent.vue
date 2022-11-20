<template>
    <div id="container">
        <div class="selected-labels">
            <LabelComponent v-for="(label, index) in modelValue" :key="index" :name="label.name" :color="label.color"
                :removable="true" @on-remove="this.removeLabel(index)">
            </LabelComponent>
            <FreeTextLabelComponent :placeholder="placeholder" @on-label-submit="this.addLabel" @on-text-changed="this.searchText = $event">
            </FreeTextLabelComponent>
        </div>
        <div class="available-labels" v-if="this.isExpanded">
            <AvailableLabelsComponent :available-labels="availableLabels" :search-text="searchText" @on-label-selected="this.selectLabel"
                class="available-labels-section" :style="cssVars">
            </AvailableLabelsComponent>
            <p v-if="!alwaysExpanded" class="hide" @click="isExpanded = false"><i><font-awesome-icon icon="fa-solid fa-angle-up" /> hide</i></p>
        </div>
    </div>
</template>

<script>
import LabelComponent from './LabelComponent.vue';
import FreeTextLabelComponent from './FreeTextLabelComponent.vue';
import AvailableLabelsComponent from './AvailableLabelsComponent.vue'
export default {
    name: "LabelSelectionComponent",
    components: { LabelComponent, FreeTextLabelComponent, AvailableLabelsComponent },
    props: {
        modelValue: {
            default: [],
        },
        availableLabels: {
            default: [],
        },
        alwaysExpanded: {
            default: false,
        }
    },
    emits: ["update:modelValue"],
    computed: {
        placeholder() {
            return this.modelValue.length > 0 ? "... or type a custom label" : "choose labels or start typing";
        },
        // isExpanded() {

        // }
    },
    data() {
        return {
            searchText: "",
            isExpanded: this.alwaysExpanded,
        };
    },
    methods: {
        removeLabel(labelIndex) {
            this.$emit("update:modelValue", this.modelValue.filter((_, index) => index != labelIndex));
        },
        addLabel(name, color = null) {
            const newLabels = this.modelValue.map(x => x);
            newLabels.push({ name: name, color: color })
            this.$emit("update:modelValue", newLabels);
        },
        selectLabel(name) {
            const newLabels = this.modelValue.map(x => x);
            const chosenLabels = this.availableLabels.filter(x => x.name === name);
            if (chosenLabels.length !== 1) {
                console.warn(`Label with name ${name} not found in available labels.`)
            }
            newLabels.push(chosenLabels[0]);
            this.$emit("update:modelValue", newLabels);
        },
    },
    mounted() {
        document.getElementById("container").addEventListener('focusin', () => {this.isExpanded = true;})
    }
}
</script>

<style scoped>
div.container {
    position: relative;
}

div.selected-labels {
    display: block;
    text-align: left;
    box-sizing: border-box;
    line-height: 1em;
    padding: 0.5em 0 0.5em 0.3em;
}
div.available-labels {
    background-color: var(--cp-secondary-middle);
    box-shadow: 0 0px 6px 3px #000000aa;
    min-width: 100%;
}

p.hide {
    cursor: pointer;
    margin: 0;
    padding: 0.5em;
    color: var(--cp-text-light-dimmed);
}
</style>