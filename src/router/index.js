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
      {
        path: '/bookmarks',
        name: 'BookmarkedPortfolios',
        component: Main, // 기존 Main 컴포넌트 재사용
        props: { showBookmarks: true }, // 북마크 필터링에 필요한 값 전달
      },
    ],
  },
  {path: '/portfolio/:idx', component: PortfolioDetail},
  { path: '/stock/:idx', component: StockDetail },
  { path: '/stockList', component: StockList },
  // { path: '/editport', component: CreatePortfolio, beforeEnter: checkLogin }, //로그인 되었는지 확인
  { path: '/editport', component: CreatePortfolio},
  { path: '/login', component: Login },
];

// Router Instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;