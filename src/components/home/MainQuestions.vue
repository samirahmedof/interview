<template>
  <div class="row">
    <div class="col-12">
      <ul class="list-group">
        <Question v-for="question in questions" :key="question.id" :question="question"></Question>
      </ul>
    </div>
    <div class="col-12 text-center mt-3">
      <a href="#" class="btn btn-pr mr-2">Bitir</a>
      <a href="#" class="btn btn-sec">Ləğv et</a>
    </div>
  </div>
</template>
<script>
import Question from "./Question";
export default {
  data() {
    return {
      questions: [
        {
          questionId: "q-1",
          text:
            "Ad aut repellendus unde praesentium officiis quod explicabo quae illum error minus a repellat delectus distinctio ut et nobis, dolor nihil corrupti"
        },
        {
          questionId: "q-2",
          text: "Ad aut"
        },
        {
          questionId: "q-3",
          text: "Ad aut distinctio ut et nobis, dolor nihil corrupti"
        },
        {
          questionId: "q-4",
          text:
            "Ad aut repellendus unde praesentium officiis quod explicabo quae illum error minus a repellat delectus distinctio ut et"
        },
        {
          questionId: "q-5",
          text: "dolor nihil corrupti"
        },
        {
          questionId: "q-6",
          text:
            "Ad aut repellendus unde praesentium officiis quod explicabo quae illum error minus nihil corrupti"
        }
      ]
    };
  },
  components: {
    Question
  }
};
</script>