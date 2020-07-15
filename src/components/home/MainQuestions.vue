<template>
  <p class="alert alert-warning" v-if="!exampleArr.length">
    Bazada sual yoxdur. Sual əlavə etmək üçün
    <router-link to="/add">Əlavə et</router-link>
    <span>bölməsinə daxil olun</span>
  </p>
  <div class="row" v-else>
    <div class="col-12 about">
      <h4>{{applicant.fullname}} {{applicant.age}}</h4>
      <a class="editApplicant" v-b-modal.editApplicantModal>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          width="528.899px"
          height="528.899px"
          viewBox="0 0 528.899 528.899"
          style="enable-background:new 0 0 528.899 528.899;"
          xml:space="preserve"
        >
          <g>
            <path
              d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981   c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611   C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069   L27.473,390.597L0.3,512.69z"
            />
          </g>
        </svg>
      </a>
    </div>
    <div class="col-12">
      <div class="tagsArea">
        <Tags
          v-for="(tag,index) in questionTags"
          :key="tag.id"
          :tag="tag"
          :index="index"
          @selectedTag="getSelectedTag($event)"
        />
      </div>
    </div>
    <div class="col-12">
      <ul class="list-group">
        <Question
          v-for="(question,index) in exampleArr"
          :key="question.id"
          :question="question"
          :index="index"
          @currentImgData="getCurrentImgIndex($event)"
          @currentQuestionResult="changeResultTable($event)"
        ></Question>
      </ul>
    </div>
    <div class="col-12 text-center mt-3">
      <a class="btn btn-pr mr-2" v-b-modal.finishInterviewModal>Bitir</a>
      <a class="btn btn-sec" v-b-modal.cancelInterviewModal>Ləğv et</a>
    </div>
    <div class="currentResults" v-draggable>
      <table>
        <tbody>
          <tr>
            <td>Sual sayı</td>
            <td>{{currentResult.count}}</td>
          </tr>
          <tr>
            <td>Müvəffəqiyyət</td>
            <td>{{currentResult.percent}}</td>
          </tr>
          <tr>
            <td>Çətin</td>
            <td>{{currentResult.level.hard}}</td>
          </tr>
          <tr>
            <td>Orta</td>
            <td>{{currentResult.level.medium}}</td>
          </tr>
          <tr>
            <td>Asan</td>
            <td>{{currentResult.level.easy}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal
      id="cancelInterviewModal"
      title="Diqqət!"
      header-bg-variant="warning"
      header-text-variant="light"
    >
      <h5>Ləğv etmək istədiyinizə əminsiniz?</h5>
      <template v-slot:modal-footer>
        <div class="w-100 text-right">
          <b-button variant="pr" @click="cancelInterview">Təsdiqlə</b-button>
          <b-button variant="secondary" @click="$bvModal.hide('cancelInterviewModal')">Ləğv et</b-button>
        </div>
      </template>
    </b-modal>

    <b-modal
      id="finishInterviewModal"
      title="Diqqət!"
      header-bg-variant="warning"
      header-text-variant="light"
    >
      <h5>Bitirmək istədiyinizə əminsiniz?</h5>
      <template v-slot:modal-footer>
        <div class="w-100 text-right">
          <b-button variant="pr" @click="finishInterview">Təsdiqlə</b-button>
          <b-button variant="secondary" @click="$bvModal.hide('finishInterviewModal')">Ləğv et</b-button>
        </div>
      </template>
    </b-modal>

    <b-modal
      id="editApplicantModal"
      title="Düzəliş"
      header-bg-variant="warning"
      header-text-variant="light"
    >
      <div class="form-group">
        <label>Ad, Soyad</label>
        <input type="text" class="form-control" v-model="editApplicant.fullname" />
      </div>
      <div class="form-group">
        <label>Yaş</label>
        <input type="text" class="form-control" v-model="editApplicant.age" />
      </div>
      <div class="form-group">
        <label>Biliklər</label>
        <input type="text" class="form-control" v-model="editApplicant.skills" />
      </div>
      <div class="form-group">
        <label>Qeyd</label>
        <textarea cols="30" rows="3" class="form-control" v-model="editApplicant.note"></textarea>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100 text-right">
          <b-button variant="pr" @click="acceptEdit">Təsdiqlə</b-button>
          <b-button variant="secondary" @click="cancelEdit">Ləğv et</b-button>
        </div>
      </template>
    </b-modal>

    <b-modal id="questionImgModal" hide-footer size="xl">
      <img :src="imgBase64" />
    </b-modal>
  </div>
</template>
<script>
import Question from "./Question";
import Tags from "./Tags";
import { Draggable } from "draggable-vue-directive";
import { eventBus } from "./../../main";

export default {
  props: ["applicant"],
  data() {
    return {
      questions: [],
      questionTags: [],
      exampleArr: [],
      selectedTagsIndex: [],
      currentResult: {
        count: 0,
        percent: 0,
        level: {
          hard: 0,
          medium: 0,
          easy: 0
        }
      },
      answeredQuestions: [],
      answeredQuestionStars: [],
      editApplicant: {
        fullname: null,
        age: null,
        skills: null,
        note: null
      },
      imgBase64: null
    };
  },
  directives: {
    Draggable
  },
  created() {
    this.editApplicant.fullname = this.applicant.fullname;
    this.editApplicant.age = this.applicant.age;
    this.editApplicant.skills = this.applicant.skills;
    this.editApplicant.note = this.applicant.note;

    this.questions = this.$store.getters.getQuestions;
    this.exampleArr = this.questions;
    var allTags = [];
    for (let i = 0; i < this.questions.length; i++) {
      var tags = this.questions[i].tags;
      for (let j = 0; j < tags.length; j++) {
        allTags.push(tags[j]);
      }
    }
    this.questionTags = [...new Set(allTags)];
    eventBus.$emit("isLogoutShow", false);
  },
  components: {
    Question,
    Tags
  },
  methods: {
    getSelectedTag(e) {
      if (e.show) {
        this.selectedTagsIndex.push(e.index);
      } else {
        for (let i = 0; i < this.selectedTagsIndex.length; i++) {
          if (this.selectedTagsIndex[i] == e.index) {
            this.selectedTagsIndex.splice(i, 1);
          }
        }
      }
    },
    finishInterview() {
      this.$store.commit("setLoader", true);
      var intDate = new Date();

      var d = intDate.getDate();
      var m = intDate.getMonth() + 1;
      var y = intDate.getFullYear();
      var h = intDate.getHours();
      var min = intDate.getMinutes();

      if (d < 10) {
        d = "0" + d;
      }
      if (m < 10) {
        m = "0" + m;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (min < 10) {
        min = "0" + min;
      }
      var dateString = d + "." + m + "." + y + " " + h + ":" + min;
      var finishObj = {
        result: this.currentResult,
        ans: this.answeredQuestions,
        stars: this.answeredQuestionStars,
        about: this.applicant,
        date: dateString
      };
      this.$emit("finishInterview", this.currentResult);
      this.$store.dispatch("addNewResult", finishObj);
    },
    cancelInterview() {
      this.$emit("cancelInterview");
    },
    changeResultTable(e) {
      var resultIndex = this.answeredQuestions.indexOf(e.id);
      if (e.clear) {
        if (resultIndex != -1) {
          this.answeredQuestions.splice(resultIndex, 1);
          this.answeredQuestionStars.splice(resultIndex, 1);
          this.currentResult.count--;
          this.currentResult.percent -= e.starResult;
          switch (e.level) {
            case "1":
              this.currentResult.level.easy--;
              break;
            case "2":
              this.currentResult.level.medium--;
              break;
            case "3":
              this.currentResult.level.hard--;
              break;
          }
        }
      } else {
        if (resultIndex == -1) {
          this.answeredQuestions.push(e.id);
          this.answeredQuestionStars.push(e.starResult);
          this.currentResult.count++;
          switch (e.level) {
            case "1":
              this.currentResult.level.easy++;
              break;
            case "2":
              this.currentResult.level.medium++;
              break;
            case "3":
              this.currentResult.level.hard++;
              break;
          }
        } else {
          this.answeredQuestionStars[resultIndex] += e.starResult;
        }
        this.currentResult.percent += e.starResult;
      }
    },
    acceptEdit() {
      this.applicant.fullname = this.editApplicant.fullname;
      this.applicant.age = this.editApplicant.age;
      this.applicant.skills = this.editApplicant.skills;
      this.applicant.note = this.editApplicant.note;
      this.$bvModal.hide("editApplicantModal");
    },
    cancelEdit() {
      this.editApplicant.fullname = this.applicant.fullname;
      this.editApplicant.age = this.applicant.age;
      this.editApplicant.skills = this.applicant.skills;
      this.editApplicant.note = this.applicant.note;
      this.$bvModal.hide("editApplicantModal");
    },
    getCurrentImgIndex(e) {
      this.imgBase64 = this.questions[e].img;
    }
  },
  watch: {
    selectedTagsIndex(e) {
      if (e.length) {
        var exQuestions = this.questions;
        var showenArr = [];
        firstLoop: for (let i = 0; i < exQuestions.length; i++) {
          var currentQuestionTags = exQuestions[i].tags;
          thirdLoop: for (let j = 0; j < currentQuestionTags.length; j++) {
            secondLoop: for (
              let k = 0;
              k < this.selectedTagsIndex.length;
              k++
            ) {
              if (
                this.questionTags[this.selectedTagsIndex[k]] ==
                currentQuestionTags[j]
              ) {
                showenArr.push(exQuestions[i]);
                break thirdLoop;
              }
            }
          }
        }
        this.exampleArr = showenArr;
      } else {
        this.exampleArr = this.questions;
      }
    }
  },
  beforeDestroy() {
    eventBus.$emit("isLogoutShow", true);
  }
};
</script>
<style lang="scss" scoped>
.tagsArea {
  margin-bottom: 20px;
  user-select: none;
  span {
    cursor: pointer;
    display: inline-block;
    background: #9e9e9e;
    margin-right: 3px;
    color: white;
    padding: 3px 7px;
    border-radius: 5px;
    margin-bottom: 3px;
  }
}
.about {
  position: relative;
  h4 {
    text-align: center;
    margin-bottom: 30px;
    color: #ffffff;
    font-weight: 500;
    background: #004085;
    border-radius: 5px;
    padding: 10px;
  }
  .editApplicant {
    position: absolute;
    right: 28px;
    top: 12px;
    svg {
      width: 18px;
      height: 18px;
      fill: white;
    }
  }
}
.currentResults {
  position: fixed;
  left: calc(100% - 175px);
  top: calc(100% - 210px);
  padding: 10px;
  z-index: 10;
  border-radius: 5px;
  cursor: move;
  user-select: none;
  background: #b7a9004a;
  backdrop-filter: blur(5px);
  table {
    color: #464646;
    tr {
      td {
        padding: 0 7px;
      }
    }
  }
}
</style>
<style lang="scss">
#questionImgModal {
  .modal-body {
    text-align: center;
    img {
      max-width: 100%;
      max-height: 70vh;
    }
  }
}
</style>