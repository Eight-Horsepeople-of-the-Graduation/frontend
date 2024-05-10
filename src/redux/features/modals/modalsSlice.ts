import { createSlice } from "@reduxjs/toolkit";

export interface Modals {
  createListModalOpen: boolean;
  createChallengeModalOpen: boolean;
  addBookToListModalOpen: boolean;
}

const initialState: Modals = {
  createListModalOpen: false,
  createChallengeModalOpen: false,
  addBookToListModalOpen: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openCreateListModal: (state) => {
      state.createListModalOpen = true;
    },
    closeCreateListModal: (state) => {
      state.createListModalOpen = false;
    },
    openCreateChallengeModal: (state) => {
      state.createChallengeModalOpen = true;
    },
    closeCreateChallengeModal: (state) => {
      state.createChallengeModalOpen = false;
    },
    openAddBookToListModal: (state) => {
      state.addBookToListModalOpen = true;
    },
    closeAddBookToListModal: (state) => {
      state.addBookToListModalOpen = false;
    },
  },
});

export const {
  openCreateListModal,
  closeCreateListModal,
  openCreateChallengeModal,
  closeCreateChallengeModal,
  openAddBookToListModal,
  closeAddBookToListModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
