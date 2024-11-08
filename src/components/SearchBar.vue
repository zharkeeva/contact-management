<template>
  <div class="search-bar">
    <input
      class="search-bar__input"
      v-model="query"
      @input="onSearch"
      placeholder="Поиск контактов"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const query = ref("");

function onSearch() {
  store.commit("setSearchQuery", query.value);
}
</script>

<style scoped>
.search-bar__input {
  padding: 8px;
  width: 100%;
  border: 1px solid var(--background-color03);
  border-radius: 4px;
}
</style>
