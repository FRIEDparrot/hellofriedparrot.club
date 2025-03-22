<template>
    <v-navigation-drawer
        v-model="drawer"
        temporary
        :width="330"
        class="left-sidebar-columns"
    >
        <div class="sidebar-left-header">
            <v-btn
                icon
                class="left-sidebar-close-icon"
                variant="plain"
                @click="drawer = false"
            >
                <v-icon>
                    {{ "mdi-close" }}
                </v-icon>
            </v-btn>
            <div class="left-sidebar-title-container">
                <v-card-title class="left-sidebar-title">
                    {{ $t("g.webColumns") }}
                </v-card-title>
            </div>
        </div>
        <compactFolderList
            :items="columns"
            density="comfortable"
            :useUrlLink="true"
            :useTranslation="true"
        >
        </compactFolderList>
    </v-navigation-drawer>
</template>

<script lang="ts" src="./src/leftSidebarColumns.ts"></script>

<style lang="css" src="./styles/leftSidebarColumns.css" scoped></style>
