<template>
  <li
    class="list-group-item"
    :class="[{'easy':question.level=='1'},{'medium':question.level=='2'},{'hard':question.level=='3'},{'hasImg':question.img},{'complatedQuestion':isQuestionAnswered()}]"
  >
    <div class="contentArea">
      <div class="questionText">
        <p>{{question.text}}</p>
      </div>
      <div class="tagDiv">
        <span v-for="tag in question.tags" :key="tag.id">{{tag}}</span>
      </div>
      <div class="questionLevel">{{levelToText()}}</div>
    </div>
    <div class="questionResult">
      <div class="row h-100 align-items-center">
        <div class="col-6">
          <div class="starArea text-center">
            <ul>
              <li v-for="(count,index) in starCount" :key="count">
                <a
                  href="#"
                  class="starIcon"
                  @click.prevent="fillStars(index)"
                  :class="{'filled':count<=questionStars}"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Capa_1"
                    enable-background="new 0 0 512.07 512.07"
                    height="512"
                    viewBox="0 0 512.07 512.07"
                    width="512"
                  >
                    <g>
                      <path
                        d="m509.759 194.639c-6.152-18.858-22.945-31.043-42.781-31.043h-127.918l-40.282-122.33c-6.192-18.805-22.95-30.926-42.729-30.926-.063 0-.128 0-.191.001-19.86.078-36.611 12.349-42.674 31.262l-39.108 121.993h-128.983c-19.886 0-36.692 12.226-42.814 31.146-6.123 18.92.335 38.674 16.453 50.324l104.361 75.434-40.17 121.991c-6.217 18.88.133 38.662 16.177 50.396 8.058 5.894 17.307 8.842 26.562 8.842 9.171-.001 18.347-2.897 26.365-8.693l104.542-75.563 103.3 75.436c16.026 11.704 36.781 11.76 52.873.147s22.575-31.328 16.518-50.227l-39.218-122.329 103.474-75.563c16.02-11.698 22.396-31.441 16.243-50.298z"
                      />
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-6">
          <div class="btnArea">
            <a href="#" title="Cavab verilmədi" @click.prevent="canNotAnswer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 492 492"
                style="enable-background:new 0 0 492 492;"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M465.064,207.562H26.908C12.076,207.562,0,219.698,0,234.53v22.804c0,14.832,12.072,27.104,26.908,27.104h438.156    c14.84,0,26.936-12.272,26.936-27.104V234.53C492,219.698,479.904,207.562,465.064,207.562z"
                    />
                  </g>
                </g>
              </svg>
            </a>
            <a href="#" title="Təmizlə" @click.prevent="clearResult">
              <svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 16 16" width="512">
                <path
                  d="m12 8c0-1.6543-1.3457-3-3-3h-1.36731l.359497-2.87598c.0053711-.0410156.0078125-.0825195.0078125-.124023 0-1.10303-.896973-2-2-2-1.10303 0-2 .896973-2 2 0 .0415039.0024414.0830078.0078125.124023l.359497 2.87598h-1.36731c-1.6543 0-3 1.3457-3 3v1h12v-1zm-6-6.5c.276123 0 .5.223816.5.5 0 .276123-.223877.5-.5.5s-.5-.223877-.5-.5c0-.276184.223877-.5.5-.5z"
                  transform="translate(2)"
                />
                <path
                  d="m12.1324 0h-10.2648c-.44165 3.49347-1.86761 6-1.86761 6h1.96191c.82373-.945068 1.53809-2.07788 1.53809-2.5.311401.934204.428711 1.86768.473022 2.43951 1.02301-1.27966 1.927-2.86108 1.927-3.43951.420288 1.401.544067 2.78644.581787 3.5h1.5412c.0402221-.563965.153137-1.52844.47699-2.5 0 .422119.714355 1.55493 1.53809 2.5h3.96191s-1.42596-2.50653-1.86761-6z"
                  transform="translate(1 10)"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="imgArea"
      v-if="question.img"
      v-b-modal.questionImgModal
      @click.prevent="goToImgModal"
    >
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
    </div>
  </li>
