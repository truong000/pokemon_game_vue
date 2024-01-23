import type { Router } from 'vue-router'

const checkAuth = (router: Router) => {
  router.beforeEach((to, from, next) => {
    next()
  })

  router.beforeEach((to, from, next) => {
    next()
  })
}

export default checkAuth
