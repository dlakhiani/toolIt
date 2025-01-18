<template>
    <div class="login-page">
        <h1>Login</h1>
        <form
            @submit.prevent="loginUser"
            class="login-form"
        >
            <div class="form-group">
                <label for="email">Email:</label>
                <input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input
                    id="password"
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
                Login
            </button>
        </form>
        <div
            v-if="errorMessage"
            class="error-message"
        >
            {{ errorMessage }}
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "LoginView",
        data() {
            return {
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
                    //need to connect data to the backend and have it saved
                    //only displays data on the console for now
                    this.errorMessage = ""

                    console.log("Login Data:", {
                        email: this.email,
                        password: this.password,
                    })
                    alert("Login successful!")
                } catch (error) {
                    this.errorMessage = "An unexpected error occurred. Please try again."
                }
            },
        },
    })
</script>

<style scoped>
    .login-page {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .form-group {
        margin-bottom: 15px;
        text-align: left;
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
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
    }

    .submit-button:hover {
        background-color: #0056b3;
    }

    .error-message {
        margin-top: 15px;
        color: red;
        font-size: 0.9rem;
    }
</style>
