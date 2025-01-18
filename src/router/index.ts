import { createRouter, createWebHistory } from "vue-router"
import PromptView from "../views/PromptView.vue"
import AboutView from "../views/AboutView.vue"
import CarInfoView from "../views/CarInfoView.vue"
import LogInView from "@/views/LogInView.vue"
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
        {
            path: "/logIn",
            name: "logIn",
            component: LogInView,
        },
    ],
})

export default router
