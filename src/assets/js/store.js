import Vue from 'vue';
import { router } from './router';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {},
        isLogged: false
    },
    getters: {
        getQuestions(state) {
            return state.user.questions;
        },
        getIsLogged(state) {
            return state.isLogged;
        }
    },
    mutations: {
        changeUserLog(state, value) {
            state.isLogged = value;
        },
        setUser(state, value) {
            state.user = value;
            state.isLogged = true;
        },

        changeAllQuestion(state, value) {
            state.user.questions = value;
        },
        removeSelectedDataFromState(state, value) {
            state.user.questions.splice(value, 1);
        },
        updateSelectedDataFromState(state, value) {
            var changedIndex = state.user.questions.findIndex(x => x.id == value.id);

            state.user.questions[changedIndex].text = value.text;
            state.user.questions[changedIndex].level = value.level;
        },
        addDataToState(state, value) {
            state.user.questions.push(value);
        },
        getLogout(state) {
            state.isLogged = false;
            state.user = null;
        }
    },
    actions: {
        addNewUser({ }, value) {
            Vue.http
                .post("users.json", {
                    fullname: value.fullname,
                    email: value.email,
                    pass: value.pass1,
                    questions: null
                })
                .then(res => {
                    Vue.swal.fire({
                        title: "Qeydiyyat uğurla başa çatdı",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000
                    });
                });
        },
        checkUserLogin({ commit }, value) {
            var user;
            Vue.http
                .get("users.json")
                .then(res => {
                    for (const i in res.data) {
                        if (res.data[i].email == value.email && res.data[i].pass == value.pass) {
                            user = {
                                id: i,
                                fullname: res.data[i].fullname,
                                email: res.data[i].email,
                                pass: res.data[i].pass,
                                questions: []
                            }
                            for (const j in res.data[i].questions) {
                                var question = res.data[i].questions[j];
                                question.id = j;
                                user.questions.push(question);
                            }
                            break;
                        }
                    }
                    if (user) {
                        commit("setUser", user);
                        localStorage.setItem("interviewUserLogin", user.id);
                        router.push("/");
                    }
                    else {
                        Vue.swal.fire({
                            title: "Belə istifadəçi yoxdur",
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    }
                });

        },
        checkSession({ commit }) {
            var userId = localStorage.getItem('interviewUserLogin');
            if (userId) {
                var user;
                Vue.http
                    .get("users.json")
                    .then(res => {
                        for (const i in res.data) {
                            if (i == userId) {
                                user = {
                                    id: i,
                                    fullname: res.data[i].fullname,
                                    email: res.data[i].email,
                                    pass: res.data[i].pass,
                                    questions: []
                                }
                                for (const j in res.data[i].questions) {
                                    var question = res.data[i].questions[j];
                                    question.id = j;
                                    user.questions.push(question);
                                }
                                break;
                            }
                        }
                        if (user) {
                            commit("setUser", user);
                        }
                    });
            }
            else {
                if (router.history.current.path != '/login')
                    router.push('/login');
            }
        },
        removeSelectedData({ state, commit }, value) {
            var deleteId = state.user.questions[value].id;
            Vue.http.delete("users/" + state.user.id + "/questions/" + deleteId + ".json").then(res => {
                commit("removeSelectedDataFromState", value);
                Vue.swal.fire({
                    title: "Məlumat silindi",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
            });
        },
        updateSelectedData({ state, commit }, value) {
            var updatedId = value.id;
            var updatedText = value.text;
            var updatedLevel = value.level;
            Vue.http.put("users/" + state.user.id + "/questions/" + updatedId + ".json", { text: updatedText, level: updatedLevel }).then(res => {
                commit("updateSelectedDataFromState", value);
                Vue.swal.fire({
                    title: "Məlumat dəyişdirildi",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
            });
        },
        addNewQuestion({ state, commit }, value) {
            Vue.http
                .post(`users/` + state.user.id + `/questions.json`, {
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