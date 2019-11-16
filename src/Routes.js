import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import App from './App';

export default [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        loadData: Home.loadData,
        key: 'home',
      },
      {
        path: '/login',
        component: Login,
        exact: true,
        key: 'login',
      },
      {
        component: NotFound,
      },
    ],
  },
];
