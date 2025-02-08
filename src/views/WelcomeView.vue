<template>
    <div class="welcome-page">
        <h1>Welcome to ToolIt</h1>
        <p>Manage your vehicle information and settings with ease.</p>
        <div class="button-group">
            <router-link
                to="/signUp"
                class="button"
            >
                Sign Up
            </router-link>
            <router-link
                to="/signIn"
                class="button"
            >
                Sign In
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WelcomePage",
    }
</script>

<style scoped>
    .welcome-page {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    h1 {
        font-size: 1.8rem;
        margin-bottom: 20px;
    }

    p {
        font-size: 1rem;
        color: #555;
        margin-bottom: 20px;
    }

    .button-group {
        display: flex;
        justify-content: space-between;
    }

    .button {
        display: inline-block;
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        text-align: center;
        transition: background-color 0.3s ease;
    }

    .button:hover {
        background-color: #0056b3;
    }
</style>
