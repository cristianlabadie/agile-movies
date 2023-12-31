import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import NotFound from '@/views/NotFound.vue'
import { useMoviesStore } from '@/stores/movies'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/movie/:id',
      name: 'MovieDetail',
      component: MovieDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to) => {
  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.logged) return '/login'
})

export default router
