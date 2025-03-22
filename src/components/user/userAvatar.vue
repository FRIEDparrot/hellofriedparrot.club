<template>
    <defaultAvatar
        :color="color"
        v-if="user_info.avatarUrl == undefined"
    >
    </defaultAvatar>
    <img
        v-else
        :src="user_info.avatarUrl"
    ></img>
</template>

<script lang="ts" src="./src/userAvatar.ts"></script>
