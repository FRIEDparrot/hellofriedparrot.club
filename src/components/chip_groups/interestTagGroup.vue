<template>
    <tagChooseOverlay
        ref="tagChooseOverlay"
        style="z-index: 10000; pointer-events: all"
        :max-tag-count="max"
        @confirm="updateTags"
    >
        <template #title>
            {{ $t('common.interestTagsGroup.chooseTag') }}
        </template>
    </tagChooseOverlay>
    <div class="tag-group">
        <v-chip-group :column="column">
            <div>
                <slot name="no-tag-text">
                    <span
                        style="
                            opacity: 0.5;
                            margin-left: 10px;
                            margin-right: 10px;
                        "
                        v-if="showNoTagText && items.length === 0"
                    >
                        {{ $t('common.post_blog_overlay.noTagText') }}
                    </span>
                </slot>
                <v-chip
                    v-if="items.length > 0"
                    v-for="(tag, idx) in items"
                    :key="idx"
                    :size="size"
                >
                    {{ getTagTranslation(tag) }}
                    <template #append>
                        <v-btn
                            size="tiny"
                            style="margin-left: 2px"
                            icon
                            variant="text"
                        >
                            <v-icon
                                v-if="allowModify"
                                @click.stop="removeTag(idx)"
                            >
                                {{ 'mdi-close' }}
                            </v-icon>
                        </v-btn>
                    </template>
                </v-chip>
                <v-chip
                    v-if="allowModify && items.length < max"
                    :size="size"
                    icon
                    @click.stop="showTagChooseOverlay"
                >
                    <v-icon class="mr-1">
                        {{ 'mdi-plus-circle' }}
                    </v-icon>
                    {{ $t('g.addNewTag') }}
                </v-chip>
            </div>
        </v-chip-group>
    </div>
</template>

<script lang="ts" src="./src/interestTagGroup.ts"></script>

<style scoped></style>
