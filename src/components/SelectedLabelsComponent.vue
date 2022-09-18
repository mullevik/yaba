<template>
    <section>
        <h3>Selected labels</h3>
        <div class="labels">
            <LabelComponent v-for="(label, index) in modelValue" :key="index" :name="label.name" :color="label.color"
            :removable="true" @on-remove="this.removeLabel(index)">
            </LabelComponent>
            <FreeTextLabelComponent :placeholder="placeholder" @on-label-submit="this.addLabel"> 
            </FreeTextLabelComponent>
        </div>
    </section>
</template>

<script>
import LabelComponent from './LabelComponent.vue';
import FreeTextLabelComponent from './FreeTextLabelComponent.vue';
export default {
    name: "SelectedLabelsComponent",
    components: { LabelComponent, FreeTextLabelComponent },
    props: ["modelValue"],
    emits: ["update:modelValue"],
    computed: {
        placeholder() {
            return this.modelValue.length > 0 ? "... or type a custom label" : "choose labels or start typing";
        }
    },
    methods: {
        removeLabel(labelIndex) {
            this.$emit("update:modelValue", this.modelValue.filter((_, index) => index != labelIndex));
        },
        addLabel(name, color = null) {
            const newLabels = this.modelValue.map(x => x);
            newLabels.push({name: name, color: color})
            this.$emit("update:modelValue", newLabels);
        }
    }
}
</script>

<style scoped>
h3 {
    margin-top: 0;
}

section {
    text-align: left;
    padding: 0.5em;
}

div.labels {
    display: block;
    box-sizing: border-box;
    line-height: 1em;
    padding: 0.3em 0 0 0.3em;
}
</style>