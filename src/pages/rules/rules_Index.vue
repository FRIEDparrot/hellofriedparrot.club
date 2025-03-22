<template lang="html">
  <div class="rules-collection">
    <RulesLayout>
      <template v-slot:navbar>
        <NavbarSimple :hideLeftToggleWidth="1400">
          <template v-slot:title class="nav-title">
            {{ $t('rules.title') }}
          </template>
        </NavbarSimple>
      </template>

      <template v-slot:left-sidebar>
        <LeftSideBarBtnContent ref="leftSideBar">
          <template v-slot:btnContainer="{ select }">
            <v-list-item
              class="rules-list-item"
              value="filePanel"
              @click="select(0)"
            >
              <v-icon size="30">
                {{ 'mdi-view-dashboard' }}
              </v-icon>
            </v-list-item>
            <v-list-item
              class="rules-list-item"
              value="contentPanel"
              @click="select(1)"
            >
              <v-icon size="30">
                {{ 'mdi-table-of-contents' }}
              </v-icon>
            </v-list-item>
          </template>
          <template v-slot:contentPanel="{ selected }">
            <markdownFileListView
              v-if="selected === 0"
              base_url="rules"
              :header="$t('rules.listTitle')"
              :directory="directory"
            ></markdownFileListView>
            <MarkdownOutline
              v-if="selected === 1"
              :title="$t('g.outline')"
              titleClass="bg-sidebar_heading_deep"
              :headings="headings"
              :scrollOffset="0"
            ></MarkdownOutline>
            <!-- todo : fix scroll offset -->
            <div class="left-sidebar-outlineView"></div>
          </template>
        </LeftSideBarBtnContent>
      </template>

      <template v-slot:folder-panel line-height="1.5">
        <markdownFileListView
          base_url="rules"
          :header="$t('rules.listTitle')"
          :directory="directory"
        ></markdownFileListView>
      </template>

      <template v-slot:outliner>
        <MarkdownOutline
          :title="$t('g.outline')"
          :headings="headings"
          :scrollOffset="-30"
          style="z-index: 5"
        ></MarkdownOutline>
      </template>

      <template v-slot:main>
        <v-skeleton-loader
          width="90%"
          height="100%"
          :loading="loading_rules"
          type="table-heading, list-item-two-line, article, list-item-two-line, article"
          elevation="2"
        >
          <div class="bg-background_smooth rules-content-container">
            <div
              style="
                width: 100%;
                align-items: center;
                justify-content: center;
                display: flex;
                text-align: center;
              "
            >
              <v-card variant="outlined" width="80%">
                <div class="left-sidebar-fileView">
                  ⚠{{ $t('rules.thisWebRulesUpdating') }}
                </div>
              </v-card>
            </div>
            <v-responsive>
              <div v-html="renderHTML"></div>
            </v-responsive>
          </div>
        </v-skeleton-loader>
      </template>

      <template v-slot:footer>
        <div class="rules-footer-bar-container">
          <footerbar />
        </div>
      </template>
    </RulesLayout>
  </div>
  <FloatingAlert ref="alertBox"></FloatingAlert>
</template>

<!--1150 px to -->

<script lang="ts" src="./rules_Index.ts"></script>

<style lang="scss" src="./rules_Index.scss"></style>
<!-- <style lang="css" src="@styles/github-markdown.css"></style> -->
