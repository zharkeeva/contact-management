<template>
  <div class="contact-list">
    <h2 class="contact-list__title">Список контактов</h2>
    <SearchBar @search="handleSearch" />

    <ul class="contact-list__contacts">
      <ContactItem
        v-for="contact in paginatedContacts"
        :key="contact.id"
        :contact="contact"
        @edit="editContact"
        @delete="deleteContact"
      />
    </ul>

    <div v-if="pageCount > 1" class="contact-list__pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="contact-list__button"
      >
        Назад
      </button>
      <span class="contact-list__page-info">
        {{ currentPage }} из {{ pageCount }}
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage === pageCount"
        class="contact-list__button"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import ContactItem from "./ContactItem.vue";
import SearchBar from "./SearchBar.vue";

const store = useStore();
const currentPage = ref(1);
const itemsPerPage = 3;

const filteredContacts = computed(() => store.getters.filteredContacts);

const pageCount = computed(() =>
  Math.ceil(filteredContacts.value.length / itemsPerPage)
);

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredContacts.value.slice(start, end);
});

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < pageCount.value) currentPage.value++;
}

function handleSearch(query: string) {
  store.commit("setSearchQuery", query);
  currentPage.value = 1;
}

function editContact(contact) {
  store.commit("setEditingContact", contact);
}

function deleteContact(id: string) {
  store.commit("deleteContact", id);
}
</script>

<style scoped>
.contact-list {
  max-width: 1000px;
  margin: 0 auto;
}

.contact-list__title {
  color: var(--text-color);
  margin-bottom: 10px;
}

.contact-list__contacts {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}

.contact-list__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 25px;
}

.contact-list__button {
  padding: 5px 10px;
  background-color: var(--background-color02);
  border: none;
  color: var(--white);
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.contact-list__button:disabled {
  background-color: var(--background-color03);
  cursor: not-allowed;
}

.contact-list__page-info {
  font-weight: bold;
  color: var(--text-color);
}
</style>
