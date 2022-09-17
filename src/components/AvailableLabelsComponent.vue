<template>
<section>
    <h3>Available labels:</h3>
    <div class="labels">
        <LabelComponent v-for="(label, index) in modelValue" :key="index"
        :name="label.name" :color="label.color">
        </LabelComponent>
    </div>
</section>
</template>

<script>
import LabelComponent from './LabelComponent.vue';
export default {
    name: "AvailableLabels",
    components: { LabelComponent },
    props: ["modelValue"],
    emits: ["update:modelValue"],
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