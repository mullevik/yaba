<template>

  <span :style="cssVars">
    {{name}}
    <button v-if="removable" @click="$emit('onRemove')">X</button>
  </span>

</template>

<script>
import { COLOR } from '@/models';

const DEFAULT_COLOR = COLOR.GRAY;

export default {
  name: 'LabelComponent',
  props: {
    name: {
      required: true,
      type: String
    },
    color: {
      default: DEFAULT_COLOR,
      type: String
    },
    removable: {
      default: false,
      type: Boolean
    },
    clickable: {
      type: Boolean,
      default: true
    },
    miniature: {
      type: Boolean,
      default: false,
    }
  },
  emits: ["onRemove"],
  computed: {
    cssVars() {
      return {
        '--bg': this.color ? this.color : DEFAULT_COLOR,
        '--right-padding': this.removable ? "0.3em" : "0.8em",
        '--cursor': this.clickable ? "pointer" : "default",
        '--font-size': this.miniature ? "0.7em" : "1em",
      }
    }
  }
}

</script>

<style scoped>
span {
  display: inline-block;
  padding: 0.5em var(--right-padding) 0.5em 0.8em;
  border-radius: 2em;
  background-color: var(--bg);
  margin-bottom: 0.3em;
  margin-right: 0.3em;
  color: #040b08ff;
  cursor: var(--cursor);
  font-size: var(--font-size);
}
button {
  border-radius: 50%;
  margin: 0;
  padding: 0.3em 0.3em 0 0.3em;
  background-color: transparent;
  border-width: 0;
  cursor: pointer;
  color: #040b0890;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.25);
}
</style>