<template>
    <div>
        <h1>About Page</h1>
    </div>
    <p>Thank you for using our app! Your feedback means a lot to us.</p>

    <form
        @submit.prevent="sendFeedback"
        class="feedback-form"
    >
        <div>
            <label for="feedback">Your Feedback:</label>
            <textarea
                id="feedback"
                v-model="feedback"
                placeholder="Write your feedback here"
                required
            ></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
    </form>
</template>

<script>
    export default {
        name: "aboutView",
    }
</script>
