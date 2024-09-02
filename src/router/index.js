import { createRouter, createWebHistory } from 'vue-router'
import FormView from '../views/FormView.vue'
import PreviewView from '../views/PreviewView.vue'

const routes = [
  { path: '/', component: FormView },
  { path: '/preview', component: PreviewView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
