
import HomeView from './../../components/home/HomeView';
import AddQuestion from './../../components/add/AddQuestion';
import QuestionList from './../../components/list/QuestionList';
import Login from './../../components/login/Login';

export const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: Login },
    { path: '/add', component: AddQuestion },
    { path: '/questions', component: QuestionList },
    { path: '/*', redirect: '/' },
]