<template>
    <div class="app-container">
        <header>
            <h1>ToolIt</h1>
        </header>
        <router-view></router-view>
    </div>
</template>
  
<script>
    export default {
        name: 'App'
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
  