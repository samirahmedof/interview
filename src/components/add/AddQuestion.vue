<template>
  <div class="mainView">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="form-group">
          <label>Sual</label>
          <textarea
            :class="{'invalid':checkValid($v.questionText)}"
            class="form-control"
            @blur="$v.questionText.$touch()"
            v-model="questionText"
          ></textarea>
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
          <label>Etiket</label>
          <input-tag v-model="questionTags"></input-tag>
        </div>
        <div class="form-group text-center">
          <button :disabled="$v.$invalid" class="btn btn-pr" @click.prevent="addToDb">Təsdiqlə</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputTag from "vue-input-tag";
import { required, minLength } from "vuelidate/lib/validators";

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
      this.$store.commit("setLoader", true);
      if (this.questionLevel && this.questionText && this.questionTags.length) {
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
      } else {
        this.$store.commit("setLoader", false);
        alert("sehv");
      }
    },
    changeSelect({ data, text }) {
      this.questionLevel = data[0].value;
      this.defaultSelectText = text;
    },
    checkValid(e) {
      if (e.$invalid && e.$dirty) {
        return true;
      } else {
        return false;
      }
    }
  },
  validations: {
    questionText: {
      required
    },
    questionLevel: {
      required
    },
    questionTags: {
      required,
      minLength: minLength(1)
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

