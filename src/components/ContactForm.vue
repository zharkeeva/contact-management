<template>
  <div class="contact-form">
    <h2>{{ isEditing ? "Редактировать контакт" : "Добавить контакт" }}</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Имя:
        <input
          class="contact-form__input"
          v-model="contactData.name"
          required
          placeholder="Name"
        />
      </label>
      <label>
        Телефон:
        <input
          class="contact-form__input"
          v-model="contactData.phone"
          required
          :pattern="phonePattern"
          placeholder="+79998881122"
          title="Введите телефон в формате +79998881122"
        />
      </label>
      <label>
        Email:
        <input
          class="contact-form__input"
          v-model="contactData.email"
          required
          :pattern="emailPattern"
          placeholder="example@domain.com"
          title="Введите email в формате example@domain.com"
        />
      </label>
      <button class="contact-form__button" type="submit">
        {{ isEditing ? "Сохранить" : "Добавить" }}
      </button>
    </form>

    <div v-if="showNotification" class="contact-form__notification">
      Контакт с таким номером уже добавлен.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { PHONE_REGEX, EMAIL_REGEX } from "../utils/validators";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const store = useStore();
const contactData = ref<Contact>({
  id: "",
  name: "",
  phone: "+7",
  email: "",
});

const phonePattern = PHONE_REGEX.source;
const emailPattern = EMAIL_REGEX.source;
const showNotification = ref(false);
const isEditing = computed(() => !!store.state.editingContact);

watch(
  () => store.state.editingContact,
  (editingContact) => {
    if (editingContact) {
      contactData.value = { ...editingContact };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

function handleSubmit() {
  const existingContact = store.getters.getContactByPhone(
    contactData.value.phone
  );

  if (isEditing.value) {
    store.commit("updateContact", contactData.value);
    store.commit("setEditingContact", null);
    resetForm();
  } else if (existingContact) {
    showNotification.value = true;
    setTimeout(() => (showNotification.value = false), 3000);
  } else {
    store.commit("addContact", {
      ...contactData.value,
      id: contactData.value.phone,
    });
    resetForm();
  }
}

function resetForm() {
  contactData.value = { id: "", name: "", phone: "+7", email: "" };
  store.commit("setEditingContact", null);
}
</script>

<style scoped>
.contact-form {
  width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: var(--background-color06);
  border: 1px solid var(--background-color04);
  border-radius: 8px;
  box-shadow: 0 4px 8px var(--box-shadow);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
  color: var(--background-color02);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--background-color03);
  border-radius: 4px;
  background-color: var(--background-color04);
  color: var(--text-color);
}

button {
  padding: 10px 20px;
  background-color: var(--background-color02);
  border: none;
  border-radius: 4px;
  color: var(--white);
  font-weight: bold;
  cursor: pointer;
  align-self: center;
  max-width: 150px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--background-color01);
}

.contact-form__notification {
  position: fixed;
  top: 5px;
  right: 5px;
  background-color: var(--notification-error-bg);
  color: var(--notification-error-color);
  padding: 10px 20px;
  border: 1px solid var(--notification-error-color);
  border-radius: 4px;
  box-shadow: 0 4px 8px var(--box-shadow);
  font-weight: bold;
}
</style>
