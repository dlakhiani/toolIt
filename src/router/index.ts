import { createRouter, createWebHistory } from "vue-router"
import PromptView from "../views/PromptView.vue"
import AboutView from "../views/AboutView.vue"
import CarInfoView from "../views/CarInfoView.vue"
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/prompt",
            name: "prompt",
            component: PromptView,
        },
        {
            path: "/about",
            name: "about",
            component: AboutView,
        },
        {
            path: "/info",
            name: "info",
            component: CarInfoView,
        },
    ],
})

export default router
