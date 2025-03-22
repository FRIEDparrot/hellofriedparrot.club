<template>
    <div id="page-welcome">
        <canvas id="backgroundCanvas_welcomePage" />
        <div class="title">😆{{ $t("welcome.welcome-msg") }}</div>

        <div id="scroll-indicator-container">
            <Down_arrow
                id="scroll-indicator"
                ref="arrows"
                color1="rgba(15, 14, 14, 0.7)"
                color2="rgba(43, 42, 42, 0.85)"
                color3="rgb(100, 99, 99)"
                @click="scrollDown()"
            />
            <br /><br />
            <h3 text-color="var(--intro-text-color)">
                {{ $t("welcome.welcome-sections.scroll-msg") }}
            </h3>
        </div>

        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="intro">
            <span>🔍{{ $t("welcome.welcome-sections.explore-msg") }}✨</span>
        </div>
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />

        <div class="intro">
            <span>👏{{ $t("welcome.welcome-sections.recruit-msg") }} 👍</span>
        </div>
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="padding-bit" />
        <div class="intro">
            <span>🚄{{ $t("welcome.welcome-sections.motto-msg") }}🚀</span>
        </div>
        <span class="bg-copyright">
            <span class="copyright"> By </span
            ><img
                id="npucraft-logo-img"
                style="display: inline-block"
                src="@imgs/icon/NPUcraft logo.png"
                alt="NPUcraft logo"
                @click="() => openNPUcraft()"
            />
        </span>
    </div>
</template>

<script lang="ts" src="./src/interface_welcome.ts"></script>

<style lang="css" scoped src="./styles/interface_welcome.css"></style>
