<template>
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
      <div class="form-group text-center">
        <a href="#" class="btn btn-pr" @click="addToDb">Təsdiqlə</a>
      </div>
    </div>
  </div>
</template>
<script>
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
      questionLevel: null
    };
  },
  methods: {
    addToDb() {
      if (this.questionLevel && this.questionText) {
        this.$http
          .post("questions.json", {
            level: this.questionLevel,
            text: this.questionText
          })
          .then(res => {
            console.log(res);
            this.$swal.fire({
              title: "Məlumat əlavə olundu",
              icon: "success",
              showConfirmButton: false,
              timer: 1000
            });
          });
        this.questionLevel = null;
        this.questionText = null;
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

