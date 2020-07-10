<template>
  <div class="mainView">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="form-group">
          <label>Sual</label>
          <textarea class="form-control" v-model="questionText"></textarea>
        </div>
        <div class="form-group">
          <label>Səviyyə</label>
          <select-picker
            :dropdown-data="dropdownData"
            v-model="defaultSelectText"
            @change="changeSelect"
          />
        </div>
        <div class="form-group">
          <label>Tag</label>
          <input-tag v-model="questionTags"></input-tag>
        </div>
        <div class="form-group text-center">
          <a href="#" class="btn btn-pr" @click.prevent="addToDb">Təsdiqlə</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputTag from "vue-input-tag";
export default {
  data() {
    return {
      dropdownData: [
        { text: "Asan", value: "1" },
        { text: "Orta", value: "2" },
        { text: "Çətin", value: "3" }
      ],
      defaultSelectText: "Seç",
      questionText: null,
      questionLevel: null,
      questionTags: []
    };
  },
  components: {
    InputTag
  },
  methods: {
    addToDb() {
      if (this.questionLevel && this.questionText) {
        var currObj = {
          level: this.questionLevel,
          text: this.questionText,
          tags: this.questionTags
        };
        this.$store.dispatch("addNewQuestion", currObj);
        this.questionLevel = null;
        this.questionText = null;
        this.questionTags = [];
        this.defaultSelectText = "Seç";
      }
    },
    changeSelect({ data, text }) {
      this.questionLevel = data[0].value;
      this.defaultSelectText = text;
    }
  }
};
</script>
<style lang="scss" scoped>
.changeSelectpicker {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
    fill: #004085;
  }
}
</style>

