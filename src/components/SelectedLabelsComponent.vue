<template>
    <section>
        <h3>Selected labels:</h3>
        <div class="labels">
            <LabelComponent v-for="(label, index) in modelValue" :key="index" :name="label.name" :color="label.color"
            :removable="true" @on-remove="this.removeLabel(index)">
            </LabelComponent>
            <FreeTextLabelComponent @on-label-submit="this.addLabel"> 
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
section {
    text-align: left;
}

div.labels {
    line-height: 1em;
    padding: 0.3em 0 0 0.3em;
}
</style>