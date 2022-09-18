<template>

  <span >
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
  emits: ["onLabelSubmit"],
  data() {
    return {
      text: "",
    }
  },
  watch: {
    text(newText) {
      if (newText.trim().length > 1 && newText.endsWith(" ")) {
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
  color: #d6f1e5ff;
}

input[type=text]:focus {
  outline: none;
  background-color: transparent;
}

input[type=text]::placeholder {
  color: #a4b8af;
}
</style>