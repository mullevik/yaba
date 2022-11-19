<template>

  <span>
    <input type="text" :placeholder="placeholder" v-model="text">
  </span>

</template>

<script>

export default {
  name: 'FreeTextLabelComponent',
  props: {
    placeholder: {
      default: "... or type a custom label",
      type: String
    },
  },
  emits: ["onLabelSubmit", "onTextChanged"],
  data() {
    return {
      text: "",
    }
  },
  watch: {
    text(newText) {
      this.$emit("onTextChanged", newText.trim());
      if (newText.trim().length > 0 && newText.endsWith(" ")) {
        this.$emit("onLabelSubmit", newText.trim());
        this.text = "";
      }
    }
  }
}
</script>

<style scoped>
input[type=text] {
  width: 13em;
  display: inline-block;
  border: none;
  font-size: 0.95em;
  background-color: transparent;
  padding: 0.6em;
}
</style>