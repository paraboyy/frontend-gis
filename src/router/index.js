import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/LoginForm.vue'

const routes = [
    {
      path: '/',
      name: 'login',
      component: HomeView
    },
    {
      path: '/register',
      name: 'RegisPanel',
      component: () => import("../components/RegisterForm.vue")
    },
    {
        path: '/tabledata',
        name: 'Tabledta',
        component: () => import("../components/TableData.vue")
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import("../components/DashboardUser.vue")
  },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes // Ganti 'routers' dengan 'routes'
});

export default router;
