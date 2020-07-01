import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        questions: []
    },
    getters: {
        getQuestions(state) {
            return state.questions;
        }
    },
    mutations: {
        changeAllQuestion(state, value) {
            state.questions = value;
        },
        removeSelectedDataFromState(state, value) {
            state.questions.splice(value, 1);
        },
        updateSelectedDataFromState(state, value) {
            var changedIndex = state.questions.findIndex(x => x.id == value.id);

            state.questions[changedIndex].text = value.text;
            state.questions[changedIndex].level = value.level;
        },
        addDataToState(state, value) {
            state.questions.push(value);
        }
    },
    actions: {
        addQuestionList({ commit }) {
            var questionArr = [];
            Vue.http.get("questions.json").then(res => {
                for (var i in res.data) {
                    var currentData = {};
                    currentData.id = i;
                    currentData.level = res.data[i].level;
                    currentData.text = res.data[i].text
                    questionArr.push(currentData);
                }
                commit("changeAllQuestion", questionArr);
            });
        },
        removeSelectedData({ state, commit }, value) {
            var deleteId = state.questions[value].id;
            Vue.http.delete("questions/" + deleteId + ".json").then(res => {
                // console.log(res);
                commit("removeSelectedDataFromState", value);
                Vue.swal.fire({
                    title: "Məlumat silindi",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
            });
        },
        updateSelectedData({ commit }, value) {
            var updatedId = value.id;
            var updatedText = value.text;
            var updatedLevel = value.level;

            Vue.http.put("questions/" + updatedId + ".json", { text: updatedText, level: updatedLevel }).then(res => {
                // console.log(res);
                commit("updateSelectedDataFromState", value);
                Vue.swal.fire({
                    title: "Məlumat dəyişdirildi",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
            });
        },
        addNewQuestion({ commit }, value) {
            Vue.http
                .post("questions.json", {
                    level: value.level,
                    text: value.text
                })
                .then(res => {
                    value.id = res.body.name;
                    commit("addDataToState", value);
                    Vue.swal.fire({
                        title: "Məlumat əlavə olundu",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000
                    });
                });
        }
    }
});