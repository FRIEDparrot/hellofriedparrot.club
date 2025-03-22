<template>
    <div class="header"></div>
    <div class="container">
        <!-- This is where the content of the page goes (default) -->
    </div>
    <div class="footer"></div>
</template>

<script>
export default {
    name: "BaseLayout",
    props: {
        title: {
            type: String,
            default: "Hello Fried Parrot Club",
        },
    },
    data() {
        return {
            // Add any data here
        };
    },
};
</script>

<style scoped></style>
