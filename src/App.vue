<template>
    <header>
        <h1 class="items-center font-medium font-serif">Tailwind testing</h1>
    </header>
    <div class="max-w-full h-screen flex justify-center items-center p-5 bg-gray-100">
        <router-view />
    </div>
</template>

<script lang="ts">
    export default {
        name: "App",
    }
</script>
