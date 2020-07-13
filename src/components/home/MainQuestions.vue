<template>
  <p class="alert alert-warning" v-if="!exampleArr.length">
    Bazada sual yoxdur. Sual əlavə etmək üçün
    <router-link to="/add">Əlavə et</router-link>
    <span>bölməsinə daxil olun</span>
  </p>
  <div class="row" v-else>
    <div class="col-12">
      <h4>{{applicant.fullname}}, {{applicant.age}}</h4>
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
          v-for="question in exampleArr"
          :key="question.id"
          :question="question"
          @currentQuestionResult="changeResultTable($event)"
        ></Question>
      </ul>
    </div>
    <div class="col-12 text-center mt-3">
      <a href="#" class="btn btn-pr mr-2" @click.prevent="finishInterview">Bitir</a>
      <a href="#" class="btn btn-sec" @click.prevent="cancelInterview">Ləğv et</a>
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
  </div>
</template>
<script>
import Question from "./Question";
import Tags from "./Tags";
import { Draggable } from "draggable-vue-directive";
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
      answeredQuestionStars: []
    };
  },
  directives: {
    Draggable
  },
  created() {
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
h4 {
  text-align: center;
  margin-bottom: 30px;
  color: #ffffff;
  font-weight: 500;
  background: #004085;
  border-radius: 5px;
  padding: 10px;
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