import { createRouter, createWebHistory } from "vue-router"
import PromptView from "@/views/PromptView.vue"
import AboutView from "@/views/AboutView.vue"
import SettingsView from "@/views/SettingsView.vue"
import WelcomeView from "@/views/WelcomeView.vue"
import VehicleInfoView from "@/views/VehicleInfoView.vue"
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
            component: VehicleInfoView,
        },
        {
            path: "/settings",
            name: "settings",
            component: SettingsView,
        },
        {
            path: "/",
            name: "welcome",
            component: WelcomeView,
        },
    ],
})

export default router
