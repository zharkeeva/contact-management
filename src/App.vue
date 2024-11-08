<template>
  <div id="app">
    <ContactForm />
    <ContactList />
    <button
      @click="loadContacts"
      class="app__button app__button--load"
      :disabled="isLoading"
    >
      {{ isLoading ? "Загрузка..." : "Загрузить контакты из API" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import ContactForm from "./components/ContactForm.vue";
import ContactList from "./components/ContactList.vue";

const store = useStore();

const isLoading = computed(() => store.getters.isLoading);

function loadContacts() {
  store.dispatch("loadContactsFromAPI");
}
</script>

<style scoped>
#app {
  text-align: center;
  padding: 20px;
  margin-top: 15px;
}

.app__button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--background-color01);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.app__button:hover:not(:disabled) {
  background-color: var(--background-color02);
}

.app__button--load[disabled] {
  background-color: var(--background-color01);
  cursor: not-allowed;
}
</style>
