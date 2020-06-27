
import HomeView from './../../components/home/HomeView';
import AddQuestion from './../../components/add/AddQuestion';
import QuestionList from './../../components/list/QuestionList'

export const routes = [
    { path: '/', component: HomeView },
    { path: '/add', component: AddQuestion },
    { path: '/questions', component: QuestionList }

]