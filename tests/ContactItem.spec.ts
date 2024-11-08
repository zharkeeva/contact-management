import { mount } from "@vue/test-utils";
import ContactItem from "@/components/ContactItem.vue";
import { createStore } from "vuex";

const store = createStore({
  state: {
    editingContact: null,
  },
  mutations: {
    setEditingContact(state, contact) {
      state.editingContact = contact;
    },
  },
});

describe("ContactItem.vue", () => {
  const contact = {
    id: "1",
    name: "John Doe",
    phone: "+123456789",
    email: "john@example.com",
  };

  it("отображает информацию о контакте", () => {
    const wrapper = mount(ContactItem, {
      global: {
        plugins: [store],
      },
      props: { contact },
    });

    expect(wrapper.text()).toContain(contact.name);
    expect(wrapper.text()).toContain(contact.phone);
    expect(wrapper.text()).toContain(contact.email);
  });

  it("вызывает событие edit при нажатии на кнопку редактирования", async () => {
    const wrapper = mount(ContactItem, {
      global: {
        plugins: [store],
      },
      props: { contact },
    });

    await wrapper.find(".icon-button").trigger("click");

    expect(wrapper.emitted("edit")).toBeTruthy();
    expect(wrapper.emitted("edit")![0][0]).toEqual(contact);
  });

  it("вызывает событие delete при нажатии на кнопку удаления", async () => {
    const wrapper = mount(ContactItem, {
      global: {
        plugins: [store],
      },
      props: { contact },
    });

    const deleteButton = wrapper.findAll(".icon-button")[1]; // Вторая кнопка - удалить
    await deleteButton.trigger("click");

    expect(wrapper.emitted("delete")).toBeTruthy();
    expect(wrapper.emitted("delete")![0][0]).toBe(contact.id);
  });
});
