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
            <div id="register-page" style="margin: 20px">
                <v-card
                    width="550px"
                    class="elevation-10"
                    style="text-align: center"
                    :subtitle="$t('register.joinMsg')"
                    variant="outlined"
                >
                    <template v-slot:title>
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            "
                        >
                            <img
                                src="@imgs/icon/parrot_icon_withborder.png"
                                alt="parrot_icon_main"
                                style="padding-top: px; padding-bottom: 1px"
                                height="40px"
                                class="mr-2"
                            />
                            <span
                                class="mr-6`"
                                style="font-size: 38px; padding-bottom: 2px"
                            >
                                {{ $t("register.createAccount") }}
                            </span>
                        </div>
                    </template>
                    <v-card-text>
                        {{ $t("register.haveAccount") }}
                        <router-link
                            to="/auth/login"
                            style="
                                color: blue;
                                font-size: 16px;
                                text-decoration: underline;
                            "
                        >
                            {{ $t("register.login") }}
                        </router-link>
                    </v-card-text>
                    <v-form
                        style="align-items: center; justify-content: center"
                        @submit.prevent="onSubmitRegisterForm"
                    >
                        <v-container
                            style="align-items: center"
                            class="ml-6 mr-5"
                        >
                            <v-text-field
                                :label="$t('register.username')"
                                type="text"
                                v-model="registerForm.username"
                                prepend-inner-icon="mdi-account"
                                :placeholder="
                                    $t('register.usernamePlaceholder')
                                "
                                width="90%"
                                :rules="[
                                    rules.required,
                                    rules.format_check_name,
                                ]"
                                :counter="20"
                                maxlengh="20"
                                dense
                            >
                            </v-text-field>

                            <v-text-field
                                v-model="registerForm.email"
                                :label="$t('register.email')"
                                type="email"
                                prepend-inner-icon="mdi-email"
                                maxlength="200"
                                :placeholder="$t('register.emailPlaceholder')"
                                :rules="[
                                    rules.required,
                                    rules.format_check_email,
                                ]"
                                width="90%"
                            >
                            </v-text-field>

                            <v-text-field
                                v-model="registerForm.verification_code"
                                :label="$t('register.captcha')"
                                width="90%"
                                :rules="[rules.format_check_verification_code]"
                                :placeholder="$t('register.captchaPlaceholder')"
                                prepend-inner-icon="mdi-shield-key"
                                maxlength="6"
                            >
                                <template v-slot:append>
                                    <v-btn
                                        width="100px"
                                        height="80%"
                                        color="primary"
                                        :loading="isLoadingCaptcha"
                                        style="font-size: x-small"
                                        @click="getRegisterCaptcha(null)"
                                    >
                                        {{ $t("register.sendCodeBtn") }}
                                    </v-btn>
                                </template>
                            </v-text-field>

                            <v-text-field
                                :label="$t('register.password')"
                                v-model="registerForm.password"
                                :type="showPassword ? 'text' : 'password'"
                                prepend-inner-icon="mdi-lock"
                                :append-inner-icon="
                                    showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                "
                                :placeholder="
                                    $t('register.passwordPlaceholder')
                                "
                                maxlength="25"
                                :counter="25"
                                @click:append-inner="
                                    () => (showPassword = !showPassword)
                                "
                                :rules="[
                                    rules.required,
                                    rules.format_check_password,
                                ]"
                                width="90%"
                            />
                            <v-text-field
                                :label="$t('register.confirmPassword')"
                                v-model="registerForm_extra.password_confirm"
                                :rules="[format_check_password_confirm()]"
                                maxlength="25"
                                :counter="25"
                                :type="showPassword ? 'text' : 'password'"
                                prepend-inner-icon="mdi-lock"
                                :append-inner-icon="
                                    format_check_password_confirm() === true
                                        ? 'mdi-check'
                                        : 'mdi-close'
                                "
                                :placeholder="
                                    $t('register.confirmPasswordPlaceholder')
                                "
                                width="90%"
                            >
                            </v-text-field>

                            <v-text-field
                                v-model="registerForm.career"
                                :label="$t('register.career')"
                                prepend-inner-icon="mdi-briefcase"
                                width="90%"
                                :placeholder="$t('register.careerPlaceholder')"
                                maxlength="30"
                                :counter="30"
                            >
                            </v-text-field>

                            <!-- note : here we use the lang code for translation and extensibility -->
                            <v-autocomplete
                                v-model="registerForm.country"
                                :custom-filter="countryNameFilter"
                                :label="$t('register.country')"
                                :rules="[rules.required]"
                                :items="countriesData"
                                :item-title="countryDisplang()"
                                item-value="en"
                                prepend-inner-icon="mdi-map-marker"
                                :placeholder="$t('register.countryPlaceholder')"
                                persistent-placeholder
                                width="90%"
                                dense
                            >
                                <template v-slot:item="{ props, item }">
                                    <v-list-item v-bind="props">
                                        <template v-slot:prepend>
                                            <v-avatar
                                                rounded="0px"
                                                variant="plain"
                                                class="rectangular-avatar"
                                                height="100%"
                                                style="
                                                    border-radius: 0 !important;
                                                "
                                            >
                                                <v-img
                                                    :src="item.raw.flag"
                                                    alt="flag"
                                                    width="100%"
                                                    height="auto"
                                                    style="border-radius: 0px"
                                                    object-fit="cover"
                                                />
                                            </v-avatar>
                                        </template>
                                    </v-list-item>
                                </template>
                            </v-autocomplete>

                            <v-textarea
                                v-model="registerForm.reason"
                                prepend-inner-icon="mdi-note-edit"
                                :label="$t('register.reason')"
                                width="90%"
                                :counter="200"
                                :maxlength="200"
                                :placeholder="$t('register.reasonPlaceholder')"
                                rows="4"
                                dense
                            >
                            </v-textarea>

                            <v-spacer></v-spacer>
                            <v-row>
                                <v-checkbox
                                    v-model="registerForm.receive_ads"
                                    color="secondary"
                                    :label="$t('register.receiveAds')"
                                    width="90%"
                                    hide-details
                                >
                                </v-checkbox>
                            </v-row>
                        </v-container>

                        <v-divider></v-divider>
                        <v-spacer></v-spacer>
                        <div id="Terms-of-Service">
                            <v-container
                                id="register-page-footer"
                                style="text-align: center; align-items: normal"
                            >
                                <div
                                    class="ml-5 mr-5 mb-2"
                                    style="text-align: left"
                                >
                                    {{ $t("register.readTerms") }}
                                    <a href="#">{{ $t("g.termOfService") }}</a>
                                    {{ $t("g.and") }}
                                    <a href="#">{{ $t("g.privacyPolicy") }}</a>
                                </div>

                                <v-spacer></v-spacer>
                                <v-row style="align-items: center">
                                    <v-checkbox
                                        v-model="agreeTermofService"
                                        style="
                                            text-align: left;
                                            margin-left: 20px;
                                            margin-top: 15px;
                                            margin-bottom: 10px;
                                        "
                                        color="primary"
                                        :label="$t('register.agreeTerms')"
                                        width="90%"
                                        hide-details
                                    ></v-checkbox>
                                </v-row>
                            </v-container>
                        </div>

                        <v-card-actions>
                            <v-container fluid ma="0">
                                <v-row>
                                    <v-btn
                                        class="bg-secondary text-white"
                                        width="100px"
                                    >
                                        {{ $t("register.cancelBtn") }}
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        class="bg-primary text-white"
                                        width="100px"
                                        :loading="isLoadingSubmit"
                                        type="submit"
                                    >
                                        {{ $t("register.submitBtn") }}
                                    </v-btn>
                                </v-row>
                            </v-container>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </div>
        </template>
    </SidebarLayout>
    <FloatingAlert ref="emailAlert"></FloatingAlert>
</template>

<script lang="ts" src="./registerPage.ts"></script>

<style>
/* custom styles */
#register-page {
    display: grid;
    justify-content: center;
    align-items: center;
}
</style>
