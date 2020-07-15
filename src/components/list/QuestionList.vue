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
              <th>Şəkil</th>
              <th>Çətinlik</th>
              <th>Etiket</th>
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
              @currentImgData="getCurrentImgIndex($event)"
            />
          </tbody>
        </table>
      </div>

      <b-modal
        id="editQuestionModal"
        title="Düzəliş"
        header-bg-variant="warning"
        header-text-variant="light"
      >
        <div class="form-group">
          <label>Sual</label>
          <textarea
            :class="{'invalid':checkValid($v.selectedObj.text)}"
            class="form-control"
            @blur="$v.selectedObj.text.$touch()"
            v-model="selectedObj.text"
          ></textarea>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-6">
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
            <div class="col-6 text-center">
              <div class="imgContainer">
                <img :src="selectedObj.img" />
              </div>
              <input type="file" ref="fileReferance" class="d-none" @change="changeInput" />
              <a href="#" class="btn btn-pr" @click.prevent="uploadFile">Seç</a>
              <a
                href="#"
                class="btn btn-secondary"
                @click.prevent="removeImg"
                v-if="selectedObj.img"
              >Sil</a>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Tags</label>
          <input-tag v-model="selectedObj.tags"></input-tag>
        </div>
        <template v-slot:modal-footer>
          <div class="w-100 text-right">
            <b-button variant="pr" @click="updateCurrentRow" :disabled="$v.$invalid">Təsdiqlə</b-button>
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
      <b-modal id="imgModal" :title="'Sual '+(imgIndex+1)" hide-footer>
        <img :src="imgBase64" />
      </b-modal>
    </div>
  </div>
</template>
<script>
import InputTag from "vue-input-tag";
import QuestionRow from "./QuestionRow";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      editIndex: 0,
      removeIndex: null,
      selectedObj: {
        id: null,
        text: null,
        level: 0,
        tags: [],
        img: null
      },
      imgIndex: null,
      imgBase64: null
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
      if (this.questionList[e].img) {
        this.selectedObj.img = this.questionList[e].img;
      }
    },
    getCurrentRemoveIndex(e) {
      this.removeIndex = e;
    },
    getCurrentImgIndex(e) {
      this.imgIndex = e;
      this.imgBase64 = this.questionList[e].img;
    },
    removeCurrentRow(e) {
      this.$store.commit("setLoader", true);
      this.$store.dispatch("removeSelectedData", this.removeIndex);
      this.$bvModal.hide("removeQuestionModal");
    },
    updateCurrentRow() {
      this.$store.commit("setLoader", true);
      this.$store.dispatch("updateSelectedData", this.selectedObj);
      this.$bvModal.hide("editQuestionModal");
    },
    uploadFile() {
      this.$refs.fileReferance.click();
    },
    changeInput() {
      var imageFile = this.$refs.fileReferance.files[0];
      var fileReader = new FileReader();
      fileReader.onload = this.changeToBase64;
      fileReader.readAsDataURL(imageFile);
    },
    changeToBase64(fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result;
      this.selectedObj.img = srcData;
    },
    removeImg() {
      this.selectedObj.img = null;
    },
    checkValid(e) {
      if (e.$invalid && e.$dirty) {
        return true;
      } else {
        return false;
      }
    }
  },
  validations: {
    selectedObj: {
      text: {
        required
      },
      tags: {
        required,
        minLength: minLength(1)
      }
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
  .imgContainer {
    border: 1px solid;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
<style lang="scss">
#imgModal {
  .modal-body {
    text-align: center;
    img {
      max-width: 100%;
      max-height: 70vh;
    }
  }
}
</style>