<template>
    <div class="settings-page">
        <h1>Settings</h1>
        <p>Manage your preferences and account information with ease.</p>

        <!-- Tab Buttons -->
        <div class="button-group">
            <button
                v-for="(tabName, key) in tabs"
                :key="key"
                @click="activeTab = key"
                :class="['button', activeTab === key ? 'active' : '']"
            >
                {{ tabName }}
            </button>
        </div>

        <!-- Locked Height for Consistent Tab Size -->
        <div class="tab-content">
            <div class="tab-container">
                <component :is="activeComponent"></component>
            </div>
        </div>

        <button
            class="prompt-button"
            @click="goToView('/prompt')"
        >
            <img
                src="@/assets/icons/mechy.png"
                alt="Prompt"
            />
        </button>
    </div>
</template>

<script>
    import ProfileTab from "@/components/settings/ProfileTab.vue"
    import UpdatesTab from "@/components/settings/UpdatesTab.vue"
    import DisplayTab from "@/components/settings/DisplayTab.vue"
    import CarInfoTab from "@/views/VehicleInfoView.vue"
    import AboutView from "@/views/AboutView.vue"

    export default {
        data() {
            return {
                tabs: {
                    profile: "Profile",
                    carInfo: "Car Info",
                    updates: "Updates",
                    display: "Display",
                    help: "Help",
                },
                activeTab: "profile",
            }
        },
        computed: {
            activeComponent() {
                const components = {
                    profile: ProfileTab,
                    carInfo: CarInfoTab,
                    updates: UpdatesTab,
                    display: DisplayTab,
                    help: AboutView,
                }
                return components[this.activeTab]
            },
        },
        methods: {
            goToView(route) {
                this.$router.push(route)
            },
        },
    }
</script>

<style scoped>
    /* Settings Page - Fixed Layout */
    .settings-page {
        height: 600px;
        width: 600px;
        margin: 50px auto 0 auto;
        padding: 20px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .tab-content {
        flex-grow: 5;
        height: 400px;
        overflow-y: auto;
        width: 100%;
        text-align: left;
        margin-top: 20px;
    }

    /* Header */
    h1 {
        font-size: 1.8rem;
        margin-bottom: 10px;
    }

    p {
        font-size: 1rem;
        color: #555;
        margin-bottom: 20px;
    }

    /* Button Group */
    .button-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .button {
        flex: 1;
        margin: 0 5px;
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        text-align: center;
        transition: background-color 0.3s ease;
    }

    .button.active {
        background-color: #0056b3;
        font-weight: bold;
    }

    .button:hover {
        background-color: #0056b3;
    }

    .prompt-button {
        position: fixed;
        bottom: 20px;
        left: 20px;
        border: none;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
