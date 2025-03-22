<template>
  <div class="review-page console-content-page">
    <div class="review-header">
      <h1>{{ $t('reviews.title') }}</h1>
    </div>
    <h4 style="margin: 10px">{{ $t('reviews.tip') }}</h4>
    <v-card class="review-brief-card">
      <div class="review-brief-card-content">
        <v-card-title> {{ $t('reviews.reviewCount') }} </v-card-title>
        <div class="review-brief-card-items">
          <v-card-subtitle class="review-brief-card-text">
            {{ $t('reviews.newReviews') }}
            {{ counterInit[0] }}
          </v-card-subtitle>
          <v-card-subtitle>
            {{ $t('reviews.newRegistrations') }}
            {{ counterInit[1] }}
          </v-card-subtitle>
          <v-card-subtitle>
            {{ $t('reviews.newAccountMods') }}
            {{ counterInit[2] }}
          </v-card-subtitle>
        </div>
      </div>
    </v-card>

    <!--only request for part of data -->

    <div class="review-table-container console-table-card">
      <v-card class="review-table-card" variant="text">
        <div class="review-table-panel">
          <div class="review-select-container">
            <div style="width: 100%">
              <h3>{{ $t('reviews.selectType') }}</h3>
              <!-- type Selector -->
              <v-select
                v-model="typeSelector.select"
                :items="translatedTypeSelector"
                class="review-select"
              >
              </v-select>
            </div>
          </div>
          <div class="review-search-bar-container">
            <div>
              <h3>
                {{ $t('common.dataTableServer.searchByColumns') }}
              </h3>
            </div>

            <div class="review-search-bar">
              <!--- search Key Selector -->
              <v-select
                class="review-search-bars-item"
                v-model="columnSelectModel[currSelect]"
                :items="translatedSearchKeySelector"
              ></v-select>

              <!-- use the bi-directional binding to update the search value -->
              <!-- TODO may need to combine all the bindings into one -->

              <v-text-field
                class="review-search-bars-item"
                v-model="tableSearchModel[currSelect]"
                append-inner-icon="mdi-magnify"
                label="Search"
              ></v-text-field>
            </div>
          </div>
        </div>

        <v-card-actions class="review-table-actions">
          <div>
            <v-checkbox
              density="compact"
              v-model="sendMessage"
              class="review-table-email-tip-container"
              color="primary"
              :label="
                currSelect == 1
                  ? $t('common.dataTableServer.sendEmail')
                  : $t('common.dataTableServer.sendMessage')
              "
            >
            </v-checkbox>
          </div>
          <div class="review-table-btn-container">
            <v-btn
              class="bg-error review-table-btn"
              @click="confirmReviewBtnPressed(false)"
            >
              {{ $t('g.declineSelected') }}
            </v-btn>
            <v-btn
              class="bg-info review-table-btn"
              @click="confirmReviewBtnPressed(true)"
            >
              {{ $t('g.acceptSelected') }}
            </v-btn>
          </div>
        </v-card-actions>

        <v-data-table-server
          v-model="currTable.selected"
          :items-per-page="currTable.itemsPerPage"
          :headers="translatedTableHeaders"
          :items="currTable.items"
          :itemsLength="currTable.itemsLength"
          :loading="currTable.loading"
          :search="tableSearchModel[currSelect]"
          :sortBy="currTable.sortBy"
          :no-data-text="$t('common.dataTableServer.noDataText')"
          :items-per-page-text="$t('common.dataTableServer.itemsPerPageText')"
          :page="currTable.page"
          @update:options="fetchCurrentTableData"
          show-select
        >
          <template v-slot:item.reviewLink="{ item }">
            <v-btn color="primary" variant="outlined" :to="item.reviewLink">
              {{ $t('common.dataTableServer.viewReviewLink') }}
            </v-btn>
          </template>
        </v-data-table-server>
      </v-card>
    </div>
  </div>
  <confirmDialog
    ref="acceptConfirmDialog"
    :title="$t('common.confirmDialog.confirmToAccept')"
    confirm-btn-color="info"
    @confirm="confirmReviews"
    @cancel="cancelReviews"
  >
  </confirmDialog>
  <confirmDialog
    ref="rejectConfirmDialog"
    :title="$t('common.confirmDialog.confirmToReject')"
    :show-reason-input="true"
    :max-reason-length="200"
    :reason-required="false"
    confirm-btn-color="error"
    @confirm="rejectReviews"
    @cancel="cancelReviews"
  ></confirmDialog>
  <floatingAlert ref="floatingAlert"></floatingAlert>
</template>

<script lang="ts" src="./scripts/reviews.ts"></script>
<style lang="css" scoped src="./styles/reviews.css"></style>
