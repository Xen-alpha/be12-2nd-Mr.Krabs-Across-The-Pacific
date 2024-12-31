import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '../stores/useUserStore';

// Import Components
import Main from '../common/Main.vue';
import PortfolioDetail from '../portfolio/PortfolioDetail.vue';
import StockDetail from '../stock/StockDetail.vue';
import UserPort from '../common/UserPort.vue';
import CreatePortfolio from '../portfolio/PortCreate.vue';
import StockList from '../stock/StockList.vue';
import Login from '../user/Login.vue';
import Error404 from '../components/404Page.vue'

// Login Check Middleware
const checkLogin = async (to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = await userStore.checkLogin();
  console.log(isLoggedIn);
  if (isLoggedIn) {
    next();
  } else {
    next('/login');
  }
};

// Routes Configuration
const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        component: Main,
      },
      {
        path: 'portfoliolist/:username',
        components: {
          default: Main,
          user: UserPort,
        },
        props: {
          user: true,
        },
      },
    ],
  },
  {path: '/portfolio/:idx', component: PortfolioDetail},
  { path: '/stock/:idx', component: StockDetail },
  { path: '/stockList', component: StockList },
  // { path: '/editport', component: CreatePortfolio, beforeEnter: checkLogin }, //로그인 되었는지 확인
  { path: '/editport', component: CreatePortfolio},
  { path: '/login', component: Login },
  {
      path: '/:pathMatch(.*)*', // 기타 존재하지 않는 페이지인 경우
      redirect: "/404"
  },
  {
    path:'/404', component: Error404
  }
];

// Router Instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;