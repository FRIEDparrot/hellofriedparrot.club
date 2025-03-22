<template>
    <v-overlay
        v-model="showTagOverlay"
        class="tag-choose-overlay"
        style="align-items: center; justify-content: center; display: flex"
    >
        <div class="tag-choose-overlay-content">
            <v-card
                max-width="550px"
                min-height="400px"
                class="elevation-4 tag-search-card"
            >
                <v-card-title>
                    <slot name="title">
                        {{ $t('common.tag_overlay.title') }}
                    </slot>
                </v-card-title>
                <div class="tag-search-group" style="display: flex">
                    <div
                        class="tag-search-input-container"
                        v-for="(item, index) in tagTable.headers.slice(
                            0,
                            tagTable.headers.length - 1,
                        )"
                        style="margin: 0px 5px"
                    >
                        <ElAutocomplete
                            v-model="SearchInputs[item.key]"
                            :fetch-suggestions="
                                (q, cb) => queryTag(q, cb, item.key)
                            "
                            :trigger-on-focus="false"
                            clearable
                            @select="searchTagResult"
                            class="inline-input w-70"
                            :placeholder="$t(item.titleKey)"
                            @focus="activekey = item.key"
                        />
                    </div>
                </div>

                <v-data-table
                    :headers="translatedTagTableHeaders"
                    :no-data-text="$t('common.tag_overlay.noDataText')"
                    :items="tagTable.items"
                    :items-per-page="5"
                    :sort-by="[{ key: 'key', order: 'asc' }]"
                    :loading="tagTable.loading"
                    :items-per-page-text="
                        $t('common.dataTableServer.itemsPerPageText')
                    "
                    :items-per-page-options="[5, 10]"
                >
                    <template v-slot:item.operation="{ item }">
                        <v-icon @click="addNewTag(item)">
                            <slot name="add-icon">
                                {{ 'mdi-plus-circle' }}
                            </slot>
                        </v-icon>
                    </template>
                </v-data-table>

                <v-card class="current-tag-container" v-if="showTagContainer">
                    <slot name="current-tags-tip">
                        {{ $t('common.tag_overlay.current_tags') }}
                    </slot>
                    <div class="current-tag-container-wrapper">
                        <div class="current-tag-container-content">
                            <v-chip
                                v-for="(item, index) in translatedContainerTags"
                                :key="index"
                            >
                                {{ item.title }}
                                <template #append>
                                    <v-btn
                                        icon
                                        @click="removeTag(item)"
                                        size="tiny"
                                        variant="plain"
                                        style="margin-left: 5px"
                                    >
                                        <v-icon>{{ 'mdi-close' }}</v-icon>
                                    </v-btn>
                                </template>
                            </v-chip>
                        </div>
                    </div>
                </v-card>
                <div class="tag-choose-overlay-btn-container">
                    <v-btn
                        @click="close()"
                        class="bg-secondary text-white overlay-choose-btn"
                    >
                        {{ $t('g.cancel') }}
                    </v-btn>
                    <v-btn
                        v-if="showResetBtn"
                        @click="fetchTagsListAll"
                        color="secondary"
                        class="bg-warning overlay-choose-btn"
                    >
                        {{ $t('common.tag_overlay.resetBtn') }}
                    </v-btn>

                    <v-btn @click="confirmTagSelection" color="primary">
                        {{ $t('g.confirm') }}
                    </v-btn>
                </div>
            </v-card>
        </div>
        <v-snackbar v-model="snackbar">
            <template v-slot:actions>
                <div class="ml-4">
                    {{ snackbarText }}
                </div>
                <v-btn
                    variant="plain"
                    @click="snackbar = false"
                    :timeout="3000"
                >
                    {{ $t('g.close') }}
                </v-btn>
            </template>
        </v-snackbar>
    </v-overlay>
</template>

<script lang="ts" src="./src/tag_choose_overlay.ts"></script>

<style lang="css" scoped src="./styles/tag_choose_overlay.css"></style>
