<template>
  <transition
    enter-active-class="animate__animated animate__fadeInLeft animate__faster"
    leave-active-class="animate__animated animate__fadeOutRight animate__faster"
    mode="out-in"
  >
    <tr>
      <td style="width: 50px">{{index+1}}</td>
      <td>{{question.text}}</td>
      <td style="width: 50px;text-align:center">
        <a href="#" class="imgIcon" v-if="question.img" v-b-modal.imgModal @click.prevent="goToImgModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 477.867 477.867"
            style="enable-background:new 0 0 477.867 477.867;"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M426.667,68.267H51.2c-28.277,0-51.2,22.923-51.2,51.2V358.4c0,28.277,22.923,51.2,51.2,51.2h375.467    c28.277,0,51.2-22.923,51.2-51.2V119.467C477.867,91.19,454.944,68.267,426.667,68.267z M443.733,266.001L336.333,158.601    c-6.664-6.663-17.468-6.663-24.132,0L170.667,300.134l-56.201-56.201c-6.664-6.663-17.468-6.663-24.132,0l-56.201,56.201V119.467    c0-9.426,7.641-17.067,17.067-17.067h375.467c9.426,0,17.067,7.641,17.067,17.067V266.001z"
                />
              </g>
            </g>
            <g>
              <g>
                <circle cx="153.6" cy="187.733" r="51.2" />
              </g>
            </g>
          </svg>
        </a>
        <span v-else>-</span>
      </td>
      <td style="width: 100px;text-align:center">{{levelToText()}}</td>
      <td style="width: 100px;text-align:center">{{tagValues()}}</td>
      <td style="width: 100px">
        <a href="#" class="editBtn" v-b-modal.editQuestionModal @click.prevent="goToEditModal">
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
        <a href="#" class="removeBtn" v-b-modal.removeQuestionModal @click.prevent="removeThisRow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            enable-background="new 0 0 512 512"
            height="512"
            viewBox="0 0 512 512"
            width="512"
          >
            <g>
              <path
                d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z"
              />
              <path
                d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z"
              />
            </g>
          </svg>
        </a>
      </td>
    </tr>
  </transition>
</template>
<script>
export default {
  props: ["question", "index"],
  methods: {
    levelToText() {
      switch (this.question.level) {
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
    },
    goToEditModal() {
      this.$emit("currentEditData", this.index);
    },
    goToImgModal(){
      this.$emit("currentImgData", this.index);
    },
    removeThisRow() {
      this.$emit("currentRemoveData", this.index);
    },
    tagValues() {
      var result = "";
      if (this.question.tags) {
        for (let i = 0; i < this.question.tags.length; i++) {
          result += this.question.tags[i];
          if (this.question.tags.length != i + 1) {
            result += ",";
          }
        }
      }

      return result;
    }
  }
};
</script>
<style lang="scss" scoped>
a {
  display: inline-block;
  margin: 0 5px;
  svg {
    width: 18px;
    height: 18px;
  }
  &.editBtn {
    svg path {
      fill: #b7a900;
    }
  }
  &.removeBtn {
    svg path {
      fill: #c00000;
    }
  }
  &.imgIcon {
    svg {
      fill: #004085;
    }
  }
}
</style>