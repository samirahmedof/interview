<template>
  <div class="row">
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
        <Question v-for="question in exampleArr" :key="question.id" :question="question"></Question>
      </ul>
    </div>
    <div class="col-12 text-center mt-3">
      <a href="#" class="btn btn-pr mr-2" @click="removeEl">Bitir</a>
      <a href="#" class="btn btn-sec">Ləğv et</a>
    </div>
  </div>
</template>
<script>
import Question from "./Question";
import Tags from "./Tags";
export default {
  data() {
    return {
      questions: [],
      questionTags: [],
      exampleArr: [],
      selectedTagsIndex: []
    };
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
    removeEl() {
      this.questions[0].isShow = false;
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
</style>