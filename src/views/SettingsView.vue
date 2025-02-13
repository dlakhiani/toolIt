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

        <div class="tab-content">
            <component :is="activeComponent"></component>
        </div>
    </div>
</template>

<script>
    import ProfileTab from "@/components/settings/ProfileTab.vue"
    import UpdatesTab from "@/components/settings/UpdatesTab.vue"
    import DisplayTab from "@/components/settings/DisplayTab.vue"
    import CarInfoTab from "@/components/settings/CarInfoTab.vue"
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
    }
</script>

<style scoped>
    .settings-page {
        max-width: 600px;
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
        margin-bottom: 20px;
    }

    .button {
        flex: 1;
        margin: 0 5px;
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

    .button.active {
        background-color: #0056b3;
        font-weight: bold;
    }

    .button:hover {
        background-color: #0056b3;
    }

    /* Tab Content */
    .tab-content {
        text-align: left;
        margin-top: 20px;
    }

    h2 {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    p {
        font-size: 1rem;
        color: #333;
    }
</style>
