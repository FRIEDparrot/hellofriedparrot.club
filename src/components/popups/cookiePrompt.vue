<template>
    <v-dialog
        class="cookie-prompt-dialog"
        v-model="showCookiePrompt"
        max-width="700px"
        persistent
        centered
    >
        <v-card
            variant="tonal"
            class="cookie-prompt bg-background_smooth"
            height="auto"
            elevation="5"
        >
            <template v-slot:title>
                <p style="text-align: center; font-weight: bold">
                    <v-icon>mdi-cookie-outline</v-icon>
                    {{ $t("common.cookiePrompt.title") }}
                </p>
            </template>
            <v-spacer></v-spacer>
            <v-card-text> {{ $t("common.cookiePrompt.message") }} </v-card-text>

            <v-spacer></v-spacer>
            <v-card-subtitle class="break-word">
                {{ $t("common.cookiePrompt.learnMore") }}
                <router-link to="/rules/term_of_service">
                    {{ $t("g.termOfService") }}
                </router-link>
                {{ $t("g.and") }}
                <router-link to="rules/privacy_policy/cookie_policy">
                    {{ $t("g.cookiePolicy") }}
                </router-link>
                {{ $t("common.cookiePrompt.getInfo") }}
            </v-card-subtitle>

            <v-divider></v-divider>

            <v-card-actions style="max-width: 100%" class="cookie-button-group">
                <v-btn
                    class="bg-secondary text-white cookie-button"
                    @click="setUserCookies(0)"
                >
                    {{ $t("common.cookiePrompt.buttons.declineAll") }}
                </v-btn>

                <v-btn
                    class="bg-warning text-white cookie-button"
                    @click="setUserCookies(1)"
                >
                    {{ $t("common.cookiePrompt.buttons.acceptNecessary") }}
                </v-btn>

                <v-btn
                    class="bg-primary text-white cookie-button"
                    @click="setUserCookies(2)"
                >
                    {{ $t("common.cookiePrompt.buttons.acceptAll") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar
        rounded="pill"
        v-model="snackbar"
        :timeout="3000"
        style="opacity: 0.75"
    >
        <div
            style="
                display: flex;
                justify-content: space-between;
                align-items: center;
            "
        >
            {{ snackbarText }}

            <v-btn color="primary" @click="snackbar = false" variant="plain">
                {{ $t("g.close") }}</v-btn
            >
        </div>
    </v-snackbar>
</template>

<script lang="ts" src="./src/cookiePrompt.ts"></script>

<style scoped lang="scss">
.break-word {
    white-space: normal; /* allow long words to break */
    word-wrap: break-word; /* allow long words to break */
}

.cookie-button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.cookie-button-group > * {
    margin: 2px 5px;
}

@media (max-width: 732px) {
    .cookie-button-group {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        max-width: 100%;
    }
    .cookie-button-group .cookie-button {
        width: 60%;
        white-space: normal; /* allow long words to break */
        word-wrap: break-word;
    }
}

@media (max-width: 470px) {
    .cookie-button-group .cookie-button {
        width: min(100%, 235px);
    }
}
</style>
