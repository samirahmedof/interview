<template>
  <div class="mainView">
    <div class="row justify-content-center" v-if="!resultShow">
      <div class="col-md-6" v-if="!formComplated">
        <form @submit="goToQuestions">
          <div class="form-group">
            <label>Ad, Soyad</label>
            <input type="text" class="form-control" v-model="applicant.fullname" />
          </div>
          <div class="form-group">
            <label>Yaş</label>
            <input type="text" class="form-control" v-model="applicant.age" />
          </div>
          <div class="form-group">
            <label>Biliklər</label>
            <input type="text" class="form-control" v-model="applicant.skills" />
          </div>
          <div class="form-group">
            <label>Qeyd</label>
            <textarea cols="30" rows="3" class="form-control" v-model="applicant.note"></textarea>
          </div>
          <div class="form-group text-center">
            <button type="submit" class="btn btn-pr">Təsdiqlə</button>
          </div>
        </form>
      </div>
      <div class="col-12" v-else>
        <MainQuestions
          @cancelInterview="cancelFunc"
          @finishInterview="showResult($event)"
          :applicant="applicant"
        ></MainQuestions>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-6">
        <div class="resultContent">
          <div class="applicantName">
            <h4>{{applicant.fullname}}</h4>
          </div>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Sual sayı</td>
                <td>{{result.count}}</td>
              </tr>
              <tr>
                <td>Müvəffəqiyyət</td>
                <td>{{result.percent}}</td>
              </tr>
              <tr>
                <td>Çətin</td>
                <td>{{result.level.hard}}</td>
              </tr>
              <tr>
                <td>Orta</td>
                <td>{{result.level.medium}}</td>
              </tr>
              <tr>
                <td>Asan</td>
                <td>{{result.level.easy}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 mt-3 text-center">
        <a href="#" class="btn btn-pr" @click.prevent="newInterview">Yeni</a>
      </div>
    </div>
  </div>
</template>
<script>
import MainQuestions from "./MainQuestions";
export default {
  data() {
    return {
      applicant: {
        fullname: null,
        age: null,
        skills: null,
        note: null
      },
      formComplated: false,
      resultShow: false,
      result: null
    };
  },
  methods: {
    newInterview() {
      this.resultShow = false;
      this.formComplated = false;
      this.applicant.fullname = null;
      this.applicant.age = null;
      this.applicant.skills = null;
      this.applicant.note = null;
    },
    goToQuestions() {
      if (this.applicant.fullname) {
        this.formComplated = true;
      }
    },
    cancelFunc() {
      this.formComplated = false;
      this.applicant.fullname = null;
      this.applicant.age = null;
      this.applicant.skills = null;
      this.applicant.note = null;
    },
    showResult(e) {
      this.result = e;
      this.resultShow = true;
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
.resultContent {
  background: #004085;
  padding: 20px;
  border-radius: 5px;
  color: white;
  .applicantName {
    h4 {
      text-align: center;
      font-size: 30px;
      margin-bottom: 20px;
    }
  }
  table {
    color: white;
    tr {
      td:last-of-type {
        text-align: center;
      }
    }
  }
}
</style>