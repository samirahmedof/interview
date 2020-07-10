<template>
  <span @click="selectTag" :class="{'filled':fill}">{{tag}}</span>
</template>
<script>
export default {
  props: ["tag", "index"],
  data() {
    return {
      fill: false
    };
  },
  methods: {
    selectTag() {
      this.fill = !this.fill;
      this.$emit("selectedTag", {
        index: this.index,
        show: this.fill
      });
    }
  }
};
</script>
<style  scoped>
span.filled {
  background: #b7a900;
}
</style>
