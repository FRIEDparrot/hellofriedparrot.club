<template>
    <SidebarLayout>
        <template v-slot:sidebar-left-content>
            <LeftSidebarWelcome></LeftSidebarWelcome>
        </template>
        <template v-slot:main-content>
            <navbar_welcome :showRightSidebarToggle="false" :showLogo="false">
                <template v-slot:navbarPrepend>
                    <HomeBtn></HomeBtn>
                </template>
            </navbar_welcome>
            <v-card width="400" class="mx-auto mt-8" elevation="12">
                <v-tabs
                    v-model="tab"
                    bg-color="#493545"
                    grow
                    :disabled="isLoading"
                >
                    <v-tab value="username_login">
                        {{ $t('login.byUsername') }}
                    </v-tab>
                    <v-tab value="email_login">
                        {{ $t('login.byEmail') }}
                    </v-tab>
                </v-tabs>

                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="username_login">
                        <v-card-text>
                            <v-form @submit.prevent="submitLoginByUserName">
                                <v-text-field
                                    :label="$t('login.Username')"
                                    :rules="[rules.required]"
                                    v-model="LoginForm_username.username"
                                    maxlength="20"
                                    type="text"
                                    prepend-icon="mdi-account-circle"
                                ></v-text-field>

                                <v-text-field
                                    :label="$t('login.Password')"
                                    v-model="LoginForm_username.password"
                                    maxlength="20"
                                    :rules="[rules.required]"
                                    :type="showPassword ? 'text' : 'password'"
                                    prepend-icon="mdi-lock"
                                    :append-inner-icon="
                                        showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    @click:append-inner="
                                        () => (showPassword = !showPassword)
                                    "
                                ></v-text-field>

                                <v-card-actions>
                                    <v-btn class="text-white bg-grey">
                                        {{ $t('login.CancelBtn') }}
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        class="text-white bg-success"
                                        type="submit"
                                        :loading="isLoading"
                                    >
                                        {{ $t('login.LoginBtn') }}
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>

                        <v-card-text>
                            <v-divider></v-divider>
                            {{ $t('login.NotRegistered') }}
                            <router-link
                                style="color: blue; text-decoration: underline"
                                to="/auth/register"
                            >
                                {{ $t('login.Signup') }}
                            </router-link>
                        </v-card-text>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="email_login">
                        <v-card-text>
                            <v-form @submit.prevent="submitLoginByEmail">
                                <v-text-field
                                    :label="$t('login.Email')"
                                    v-model="LoginForm_email.email"
                                    maxlength="200"
                                    :rules="[rules.required, rules.is_email]"
                                    type="email"
                                    prepend-icon="mdi-email"
                                ></v-text-field>
                                <v-text-field
                                    :label="$t('login.Captcha')"
                                    :rules="[rules.required]"
                                    maxlength="6"
                                    type="text"
                                    v-model="LoginForm_email.verification_code"
                                    prepend-icon="mdi-shield-key"
                                >
                                    <template v-slot:append>
                                        <v-btn
                                            class="text-white bg-info"
                                            @click="getLoginCaptcha(null)"
                                            :loading="isLoadingCaptcha"
                                        >
                                            {{ $t('login.SendCodeBtn') }}
                                            <v-tooltip
                                                activator="parent"
                                                location="bottom"
                                            >
                                                {{ $t('login.CaptchaTooltip') }}
                                            </v-tooltip>
                                        </v-btn>
                                    </template>
                                </v-text-field>

                                <v-card-actions>
                                    <v-btn
                                        class="text-white bg-grey"
                                        width="100px"
                                    >
                                        {{ $t('login.CancelBtn') }}
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        class="text-white bg-success"
                                        width="100px"
                                        type="submit"
                                    >
                                        {{ $t('login.LoginBtn') }}
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                        <v-card-text>
                            <v-divider></v-divider>
                            {{ $t('login.NotRegistered') }}
                            <router-link
                                style="color: blue; text-decoration: underline"
                                to="/auth/register"
                            >
                                {{ $t('login.Signup') }}
                            </router-link>
                        </v-card-text>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card>
            <floatingAlert ref="emailAlert"> </floatingAlert>
        </template>
    </SidebarLayout>
</template>

<script lang="ts" src="./loginPage.ts"></script>

<style></style>
