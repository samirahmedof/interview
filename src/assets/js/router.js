
import Vue from 'vue';
import VueRouter from "vue-router";

import HomeView from './../../components/home/HomeView';
import AddQuestion from './../../components/add/AddQuestion';
import QuestionList from './../../components/list/QuestionList';
import Login from './../../components/login/Login';
import Results from './../../components/result/Results';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        { path: '/', component: HomeView },
        { path: '/login', component: Login },
        { path: '/add', component: AddQuestion },
        { path: '/questions', component: QuestionList },
        { path: '/results', component: Results },
        { path: '/*', redirect: '/' },
    ],
    mode: 'history'
})