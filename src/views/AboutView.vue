<template>
    <div class="about-page">
        <h1>About Our App</h1>
        <p>Thank you for using our app! Your feedback means a lot to us.</p>

        <form
            @submit.prevent="sendFeedback"
            class="feedback-form"
        >
            <div class="form-group">
                <label for="feedback">Your Feedback:</label>
                <textarea
                    id="feedback"
                    v-model="feedback"
                    placeholder="Write your feedback here..."
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                class="submit-button"
            >
                Submit Feedback
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AboutView",
        data() {
            return {
                feedback: "",
            }
        },
        methods: {
            sendFeedback() {
                alert("Feedback submitted! Thank you.")
                this.feedback = ""
            },
        },
    }
</script>

<style scoped>
    .about-page {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }

    h1 {
        font-size: 1.8rem;
        text-align: center;
        margin-bottom: 10px;
    }

    p {
        font-size: 1rem;
        text-align: center;
        color: #555;
        margin-bottom: 20px;
    }

    /* Form Styling */
    .form-group {
        margin-bottom: 15px;
    }

    label {
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
    }

    textarea {
        width: 100%;
        min-height: 100px;
        max-height: 200px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
        resize: none;
        overflow-y: auto;
    }

    /* Button Styling */
    .submit-button {
        width: 100%;
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s ease-in-out;
    }

    .submit-button:hover {
        background-color: #0056b3;
    }
</style>
