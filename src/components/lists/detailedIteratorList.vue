<template>
    <div class="detailed-iterator-list">
        <div
            v-if="items.length === 0"
            class="detailed-iterator-no-data-placeholder"
        >
            <v-card
                border
                variant="tonal"
                class="detailed-iterator-item-card"
                :elevation="4"
                style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                "
            >
                <div class="detailed-iterator-item-container">
                    <slot name="no-data-placeholder"> no data to show </slot>
                </div>
            </v-card>
        </div>

        <v-data-iterator
            :items-per-page="itemsPerPage"
            :items="items"
            class="detailed-iterator-list-container"
        >
            <template #header>
                <div class="detailed-iterator-list-header">
                    <slot name="header"> </slot>
                </div>
            </template>

            <template v-slot:default="{ items }">
                <v-card
                    class="detailed-iterator-item-card"
                    v-for="(item, idx) in items"
                    :key="idx"
                >
                    <div class="detailed-iterator-item-container">
                        <div
                            class="detailed-iterator-banner-container"
                            v-if="item.raw.banner_image"
                        >
                            <div class="detailed-iterator-banner-image">
                                <img :src="item.raw.banner_image" />
                            </div>
                        </div>
                        <v-card-text class="detailed-iterator-item-text">
                            <div class="detailed-iterator-item-content">
                                <div class="detailed-iterator-item-title">
                                    <v-card-title
                                        class="detailed-iterator-item-title-text"
                                    >
                                        {{ item.raw.title }}
                                    </v-card-title>
                                </div>
                                <div class="detailed-iterator-item-description">
                                    <v-card-subtitle
                                        class="detailed-iterator-item-description-text"
                                    >
                                        {{ item.raw.abstract }}
                                    </v-card-subtitle>
                                </div>
                                <div class="detailed-iterator-user-information">
                                    <div class="detailed-iterator-user-avatar">
                                        <img :src="item.raw.author_avatar" />
                                    </div>
                                    <div class="detailed-iterator-user-name">
                                        {{ item.raw.author_name }}
                                    </div>
                                </div>

                                <div>
                                    <div class="detailed-iterator-item-time">
                                        <slot name="time-text">
                                            {{
                                                $t(
                                                    'common.detailedIteratorList.timeText',
                                                )
                                            }}
                                        </slot>
                                        {{ item.raw.datetime }}
                                    </div>
                                    <div
                                        class="detailed-iterator-item-statics"
                                    ></div>
                                </div>
                            </div>
                        </v-card-text>
                    </div>
                </v-card>
            </template>
            <template v-slot:footer>
                <div class="detailed-iterator-list-footer">
                    <slot name="footer-pagination"> </slot>
                </div>
            </template>

            <!-- </template> -->
        </v-data-iterator>

        <div
            v-for="(item, index) in items"
            :key="index"
            class="detailed-iterator-list-item"
        ></div>
        <div class="detailed-iterator-list-footer">
            <slot name="footer"> </slot>
        </div>
    </div>
</template>

<script lang="ts" src="./src/detailedIteratorList.ts"></script>

<style lang="css" scoped src="./styles/detailedIteatorList.css"></style>
