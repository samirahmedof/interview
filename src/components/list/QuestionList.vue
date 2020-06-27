<template>
  <div class="row justify-content-center">
    <div class="col-12">
      <table class="table table-bordered table-hover">
        <thead class="text-center">
          <tr class="table-active">
            <th class="text-left">№</th>
            <th class="text-left">Sual</th>
            <th>Çətinlik</th>
            <th>Düzəliş</th>
          </tr>
        </thead>
        <tbody>
          <QuestionRow
            v-for="(question,index) in questionList"
            :key="index"
            :question="question"
            :index="index"
            @currentRowData="editIndex=$event"
          />
        </tbody>
      </table>
    </div>

    <b-modal id="editQuestionModal" title="Düzəliş">
      <div class="form-group">
        <label>Sual</label>
        <textarea cols="30" rows="3" class="form-control" v-model="questionList[editIndex].text"></textarea>
      </div>
      <div class="form-group">
        <label for="questionLevel">Çətinlik</label>
        <label for="easyLevel">
          <input type="radio" name="questionLevel" id="easyLevel" value="1" v-model="questionList[editIndex].level" />
          <span>Asan</span>
        </label>
        <label for="middleLevel">
          <input
            type="radio"
            name="questionLevel"
            id="middleLevel"
            value="2"
            v-model="questionList[editIndex].level"
          />
          <span>Orta</span>
        </label>
        <label for="hardLevel">
          <input type="radio" name="questionLevel" id="hardLevel" value="3" v-model="questionList[editIndex].level" />
          <span>Çətin</span>
        </label>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100 text-right">
          <b-button variant="pr">Təsdiqlə</b-button>
          <b-button variant="secondary">Ləğv et</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import QuestionRow from "./QuestionRow";
export default {
  data() {
    return {
      questionList: [],
      questionLevel: "1",
      editIndex: 0
    };
  },
  methods: {
    changeSelect() {
      console.log(1);
    }
  },
  created() {
    this.$http.get("questions.json").then(res => {
      for (var i in res.data) {
        this.questionList.push(res.data[i]);
      }
    });
  },
  components: {
    QuestionRow
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
#editQuestionModal {
  input[type="radio"] {
    width: 17px;
    height: 17px;
  }
}
</style>