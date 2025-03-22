<template>
  <div class="page-site-messages">
    <floatingAlert ref="floatingAlert" />
    <navbar_simple
      :reload-translations="false"
      :show-support-btn="false"
      style="position: fixed"
    >
      <template #title> {{ $t('site_messages.title') }} </template>
      <template #sidebar-right-items>
        <div class="sidebar-right-item">
          <navUserAvatarPrompt class="sidebar-right-item-avatar" />
        </div>
      </template>
      <template #right-sidebar-toogle>
        <rightSidebarToggleBtn
          @toggle-right-sidebar="ToggleRightSidebar"
        ></rightSidebarToggleBtn>
      </template>
    </navbar_simple>

    <rightSidebarProfile ref="rightSidebarProfile"></rightSidebarProfile>
    <confirmDialog
      ref="deleteAllConfirmDialog"
      @confirm="deleteMsg(items.map((item) => item.id))"
      :title="$t('site_messages.confirm_delete_all_title')"
    ></confirmDialog>
    <div class="page-content">
      <div class="page-message-middle">
        <div class="page-message-middle-wrapper">
          <div class="page-message-middle-title">
            <h2>
              {{ $t('site_messages.myMessagesTitle') }}
            </h2>
          </div>
          <div class="page-message-batch-operation-btns">
            <div>
              <v-btn
                class="mr-2"
                color="primary"
                @click="MarkasRead(items.map((item) => item.id))"
              >
                {{ $t('site_messages.batch_mark_as_read') }}
              </v-btn>
            </div>
            <div>
              <v-btn
                class="mr-2"
                color="warning"
                @click="MarkasUnread(items.map((item) => item.id))"
              >
                {{ $t('site_messages.batch_mark_as_unread') }}
              </v-btn>
            </div>
            <div>
              <v-btn
                class="mr-2"
                color="error"
                @click="showConfirmDeleteDialog"
              >
                {{ $t('site_messages.batch_delete') }}
              </v-btn>
            </div>
          </div>
          <v-data-iterator
            v-if="items.length > 0"
            :page="current_page"
            :items="items"
            :items-per-page="itemsPerPage"
            style="width: 100%"
          >
            <template v-slot:default="{ items }">
              <v-card
                class="msg-card"
                variant="outlined"
                width="msg_card_max_width"
                v-for="(item, index) in items"
                :key="index"
              >
                <v-card-text>
                  <div class="msg-header">
                    <div class="msg-title">
                      <v-card-title> {{ item.raw.title }} </v-card-title>

                      <div class="msg-status">
                        <el-tag type="primary">
                          {{ $t('site_messages.type.' + item.raw.msg_type) }}
                        </el-tag>
                        <el-tag
                          type="success"
                          v-if="!readStateLoading && item.raw.is_read"
                        >
                          {{ $t('site_messages.read') }}
                        </el-tag>
                        <el-tag
                          type="warning"
                          v-else-if="!readStateLoading && !item.raw.is_read"
                        >
                          {{ $t('site_messages.unread') }}
                        </el-tag>
                      </div>
                    </div>
                  </div>

                  <div class="msg-content">
                    {{ item.raw.content }}
                  </div>
                  <div class="msg-operation">
                    <el-button
                      size="small"
                      type="success"
                      :disabled="readStateLoading"
                      class="msg-operation-btn"
                      @click="MarkasRead([item.raw.id])"
                    >
                      {{ $t('site_messages.operation.mark_as_read') }}
                    </el-button>
                    <el-button
                      size="small"
                      type="warning"
                      :disabled="readStateLoading"
                      class="msg-operation-btn"
                      @click="MarkasUnread([item.raw.id])"
                    >
                      {{ $t('site_messages.operation.mark_as_unread') }}
                    </el-button>
                    <el-button
                      size="small"
                      type="danger"
                      class="msg-operation-btn"
                      @click="deleteMsg([item.raw.id])"
                    >
                      {{ $t('site_messages.operation.delete') }}
                    </el-button>
                  </div>
                  <div class="msg-footer">
                    <div class="msg-time">
                      <v-icon class="mr-2"> {{ 'mdi-clock' }}</v-icon>
                      {{ getFormattedMsgTime(item.raw.send_time) }}
                    </div>
                    <div class="sender-info">
                      <div class="sender-tip">
                        {{ $t('site_messages.sender_tip') + ' : ' }}
                      </div>

                      <v-avatar class="msg-avatar">
                        <img :src="item.raw.sender_avatar" alt="avatar" />
                      </v-avatar>

                      <div class="sender-name">
                        {{ item.raw.sender_name }}
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </template>

            <template #footer="{ page, pageCount }">
              <v-pagination
                v-model="current_page"
                :length="Math.ceil(items.length / itemsPerPage)"
              >
              </v-pagination>
            </template>
          </v-data-iterator>

          <v-card
            class="msg-card no-msg-card"
            width="msg_card_max_width"
            variant="outlined"
            v-else
          >
            <v-card-title class="no-msg-title">
              {{ $t('site_messages.no_messages') }}
            </v-card-title>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./src/site_messages.ts"></script>

<style lang="scss" scoped src="./styles/site_messages.scss"></style>
