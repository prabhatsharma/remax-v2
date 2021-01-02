import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'UnloggedHome', component: () => import('../unlogged/UnloggedHome.vue') },
  { path: '/product', name: 'Product', component: () => import('../unlogged/Product.vue') },
  { path: '/about', name: 'About', component: () => import('../unlogged/About.vue') },
  { path: '/home', name: 'Home', component: Home },
  { path: '/auth/signin', name: 'SignIn', component: () => import('../components/SignIn.vue') },
  { path: '/auth/signout', name: 'SignOut', component: () => import('../components/SignOut.vue') },
  { path: '/savedproposals', name: 'SavedProposals', component: () => import('../components/SavedProposals.vue') },
  { path: '/newproposal', name: 'NewProposal', component: () => import('../components/NewProposal.vue') },
  { path: '/comps', name: 'Comps', component: () => import('../components/Comps.vue') },
  { path: '/market', name: 'Market', component: () => import('../components/Market.vue') },
  { path: '/company', name: 'Company', component: () => import('../components/Company.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var unAuthPages = (to.name == 'SignIn') || (to.name == 'UnloggedHome') || (to.name == 'Product') || (to.name == 'About')

  if (!unAuthPages && !store.state.signedIn) next({ name: 'SignIn' })
  else next()
})

export default router