</template>
<script>
export default {
  props: ["question", "index"],
  data() {
    return {
      starCount: 5,
      isComplated: false,
      questionStars: 0,
      sendedCount: 0
    };
  },
  methods: {
    fillStars(index) {
      if (this.questionStars != index + 1) {
        this.questionStars = index + 1;
        this.isComplated = true;

        var sendObj = {
          id: this.question.id,
          level: this.question.level,
          starResult: this.questionStars,
          clear: false
        };

        this.$emit("currentQuestionResult", sendObj);
      }
    },
    clearResult() {
      if (this.isComplated == true) {
        this.questionStars = 0;
        this.isComplated = false;
        var sendObj = {
          id: this.question.id,
          level: this.question.level,
          starResult: this.questionStars,
          clear: true
        };
        this.$emit("currentQuestionResult", sendObj);
      }
    },
    canNotAnswer() {
      this.questionStars = 0;
      this.isComplated = true;
      var sendObj = {
        id: this.question.id,
        level: this.question.level,
        starResult: this.questionStars,
        clear: false
      };

      this.$emit("currentQuestionResult", sendObj);
    },
    levelToText() {
      switch (this.question.level) {
        case "1":
          return "A";
          break;
        case "2":
          return "O";
          break;
        case "3":
          return "Ç";
          break;
      }
    },
    goToImgModal() {
      this.$emit("currentImgData", this.index);
    },
    isQuestionAnswered() {
      if (this.isComplated) {
        return true;
      }
      if (this.question.answered) {
        this.isComplated = true;
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    if (this.question.answered) {
      this.questionStars = this.question.stars;
    }
  }
};
</script>
<style lang="scss" scoped>
li {
  position: relative;
  margin-bottom: 1px;
  .questionResult {
    transition: all 0.2s;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: #91a7bfeb;
    top: 0;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
    & > .row {
      padding: 5px 15px;
    }
  }
  .btnArea {
    text-align: right;
    a {
      color: white;
      display: inline-block;
      border-radius: 5px;
      &:first-of-type {
        background: #721c24;
      }
      &:last-of-type {
        background: #b7a900;
      }
      svg {
        width: 25px;
        height: 15px;
        fill: white;
      }
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .starArea {
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style-type: none;
        display: inline-block;
        margin: 0 2px;
        .starIcon {
          svg {
            width: 20px;
            height: 20px;
            path {
              fill: #e4e4e4;
            }
          }
          &.filled {
            path {
              fill: #ffd147;
            }
          }
        }
      }
    }
  }

  &.complatedQuestion {
    background: #94bd9e !important;
    color: white !important;
    .imgArea {
      background: #94bd9e !important;
      svg {
        fill: white !important;
      }
    }
  }
  .tagDiv {
    span {
      display: inline-block;
      background: #00408599;
      margin-right: 3px;
      color: white;
      padding: 0px 5px;
      border-radius: 5px;
      margin-bottom: 3px;
      font-size: 12px;
    }
  }
  .questionText p {
    margin-bottom: 5px;
    font-size: 17px;
    line-height: 23px;
  }
  .questionLevel {
    position: absolute;
    right: 0;
    top: 0;
    width: 100;
    height: 100%;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  &.hard {
    border-color: #900505;
    background: #f4e6e6;
    .questionLevel {
      background: #900505;
    }
    .imgArea {
      background: #f4e6e6;
      border-color: #900505;
    }
  }
  &.medium {
    border-color: #959d01;
    background: #f4f5e5;
    .questionLevel {
      background: #959d01;
    }
    .imgArea {
      background: #f4f5e5;
      border-color: #959d01;
    }
  }
  &.easy {
    background: #e5f3e7;
    border-color: #008a10;
    .questionLevel {
      background: #008a10;
    }
    .imgArea {
      background: #e5f3e7;
      border-color: #008a10;
    }
  }
  &.hasImg {
    border-top-left-radius: 0;
  }
  .imgArea {
    position: absolute;
    left: -30px;
    top: -1px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px 0 0 5px;
    border-radius: 5px 0 0 5px;
    border: 1px solid;
    border-right: none;
    svg {
      width: 20px;
      height: 20px;
      fill: #004085;
    }
  }
}
</style>