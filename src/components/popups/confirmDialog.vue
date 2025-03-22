<template>
    <v-dialog
        v-model="show_dialog"
        max-width="500px"
        @keydown.enter="confirm()"
        persistent
    >
        <!-- trigger confirm on enter key -->
        <v-card
            style="border-radius: 10px"
            class="bg-background_smooth"
            styles="align-items: center; justify-content: center;"
        >
            <v-card-title class="headline">
                {{ title === "" ? $t("common.confirmDialog.title") : title }}
            </v-card-title>
            <v-card-subtitle style="text-align: center">
                {{
                    subtitle === ""
                        ? $t("common.confirmDialog.subtitle")
                        : subtitle
                }}
            </v-card-subtitle>
            <v-textarea
                counter
                :maxlength="maxReasonLength"
                v-if="showReasonInput"
                v-model="reasonText"
                :label="
                    reasonLabel === ''
                        ? $t('common.confirmDialog.reasonForAccept')
                        : reasonLabel
                "
                rows="3"
                class="confirm-dialog-text-area"
                variant="outlined"
            >
            </v-textarea>

            <v-card-actions class="confirm-dialog-actions">
                <v-btn
                    class="confirm-dialog-btn"
                    :color="cancelBtnColor"
                    variant="flat"
                    @click="cancel()"
                >
                    {{
                        cancelBtnLabel === "" ? $t("g.cancel") : cancelBtnLabel
                    }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    id="confirm-dialog-confirm-btn"
                    class="confirm-dialog-btn"
                    :color="confirmBtnColor"
                    @click="confirm()"
                    variant="flat"
                    tabindex="0"
                >
                    {{ $t("g.confirm") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" src="./src/confirmDialog.ts"></script>

<style lang="css" scoped src="./styles/confirmDialog.css"></style>
