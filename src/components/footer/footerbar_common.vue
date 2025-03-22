<template>
    <cookiePrompt ref="cookiePrompt"/>
    <footer class="footer-bar" :style="{ zIndex: zIndex }">

        <div class="footer-columns">
            <div class="footer-web-columns footer-column">
                <h4 class="footer-column-title">{{ $t("g.webColumns") }}</h4>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.webColumns.historyNotice") }}
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.webColumns.news") }}
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.webColumns.newlyProducts") }}
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.webColumns.blackList") }}
                </p>
            </div> 
            <div class="footer-support footer-column">
                <h4 class="footer-column-title">{{ $t("g.support") }}</h4>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.support.help") }}
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.support.report") }}
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.support.faq") }}
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.support.feedback") }}
                </p>
            </div>

            <div class="footer-Rules footer-column">
                <h4 class="footer-column-title">{{ $t("g.rules") }}</h4>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.rules.privacyPolicy") }}
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.rules.termOfService") }}
                </p>
                <p>
                    <a href="/rules/privacy_policy/cookie_policy">
                    {{ $t("footerbar.common.rules.cookiePolicy") }}
                    </a>
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.rules.disclaimer") }}
                </p>
            </div>

            <div class="footer-About footer-column">
                <h4 class="footer-column-title">{{ $t("g.aboutUs") }}</h4>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.about.aboutWebsite") }}
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.about.update") }}
                </p>
                <p @click="notDeveloped()">
                    {{ $t("footerbar.common.about.contactUs") }}
                </p>
                <p @click="SetCookies()">
                    <a>
                    {{ $t("footerbar.common.about.cookieSettings") }}
                    </a>
                </p>
            </div>
        </div>

        <div class="footer-icon-group">
            <v-btn
                icon
                size="45px"
                variant="plain"
                @click="openLink('https://github.com/FRIEDparrot')"
            >
                <v-icon size="30px" style="color: #777777">
                    {{ "mdi-github" }}
                </v-icon>
            </v-btn>
            <v-btn icon size="45px" variant="plain">
                <v-icon size="30px" style="color: #777777">
                    {{ "mdi-qqchat" }}
                </v-icon>
                <v-tooltip location="top" activator="parent" width = "150px">
                    <div styles="align-items: center; justify-content: center;">
                        <img src="@imgs/qrcode/qrcode_qqgroup.jpg" width="100%"> </img>
                        <div> {{$t("g.qqGroup")}} </div>
                    </div>
                </v-tooltip>
            </v-btn>

            <v-btn icon size="45px" variant="plain">
                <v-icon size="30px" style="color: #777777">
                    {{ "mdi-wechat" }}
                </v-icon>
                <v-tooltip location="top" activator="parent" width = "150px">
                    <div styles="align-items: center; justify-content: center; text-align: center;">
                        <img src="@imgs/qrcode/qrcode_wechatAccount.jpg" width="100%" />
                        </img>
                        <div> {{$t("g.wechatAccount")}}</div>
                    </div>
                </v-tooltip>
            </v-btn>
        </div>

        <div class="footer-copyright" style="color: #9aa0af">
            <p>{{ $t("footerbar.common.copyright") }}</p>
            <p>{{ $t("footerbar.common.university") }}</p>
            <p>{{ $t("footerbar.common.reserveRights") }}</p>
        </div>

        <div class="footer-claim">
            <p>
                <a
                    href="https://beian.miit.gov.cn/"
                    style="color: #9aa0af"
                    target="_blank"
                >
                    陕ICP备2024052334号
                </a>
            </p>
            <span style="text-align: center">
                <img
                    src="@imgs/icon/police_icon.png"
                    id="police-icon"
                    alt="网安备案信息"
                    style="display:inline-block"
                />
            <a
                href="https://beian.mps.gov.cn/#/query/webSearch?code=61019002003142"
                style="color: #9aa0af"
                rel="noreferrer"
                target="_blank"
            >
                陕公网安备61019002003142号 
            </a>
            </span>
        </div>
    </footer>
</template>


<script lang="ts" src="./src/footerbar_common.ts">
</script>

<style scoped lang="scss" src="./footerbar_common.scss"></style>
