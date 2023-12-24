import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../components/pages/Home.vue'
import Edit from '../components/pages/Edit.vue'
import Calcu from '../components/pages/Calcu.vue'

const routerSettings: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/edit",
        name: "edit",
        component: Edit
    },
    {
        path: "/calcu",
        name: "calcu",
        component: Calcu
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routerSettings
})

export default router