import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Contact } from "@/@types";
import { contactsApi } from "@/store/services";

interface ContactsState {
  contacts: Contact[];
  selectedContact?: Contact | null;
}

const initialState: ContactsState = {
  contacts: [],
  selectedContact: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSelectedContact(state, action: PayloadAction<Contact | null>) {
      state.selectedContact = action.payload;
    },
    clearContacts(state) {
      state.contacts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 When getContacts succeeds, sync to slice
      .addMatcher(
        contactsApi.endpoints.getContacts.matchFulfilled,
        (state, action) => {
          state.contacts = action.payload;
        },
      )

      // 🔹 When addContact succeeds
      .addMatcher(
        contactsApi.endpoints.addContact.matchFulfilled,
        (state, action) => {
          // JSON server usually returns created entity
          if (action.payload !== undefined && action.payload !== null) {
            state.contacts.push(action.payload as Contact);
          }
        },
      )

      // 🔹 When updateContact succeeds
      .addMatcher(
        contactsApi.endpoints.updateContact.matchFulfilled,
        (state, action) => {
          const updated = action.payload as unknown as Contact;
          const index = state.contacts.findIndex((c) => c.id === updated.id);
          if (index !== -1) {
            state.contacts[index] = updated;
          }
        },
      )

      // 🔹 When deleteContact succeeds
      .addMatcher(
        contactsApi.endpoints.deleteContact.matchFulfilled,
        (state, action) => {
          const deletedId = action.meta.arg.originalArgs;
          state.contacts = state.contacts.filter((c) => c.id !== deletedId);
        },
      );
  },
});

export const { setSelectedContact, clearContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
