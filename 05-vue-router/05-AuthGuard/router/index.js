import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

/** @implements {import('vue-router').NavigationGuard} */
function authGuard(to) {
  // Гард принимает на вход следующий и предыдущий маршруты. Но нам нужен только следующий

  // Если маршрут требует авторизации, а пользователь не авторизован - переходим на страницу авторизации
  if (to.meta.requireAuth && !isAuthenticated()) {
    // В query параметр from передаём путь запрашиваемой страницы
    return { name: 'login', query: { from: to.fullPath } };
  }

  // Если маршрут требует отсутствия авторизации, а пользователь авторизован - переходим на главную страницу
  if (to.meta.requireGuest && isAuthenticated()) {
    return { name: 'index' };
  }

  // В остальных случаях разрешаем переход без ограничений
  return true;
}

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
      name: 'index',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
      name: 'meetup-create',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      name: 'meetup-edit',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});

// Используем beforeEach гард, чтобы проверять пользователя перед каждым переходом
router.beforeEach(authGuard);

export { router };
