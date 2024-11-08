import { createStore } from "vuex";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface State {
  contacts: Contact[];
  searchQuery: string;
  editingContact: Contact | null;
  isLoading: boolean;
}

const store = createStore<State>({
  state: {
    contacts: JSON.parse(localStorage.getItem("contacts") || "[]"),
    searchQuery: "",
    editingContact: null,
    isLoading: false,
  },
  mutations: {
    addContact(state, contact: Contact) {
      state.contacts.push(contact);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    deleteContact(state, id: string) {
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    updateContact(state, updatedContact: Contact) {
      const index = state.contacts.findIndex(
        (contact) => contact.id === updatedContact.id
      );
      if (index !== -1) {
        state.contacts[index] = updatedContact;
        localStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
    },
    setEditingContact(state, contact: Contact | null) {
      state.editingContact = contact;
    },
    setSearchQuery(state, query: string) {
      state.searchQuery = query;
    },
    setContacts(state, contacts: Contact[]) {
      state.contacts = contacts;
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    setLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async loadContactsFromAPI({ commit }) {
      commit("setLoading", true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const users = await response.json();
        const contacts = users.map((user: Contact) => ({
          id: user.phone,
          name: user.name,
          phone: user.phone,
          email: user.email,
        }));
        commit("setContacts", contacts);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        commit("setLoading", false);
      }
    },
    editContact({ commit }, contact: Contact) {
      commit("setEditingContact", contact);
    },
    deleteContact({ commit }, id: string) {
      commit("deleteContact", id);
    },
  },
  getters: {
    getContacts: (state) => state.contacts,
    isLoading: (state) => state.isLoading,
    filteredContacts: (state) => {
      const query = state.searchQuery.trim().toLowerCase();

      return state.contacts.filter((contact) => {
        const nameMatch = contact.name.toLowerCase().includes(query);
        const emailMatch = contact.email.toLowerCase().includes(query);
        const phoneMatch = contact.phone.toLowerCase().includes(query);

        return nameMatch || emailMatch || phoneMatch;
      });
    },
    getContactByPhone: (state) => (phone: string) =>
      state.contacts.find((contact) => contact.phone === phone),
    getEditingContact: (state) => state.editingContact,
  },
});

export default store;
