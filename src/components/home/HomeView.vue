<template>
  <div class="mainView">
    <transition
      enter-active-class="animate__animated animate__zoomIn animate__faster"
      leave-active-class="animate__animated animate__zoomOut animate__faster"
      mode="out-in"
    >
      <div class="row justify-content-center" key="main" v-if="!resultShow">
        <transition
          enter-active-class="animate__animated animate__zoomIn animate__faster"
          leave-active-class="animate__animated animate__zoomOut animate__faster"
          mode="out-in"
        >
          <div class="col-md-6" key="form" v-if="!formComplated">
            <form @submit.prevent="goToQuestions">
              <div class="form-group">
                <label>Ad, Soyad</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{'invalid':checkValid($v.applicant.fullname)}"
                  @blur="$v.applicant.fullname.$touch()"
                  v-model="applicant.fullname"
                />
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
                <button type="submit" class="btn btn-pr" :disabled="$v.applicant.$invalid">Təsdiqlə</button>
              </div>
            </form>
          </div>
          <div class="col-12" key="questions" v-else>
            <MainQuestions
              @cancelInterview="cancelFunc"
              @finishInterview="showResult($event)"
              :applicant="applicant"
            ></MainQuestions>
          </div>
        </transition>
      </div>
      <div class="row justify-content-center" key="result" v-else>
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
          <a class="btn btn-pr" @click.prevent="newInterview">Yeni</a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import MainQuestions from "./MainQuestions";
import { required } from "vuelidate/lib/validators";
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
      } else {
        alert("sehv");
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
    },
    checkValid(e) {
      if (e.$invalid && e.$dirty) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    MainQuestions
  },
  validations: {
    applicant: {
      fullname: {
        required
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.formComplated || this.resultShow) {
      next();
    } else {
      this.$swal
        .fire({
          title: "Müsahibə bitməyib!",
          text: "Nəticə ləğv olunacaq",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#decd00",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Təsdiqlə",
          cancelButtonText: "Geri"
        })
        .then(result => {
          if (result.value) {
            next(true);
          } else {
            next(false);
          }
        });
    }
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