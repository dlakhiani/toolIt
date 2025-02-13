<template>
    <div class="app-container">
        <header>
            <h1>ToolIt</h1>
            <br />
            <nav class="nav-bar">
                <ul>
                    <li>
                        <router-link to="/info">Vehicle Info</router-link>
                    </li>
                    <li>
                        <router-link to="/prompt">Problem Prompt</router-link>
                    </li>
                    <li>
                        <router-link to="/settings">Settings Page</router-link>
                    </li>
                    <li>
                        <router-link to="/welcome">Welcome Page</router-link>
                    </li>
                </ul>
            </nav>
        </header>
        <router-view />
    </div>
</template>

<script lang="ts">
    export default {
        name: "App",
    }
</script>

<style scoped>
    .app-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    header {
        text-align: center;
        margin-bottom: 2rem;
    }

    h1 {
        color: #2c3e50;
    }
</style>
