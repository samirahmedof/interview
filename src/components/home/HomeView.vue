<template>
  <div class="row justify-content-center">
    <div class="col-md-6" v-if="!formComplated">
      <div class="form-group">
        <label>Ad, Soyad</label>
        <input type="text" class="form-control" v-model="fullname" />
      </div>
      <div class="form-group text-center">
        <a href="#" class="btn btn-pr" @click="goToQuestions">Təsdiqlə</a>
      </div>
    </div>
    <div class="col-12" v-else>
      <MainQuestions></MainQuestions>
    </div>
  </div>
</template>
<script>
import MainQuestions from "./MainQuestions";
export default {
  data() {
    return {
      fullname: null,
      formComplated: false
    };
  },
  methods: {
    goToQuestions() {
      if (this.fullname) {
        this.formComplated = true;
      }
    }
  },
  components: {
    MainQuestions
  }
};
</script>
<style lang="scss" scoped>
.bootstrap-select.dropup {
  width: 100%;
}
</style>