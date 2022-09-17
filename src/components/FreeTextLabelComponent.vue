<template>

  <span >
    <input type="text" :placeholder="placeholder" @keyup="onKeyUp" v-model="text">
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
  methods: {
    onKeyUp (event) {
      console.log(event);
      if (event.key === ' ' || event.key === "Enter") {
        this.$emit("onLabelSubmit", this.text.trim());
        this.text = "";
      }
    }
  },

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

input[type=text]:focus {
  outline: none;
  background-color: transparent;
}
</style>