<template>
    <div class="auth-page">
        <!-- Sign In Form (Default) -->
        <div
            v-if="activeTab === 'signin'"
            class="form-section"
        >
            <h1>Sign In</h1>
            <form @submit.prevent="loginUser">
                <div class="form-group">
                    <label>Email:</label>
                    <input
                        v-model="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="submit-button"
                >
                    Sign In
                </button>
            </form>
            <p class="toggle-text">
                Don't have an account?
                <button
                    @click="activeTab = 'signup'"
                    class="link-button"
                >
                    Sign Up
                </button>
            </p>
            <div
                v-if="errorMessage"
                class="error-message"
            >
                {{ errorMessage }}
            </div>
        </div>

        <!-- Sign Up Form -->
        <div
            v-else-if="activeTab === 'signup'"
            class="form-section"
        >
            <h1>Sign Up</h1>
            <form @submit.prevent="registerUser">
                <div class="form-group">
                    <label>Name:</label>
                    <input
                        v-model="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input
                        v-model="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="submit-button"
                >
                    Sign Up
                </button>
            </form>
            <p class="toggle-text">
                Already have an account?
                <button
                    @click="activeTab = 'signin'"
                    class="link-button"
                >
                    Sign In
                </button>
            </p>
            <div
                v-if="errorMessage"
                class="error-message"
            >
                {{ errorMessage }}
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

<style scoped>
    /* General Page Styling */
    .auth-page {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    /* Forms */
    .form-section {
        text-align: left;
    }

    h1 {
        font-size: 1.8rem;
        margin-bottom: 20px;
        text-align: center;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
    }

    .form-group input {
        width: 100%;
        padding: 8px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .submit-button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s ease;
    }

    .submit-button:hover {
        background-color: #0056b3;
    }

    /* Error Message */
    .error-message {
        margin-top: 15px;
        color: red;
        font-size: 0.9rem;
    }

    /* Toggle Text */
    .toggle-text {
        text-align: center;
        margin-top: 10px;
    }

    .link-button {
        background: none;
        border: none;
        color: #007bff;
        cursor: pointer;
        font-size: 1rem;
        text-decoration: underline;
    }

    .link-button:hover {
        color: #0056b3;
    }
</style>
