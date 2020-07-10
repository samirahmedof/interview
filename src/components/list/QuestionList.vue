<template>
  <div class="mainView">
    <div class="row justify-content-center">
      <div class="col-12">
        <p class="alert alert-warning" v-if="!questionList||!questionList.length">Məlumat yoxdur</p>
        <table class="table table-bordered table-hover" v-else>
          <thead class="text-center">
            <tr class="table-active">
              <th class="text-left">№</th>
              <th class="text-left">Sual</th>
              <th>Çətinlik</th>
              <th>Tag</th>
              <th>Düzəliş</th>
            </tr>
          </thead>
          <tbody>
            <QuestionRow
              v-for="(question,index) in questionList"
              :key="question.id"
              :question="question"
              :index="index"
              @currentEditData="getCurrentData($event)"
              @currentRemoveData="getCurrentRemoveIndex($event)"
            />
          </tbody>
        </table>
      </div>

      <b-modal id="editQuestionModal" title="Düzəliş">
        <div class="form-group">
          <label>Sual</label>
          <textarea cols="30" rows="3" class="form-control" v-model="selectedObj.text"></textarea>
        </div>
        <div class="form-group">
          <label for="questionLevel">Çətinlik</label>
          <label for="easyLevel">
            <input
              type="radio"
              name="questionLevel"
              id="easyLevel"
              value="1"
              v-model="selectedObj.level"
            />
            <span>Asan</span>
          </label>
          <label for="middleLevel">
            <input
              type="radio"
              name="questionLevel"
              id="middleLevel"
              value="2"
              v-model="selectedObj.level"
            />
            <span>Orta</span>
          </label>
          <label for="hardLevel">
            <input
              type="radio"
              name="questionLevel"
              id="hardLevel"
              value="3"
              v-model="selectedObj.level"
            />
            <span>Çətin</span>
          </label>
        </div>
        <div class="form-group">
          <label>Tags</label>
          <input-tag v-model="selectedObj.tags"></input-tag>
        </div>
        <template v-slot:modal-footer>
          <div class="w-100 text-right">
            <b-button variant="pr" @click="updateCurrentRow">Təsdiqlə</b-button>
            <b-button variant="secondary" @click="$bvModal.hide('editQuestionModal')">Ləğv et</b-button>
          </div>
        </template>
      </b-modal>
      <b-modal
        id="removeQuestionModal"
        title="Diqqət!"
        header-bg-variant="danger"
        header-text-variant="light"
      >
        <h5>Məlumat silinəcək</h5>
        <template v-slot:modal-footer>
          <div class="w-100 text-right">
            <b-button variant="pr" @click="removeCurrentRow">Təsdiqlə</b-button>
            <b-button variant="secondary" @click="$bvModal.hide('removeQuestionModal')">Ləğv et</b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>
<script>
import InputTag from "vue-input-tag";
import QuestionRow from "./QuestionRow";
export default {
  data() {
    return {
      editIndex: 0,
      removeIndex: null,
      selectedObj: {
        id: null,
        text: null,
        level: 0,
        tags: []
      }
    };
  },
  computed: {
    questionList() {
      return this.$store.getters.getQuestions;
    }
  },
  methods: {
    getCurrentData(e) {
      this.selectedObj.id = this.questionList[e].id;
      this.selectedObj.text = this.questionList[e].text;
      this.selectedObj.level = this.questionList[e].level;
      this.selectedObj.tags = this.questionList[e].tags;
    },
    getCurrentRemoveIndex(e) {
      this.removeIndex = e;
    },
    removeCurrentRow(e) {
      this.$store.dispatch("removeSelectedData", this.removeIndex);
      this.$bvModal.hide("removeQuestionModal");
    },
    updateCurrentRow() {
      this.$store.dispatch("updateSelectedData", this.selectedObj);
      this.$bvModal.hide("editQuestionModal");
    }
  },
  components: {
    QuestionRow,
    InputTag
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