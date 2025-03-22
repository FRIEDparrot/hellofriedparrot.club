<template>
    <div class="console-content-page">
        <h1>User Management</h1>
        <p>This is the user management page.</p>
        <v-card class="review-table-card" variant="text">
            <v-data-table-server :itemsLength="0"> </v-data-table-server>
        </v-card>
    </div>
</template>

<script lang="ts" src="./scripts/userManage.ts"></script>
