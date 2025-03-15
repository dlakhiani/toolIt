<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div class="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <!-- Sign In Form -->
            <div v-if="activeTab === 'signin'">
                <h1 class="text-2xl font-semibold text-center mb-4">Sign In</h1>
                <form
                    @submit.prevent="loginUser"
                    class="space-y-4"
                >
                    <div>
                        <label class="block text-gray-700">Email:</label>
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-gray-700">Password:</label>
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <p class="text-center mt-3 text-gray-600">
                    Don't have an account?
                    <button
                        @click="activeTab = 'signup'"
                        class="text-blue-600 hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
                <div
                    v-if="errorMessage"
                    class="mt-3 text-red-500 text-center"
                >
                    {{ errorMessage }}
                </div>
            </div>

            <!-- Sign Up Form -->
            <div v-else-if="activeTab === 'signup'">
                <h1 class="text-2xl font-semibold text-center mb-4">Sign Up</h1>
                <form
                    @submit.prevent="registerUser"
                    class="space-y-4"
                >
                    <div>
                        <label class="block text-gray-700">Name:</label>
                        <input
                            v-model="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-gray-700">Email:</label>
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-gray-700">Password:</label>
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p class="text-center mt-3 text-gray-600">
                    Already have an account?
                    <button
                        @click="activeTab = 'signin'"
                        class="text-blue-600 hover:underline"
                    >
                        Sign In
                    </button>
                </p>
                <div
                    v-if="errorMessage"
                    class="mt-3 text-red-500 text-center"
                >
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import emailjs from "@emailjs/browser"

    export default defineComponent({
        name: "welcome",
        data() {
            return {
                activeTab: "signin",
                name: "",
                email: "",
                password: "",
                errorMessage: "",
            }
        },
        methods: {
            async loginUser() {
                if (!this.email || !this.password) {
                    this.errorMessage = "Please fill in all fields."
                    return
                }

                try {
                    // Simulated authentication (Replace with real API call)
                    const isValidUser = this.email === "user@example.com" && this.password === "password123"
                    if (!isValidUser) {
                        this.errorMessage = "Invalid email or password."
                        return
                    }

                    this.errorMessage = ""
                    alert("Login successful!")
                    this.sendEmailNotification("Sign In")

                    this.$router.push("/prompt")
                } catch (error) {
                    this.errorMessage = "An unexpected error occurred. Please try again."
                }
            },
            async registerUser() {
                if (!this.name || !this.email || !this.password) {
                    this.errorMessage = "Please fill in all fields."
                    return
                }

                try {
                    // Simulated user registration (Replace with real API call)
                    this.errorMessage = ""
                    alert("Sign up successful!")
                    this.sendEmailNotification("Sign Up")

                    this.$router.push("/info")
                } catch (error) {
                    this.errorMessage = "An unexpected error occurred. Please try again."
                }
            },
            async sendEmailNotification(type: string) {
                try {
                    await emailjs.send(
                        "personal_handy_service",
                        "contact_form_template",
                        {
                            user_name: this.name || "User",
                            user_email: this.email,
                            action: type,
                        },
                        {
                            publicKey: process.env.VITE_EMAIL_PUBLIC_KEY,
                        }
                    )
                    console.log(`${type} email sent successfully!`)
                } catch (error) {
                    console.error(`Failed to send ${type} email:`, error)
                }
            },
        },
    })
</script>
