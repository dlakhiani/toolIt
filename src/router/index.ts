import { createRouter, createWebHistory } from "vue-router"
import PromptView from "../views/PromptView.vue"
import AboutView from "../views/AboutView.vue"
import SettingsView from "@/views/SettingsView.vue"
import SignUpView from "@/views/SignUpView.vue"
import SignInView from "@/views/SignInView.vue"
import WelcomeView from "@/views/WelcomeView.vue"
import VehicleInfoView from "../views/VehicleInfoView.vue"
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
            path: "/signIn",
            name: "signIn",
            component: SignInView,
        },
        {
            path: "/signUp",
            name: "signUp",
            component: SignUpView,
        },
        {
            path: "/settings",
            name: "settings",
            component: SettingsView,
        },
        {
            path: "/welcome",
            name: "welcome",
            component: WelcomeView,
        },
    ],
})

export default router
