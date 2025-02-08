<template>
    <div class="settings-page">
        <h1>Settings</h1>
        <p>Manage your preferences and account information with ease.</p>
        <div class="button-group">
            <button
                v-for="(tab, index) in tabs"
                :key="index"
                @click="activeTab = index"
                :class="['button', activeTab === index ? 'active' : '']"
            >
                {{ tab }}
            </button>
        </div>
        <div class="tab-content">
            <div v-if="activeTab === 0">
                <h2>Profile</h2>
                <p>HAVE USERS INFO HERE</p>
            </div>
            <div v-else-if="activeTab === 1">
                <h2>Car Info</h2>
                <p>Have cars info here</p>
            </div>
            <div v-else-if="activeTab === 2">
                <h2>Updates</h2>
                <p>Show possible issues coming for the car (e.g., brakes need to be changed).</p>
            </div>
            <div v-else-if="activeTab === 3">
                <h2>Display</h2>
                <p>Adjust display settings, including themes and layouts.</p>
            </div>
            <div v-else-if="activeTab === 4">
                <h2>Help</h2>
                <p>Access FAQs, support contact information, and documentation.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs: ["Profile", "Car Info", "Updates", "Display", "Help"],
                activeTab: 0, // Default tab
            }
        },
    }
</script>

<style scoped>
    /* General Page Styling */
    .settings-page {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    /* Heading */
    h1 {
        font-size: 1.8rem;
        margin-bottom: 20px;
    }

    /* Subtext */
    p {
        font-size: 1rem;
        color: #555;
        margin-bottom: 20px;
    }

    /* Button Group Styling */
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
