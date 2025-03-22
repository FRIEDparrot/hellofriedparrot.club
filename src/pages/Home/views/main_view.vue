<template>
  <div class="home-container">
    <div class="interesting-tag-column">
      <div class="mt-4" style="width: 95%">
        <userInfoCardBrief :use-self-profile="true"></userInfoCardBrief>
      </div>
      <div style="width: 100%; margin-bottom: 10px">
        <dynamicSearchBtn color="success"> </dynamicSearchBtn>
      </div>
      <div class="ml-2">
        <InterestTagPanel></InterestTagPanel>
      </div>
    </div>
    <div class="main-part-wrapper">
      <div class="main-view-body-zone-container">
        <interest_tag_panel_simple
          class="interest-tag-panel-simple medium-width-panel"
        ></interest_tag_panel_simple>
        <div class="main-view-body-zone">
          <blog_iterator_main />
        </div>
      </div>

      <div class="main-view-right-panel-container">
        <briefPostCard></briefPostCard>
      </div>

      <interest_tag_panel_simple
        class="interest-tag-panel-simple mini-width-panel"
      ></interest_tag_panel_simple>
    </div>
  </div>
</template>

<script lang="ts" src="./src/main_view.ts"></script>

<style lang="scss" scoped src="./styles/main_view.scss"></style>
