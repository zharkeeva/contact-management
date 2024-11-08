<template>
  <li class="contact-item">
    <transition name="fade">
      <template v-if="isEditing">
        <div class="contact-item__editing-overlay">
          <span class="material-icons contact-item__edit-icon">edit</span>
        </div>
      </template>
      <template v-else>
        <div class="contact-item__info">
          <p>{{ contact.name }}</p>
          <p>{{ contact.phone }}</p>
          <p>{{ contact.email }}</p>
        </div>
      </template>
    </transition>
    <div class="contact-item__actions">
      <button @click="editContact" class="contact-item__icon-button">
        <span class="material-icons">edit</span>
      </button>
      <button @click="deleteContact" class="contact-item__icon-button">
        <span class="material-icons">delete</span>
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { defineProps } from "vue";
import { useStore } from "vuex";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const props = defineProps<{ contact: Contact }>();

const store = useStore();
const isEditing = computed(
  () => store.state.editingContact?.id === props.contact.id
);

function editContact() {
  store.dispatch("editContact", props.contact);
}

function deleteContact() {
  store.dispatch("deleteContact", props.contact.id);
}
</script>

<style scoped>
.contact-item {
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--background-color04);
  border-radius: 8px;
  box-shadow: 0 4px 8px var(--box-shadow);
  position: relative;
  transition: transform 0.2s;
}

.contact-item:hover {
  transform: translateY(+5px);
}

.contact-item__info {
  color: var(--text-color);
  margin-top: 20px;
}

.contact-item__info p {
  margin: 5px 0;
}

.contact-item__actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
}

.contact-item__icon-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--background-color02);
  transition: color 0.3s;
}

.contact-item__icon-button:hover .material-icons {
  color: var(--background-color01);
}

.material-icons {
  font-size: 20px;
  color: var(--background-color03);
}

.contact-item__editing-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background-color05);
  border-radius: 8px;
  transition: opacity 0.5s ease;
}

.contact-item__edit-icon {
  font-size: 48px;
  color: var(--text-color);
  opacity: 0.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
