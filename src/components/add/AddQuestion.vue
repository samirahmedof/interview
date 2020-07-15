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
        <div class="form-group">
          <label>Şəkil</label>
          <div class="input-group mb-3">
            <input type="text" disabled="true" class="form-control" v-model="image" />
            <div class="input-group-append">
              <a href="#" class="input-group-text" @click.prevent="uploadFile">file</a>
            </div>
          </div>
          <input type="file" ref="fileReferance" class="d-none" @change="changeInput" />
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
      questionTags: [],
      image: null,
      imageBase64: null
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
          tags: this.questionTags,
          img: this.imageBase64
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
    },
    uploadFile() {
      this.$refs.fileReferance.click();
    },
    changeInput() {
      this.image = this.$refs.fileReferance.value;
      var imageFile = this.$refs.fileReferance.files[0];
      var fileReader = new FileReader();
      fileReader.onload = this.changeToBase64;
      fileReader.readAsDataURL(imageFile);
    },
    changeToBase64(fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      this.imageBase64 = srcData;
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
a.input-group-text {
  padding: 0 20px;
  background: #b7a900;
  color: white;
  text-decoration: none;
}
</style>

