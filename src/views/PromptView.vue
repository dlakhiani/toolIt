<template>
    <div class="prompt-container">
        <!-- Sidebar -->
        <aside :class="['sidebar', { collapsed: isCollapsed }]">
            <button
                class="toggle-sidebar"
                @click="toggleSidebar"
            >
                <span v-if="isCollapsed">☰</span>
                <span v-else>←</span>
            </button>

            <div
                v-if="!isCollapsed"
                class="vehicle-info"
            >
                <img
                    src="@/assets/icons/toyota.jpg"
                    alt="Car Blueprint"
                    class="vehicle-image"
                />
                <p class="vehicle-text">
                    <strong>{{ vehicle.make }} {{ vehicle.model }} ({{ vehicle.year }})</strong>
                </p>
            </div>

            <nav class="quick-actions">
                <h3
                    v-if="!isCollapsed"
                    class="sidebar-title"
                >
                    Prompts
                </h3>
                <button class="quick-button">
                    <span v-if="!isCollapsed"> I have an engine light</span>
                </button>
                <button class="quick-button">
                    <span v-if="!isCollapsed"> Status and Recommendations</span>
                </button>
                <button class="quick-button">
                    <span v-if="!isCollapsed"> I miss you</span>
                </button>
            </nav>

            <button
                class="sidebar-settings-button"
                @click="goToView('/settings')"
            >
                <span v-if="!isCollapsed"> Settings</span>
            </button>
        </aside>

        <!-- Main Chat Section -->
        <main class="chat-section">
            <div class="chat-header">
                <h1>Mechy</h1>
            </div>

            <div class="chat-window">
                <div class="ai-message">
                    <img
                        src="@/assets/icons/mechy.png"
                        alt="Mechy AI"
                        class="ai-icon"
                    />
                    <p>Hey! What seems to be the issue with your car today? 🚗🔧</p>
                </div>
            </div>

            <form class="problem-form">
                <textarea
                    v-model="problem"
                    placeholder="Type a message..."
                    required
                ></textarea>
                <button
                    type="submit"
                    class="submit-button"
                >
                    Send
                </button>
            </form>
        </main>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import { vehicleStore } from "@/stores/vehicle.store"
    import { mapState, mapWritableState } from "pinia"

    export default defineComponent({
        name: "PromptView",
        data() {
            return {
                isCollapsed: false,
            }
        },
        computed: {
            ...mapState(vehicleStore, ["vehicle", "diagnosis"]),
            ...mapWritableState(vehicleStore, ["problem"]),
        },
        methods: {
            goToView(route: string) {
                this.$router.push(route)
            },
            toggleSidebar() {
                this.isCollapsed = !this.isCollapsed
            },
        },
    })
</script>

<style scoped>
    /* Layout */
    .prompt-container {
        display: flex;
        height: 95vh;
        width: 1200px;
        background-color: #f9fafb;
    }

    /* Sidebar */
    .sidebar {
        width: 280px;
        background-color: #0a3f89;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        transition: width 0.3s ease-in-out;
        overflow: hidden;
        position: relative;
    }

    .sidebar.collapsed {
        width: 80px;
        padding: 20px 10px;
    }

    .sidebar-settings-button {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        padding: 12px;
        background-color: #374151;
        color: white;
        font-size: 1rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .sidebar.collapsed .sidebar-settings-button span {
        display: none;
    }

    .sidebar-settings-button:hover {
        background-color: #4b5563;
    }
    .toggle-sidebar {
        background: none;
        border: none;
        color: white;
        font-size: 2.5rem; /* Increase icon size */
        cursor: pointer;
        margin-bottom: 20px;
        padding: 12px; /* Add padding for a bigger click area */
        width: 60px; /* Make button larger */
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
    }

    .toggle-sidebar:hover {
        transform: scale(1.1); /* Slight zoom-in effect */
    }

    .vehicle-info {
        text-align: center;
        margin-bottom: 20px;
        transition: opacity 0.3s ease;
    }

    .vehicle-image {
        width: 100%;
        border-radius: 8px;
        margin-bottom: 10px;
    }

    .vehicle-text {
        font-size: 1rem;
        font-weight: bold;
    }

    .quick-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }

    .quick-button {
        width: 100%;
        padding: 12px;
        background-color: #81a7e6;
        color: white;
        font-size: 1rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: 0.3s;
        text-align: left;
        padding-left: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .quick-button:hover {
        background-color: #4b5563;
    }

    /* Chat Section */
    .chat-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        max-width: 1000px;
        width: 100%;
        margin: 0 auto;
        transition: width 0.3s ease;
    }

    /* Chat Header */
    .chat-header h1 {
        font-size: 1.8rem;
        padding: 5px;
        color: #111827;
        font-weight: bold;
    }

    /* Chat Window */
    .chat-window {
        width: 90%;
        height: 80vh;
        background-color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
    }

    .ai-message {
        display: flex;
        align-items: center;
        background-color: #f1f1f1;
        color: black;
        padding: 12px;
        border-radius: 10px;
        font-size: 1rem;
        max-width: 80%;
        word-wrap: break-word;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    /* AI Icon */
    .ai-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }

    /* Problem Input */
    .problem-form {
        display: flex;
        width: 100%;
        gap: 10px;
        margin-top: 20px;
    }

    .problem-form textarea {
        flex: 1;
        height: 50px;
        padding: 10px;
        font-size: 1rem;
        border: 2px solid #cbd5e1;
        border-radius: 8px;
        background-color: white;
        color: black;
    }

    .submit-button {
        padding: 12px 20px;
        background-color: #2563eb;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        transition: 0.3s;
    }

    .submit-button:hover {
        background-color: #1e40af;
    }
</style>
