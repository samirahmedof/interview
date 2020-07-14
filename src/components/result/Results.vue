<template>
  <div class="mainView">
    <div class="row justify-content-center">
      <div class="col-12">
        <p class="alert alert-warning" v-if="!applicantList||!applicantList.length">Məlumat yoxdur</p>
        <table class="table table-bordered table-hover" v-else>
          <thead class="text-center">
            <tr class="table-active">
              <th class="text-left">№</th>
              <th class="text-left">Namizəd</th>
              <th>Nəticə</th>
              <th>Tarix</th>
              <th>Sil</th>
            </tr>
          </thead>
          <tbody>
            <Result
              v-for="(applicant,index) in applicantList"
              :key="applicant.id"
              :index="index"
              :applicant="applicant"
              @removeIndex="removeIndex=$event"
              @moreInfo="getMoreInfoModal($event)"
            />
          </tbody>
        </table>
      </div>

      <b-modal
        id="moreInfoModal"
        :title="selectedRow.about.fullname"
        size="lg"
        @hide="clearInfoModal"
        header-class="headerColor"
        scrollable
      >
        <div class="row">
          <div class="col-6">
            <table class="table table-bordered aboutApplicant">
              <thead>
                <tr>
                  <th colspan="2" class="text-center">Namizəd</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ad,Soyad</td>
                  <td>{{selectedRow.about.fullname}}</td>
                </tr>
                <tr>
                  <td>Yaş</td>
                  <td>{{selectedRow.about.age}}</td>
                </tr>
                <tr>
                  <td>Biliklər</td>
                  <td>{{selectedRow.about.skills}}</td>
                </tr>
                <tr>
                  <td>Qeyd</td>
                  <td>{{selectedRow.about.note}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-6">
            <table class="table table-bordered aboutQuestion">
              <thead>
                <tr>
                  <th colspan="2" class="text-center">Suallar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sual</td>
                  <td>{{selectedRow.result.count}}</td>
                </tr>
                <tr>
                  <td>Asan</td>
                  <td>{{selectedRow.result.level.easy}}</td>
                </tr>
                <tr>
                  <td>Orta</td>
                  <td>{{selectedRow.result.level.medium}}</td>
                </tr>
                <tr>
                  <td>Çətin</td>
                  <td>{{selectedRow.result.level.hard}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <table class="table table-bordered questions">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Sual</th>
                  <th>Qiymət</th>
                  <th>Çətinlik</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(question, index) in selectedRow.questions"
                  :key="index"
                  :class="[{'easy':question.level=='1'},{'medium':question.level=='2'},{'hard':question.level=='3'}]"
                >
                  <td>{{index+1}}</td>
                  <td>{{question.text}}</td>
                  <td>{{question.star}}</td>
                  <td class="questionLevel">{{getLevelText(question.level)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <template v-slot:modal-footer>
          <div class="w-100 text-right">
            <b-button variant="secondary" @click="$bvModal.hide('moreInfoModal')">Bağla</b-button>
          </div>
        </template>
      </b-modal>

      <b-modal
        id="removeResultModal"
        title="Diqqət!"
        header-bg-variant="danger"
        header-text-variant="light"
        @hide="removeIndex=null"
      >
        <h5>Məlumat silinəcək</h5>
        <template v-slot:modal-footer>
          <div class="w-100 text-right">
            <b-button variant="pr" @click="removeCurrentRow">Təsdiqlə</b-button>
            <b-button variant="secondary" @click="$bvModal.hide('removeResultModal')">Ləğv et</b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>
<script>
import Result from "./Result";
export default {
  data() {
    return {
      removeIndex: null,
      selectedRow: {
        about: {
          fullname: null,
          age: null,
          skills: null,
          note: null
        },
        result: {
          count: null,
          level: {
            easy: null,
            medium: null,
            hard: null
          }
        },
        questions: []
      }
    };
  },
  computed: {
    applicantList() {
      return this.$store.getters.getApplicants;
    }
  },
  methods: {
    removeCurrentRow() {
      this.$store.commit("setLoader", true);
      this.$store.dispatch("removeResult", this.removeIndex);
      this.$bvModal.hide("removeResultModal");
    },
    getMoreInfoModal(e) {
      var selectedApplicant = this.applicantList[e];
      this.selectedRow.about.fullname = selectedApplicant.about.fullname;
      this.selectedRow.about.age = selectedApplicant.about.age;
      this.selectedRow.about.skills = selectedApplicant.about.skills;
      this.selectedRow.about.note = selectedApplicant.about.note;

      this.selectedRow.result.count = selectedApplicant.result.count;
      this.selectedRow.result.level.easy = selectedApplicant.result.level.easy;
      this.selectedRow.result.level.medium =
        selectedApplicant.result.level.medium;
      this.selectedRow.result.level.hard = selectedApplicant.result.level.hard;
      var allQuestions = this.$store.getters.getQuestions;
      if (selectedApplicant.ans) {
        for (let i = 0; i < selectedApplicant.ans.length; i++) {
          for (let j = 0; j < allQuestions.length; j++) {
            if (allQuestions[j].id == selectedApplicant.ans[i]) {
              var currQuestion = allQuestions[j];
              currQuestion.star = selectedApplicant.stars[i];
              this.selectedRow.questions.push(currQuestion);
              break;
            }
          }
        }
      }

      this.$bvModal.show("moreInfoModal");
    },
    clearInfoModal() {
      this.selectedRow.about.fullname = null;
      this.selectedRow.about.age = null;
      this.selectedRow.about.skills = null;
      this.selectedRow.about.note = null;
      this.selectedRow.questions = [];
      this.selectedRow.result.count = null;
      this.selectedRow.result.level.easy = null;
      this.selectedRow.result.level.medium = null;
      this.selectedRow.result.level.hard = null;
    },
    getLevelText(e) {
      switch (e) {
        case "1":
          return "Asan";
          break;
        case "2":
          return "Orta";
          break;
        case "3":
          return "Çətin";
          break;
      }
    }
  },
  components: {
    Result
  }
};
</script>
<style lang="scss" scoped>
thead {
  th {
    position: sticky;
  }
}
label {
  display: flex;
  align-items: center;
  font-size: 18px;
  span {
    margin: 3px 0 0 5px;
    font-size: 16px;
  }
}
</style>
<style lang="scss">
#moreInfoModal {
  table {
    font-size: 14px;
    td {
      padding: 5px 15px;
    }
    thead {
      tr {
        background: #848484;
        color: white;
        th {
          padding: 5px 10px;
        }
      }
    }
    &.aboutApplicant {
      tr td:first-of-type {
        width: 100px;
      }
    }
    &.aboutQuestion {
      tbody tr {
        td:last-of-type {
          width: 50px;
          text-align: center;
        }
        &:nth-of-type(2) {
          background: #64b068;
          color: white;
        }
        &:nth-of-type(3) {
          background: #c3c76f;
          color: white;
        }
        &:last-of-type {
          background: #b35353;
          color: white;
        }
      }
    }
    &.questions {
      tr {
        td:first-of-type {
          width: 40px;
        }
        td:nth-of-type(3) {
          width: 70px;
          text-align: center;
        }
        td:last-of-type {
          width: 70px;
          text-align: center;
          color: white;
        }
        &.hard {
          border-color: #b35353;
          background: rgba(144, 5, 5, 0.1);
          .questionLevel {
            background: #b35353;
          }
        }
        &.medium {
          border-color: #c3c76f;
          background: rgba(149, 157, 1, 0.1);
          .questionLevel {
            background: #c3c76f;
          }
        }
        &.easy {
          background: rgba(0, 138, 16, 0.1);
          border-color: #64b068;
          .questionLevel {
            background: #64b068;
          }
        }
      }
    }
  }
  .modal-header {
    background: #b7a900;
    color: white;
  }
}
</style>