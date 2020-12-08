import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/lzw',
    name: 'lzw',
    component: () => import('@/views/Lzw.vue')
  },
  {
    path: '/huffman',
    name: 'huffman',
    component: () => import('@/views/Huffman.vue')
  },
  {
    path: '/comparison',
    name: 'comparison',
    component: () => import('@/views/Comparison.vue')
  },
  {
    path: '/string',
    name: 'string',
    component: () => import('@/views/String.vue')
  },
  {
    path: '/file',
    name: 'file',
    component: () => import('@/views/File.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
