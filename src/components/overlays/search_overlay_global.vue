<template>
  <div>
    <v-overlay
      v-model="isShow"
      class="search-overlay"
      width="100%"
      height="100%"
      scroll-strategy="none"
      @click="isShow = false"
    >
      <div class="search-card-container" @click.stop>
        <v-card class="overlay-search-card">
          <div class="search-bar-container">
            <v-text-field
              v-model="search"
              class="search-bar bg-searchbar"
              prepend-inner-icon="mdi-magnify"
              :placeholder="
                searchIsFocused ? '' : $t('home.main_view.search_not_supported')
              "
              variant="plain"
              hide-details
              @focus="searchIsFocused = true"
              @focusout="searchIsFocused = false"
            >
              <!--$t('home.main_view.search_tips')-->
              <template #append>
                <v-btn
                  variant="plain"
                  icon
                  size="small"
                  @click="isShow = false"
                >
                  <v-icon class="search-icon">
                    {{ 'mdi-close' }}
                  </v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </div>

          <!-- <div class="search-result-container">
                       
                    </div> -->
        </v-card>
      </div>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'SearchOverlayGlobal',
  data() {
    return {
      search: '',
      isShow: false,
      searchIsFocused: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    toggleSearchOverlay() {
      this.isShow = !this.isShow;
    },
  },
  watch: {
    isShow(val) {
      if (!val) {
        this.$emit('close');
      }
    },
  },
});
</script>

<style scoped lang="css">
.search-bar-container {
  display: flex;
  margin: 10px 10px;
  opacity: 0.85;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.search-overlay .search-card-container {
  width: 100%;
  height: auto;
  display: flex;
  align-items: top;
  justify-content: center;
}

.search-bar-container .search-bar {
  width: 100%;
  padding: 0px 15px;
  padding-bottom: 14px;
  margin: 0px 10px;
  margin-top: 0px;
  background-color: inherit;
  border-style: solid;
  border-width: 1.5px;
  border-color: var(--home-page-search-bar-border-color);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  line-height: 0.8em;
  text-align: center;
  font-size: 20px;
  font-family: 'Rubik', serif;
  font-optical-sizing: auto;
}

.search-overlay .overlay-search-card {
  margin: 30px 0px;
  width: calc(min(80%, 1200px));
  height: auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.overlay-search-card .search-result-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: top;
  text-align: center;
  width: 100%;
  flex-grow: 1;
}
</style>
