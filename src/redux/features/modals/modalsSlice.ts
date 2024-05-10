import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Modals {
  createListModalOpen: boolean;
  createChallengeModalOpen: boolean;
  bookToAddToListId?: number;
}

const initialState: Modals = {
  createListModalOpen: false,
  createChallengeModalOpen: false,
  bookToAddToListId: undefined,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openCreateListModal: (state: Modals) => {
      state.createListModalOpen = true;
    },
    closeCreateListModal: (state: Modals) => {
      state.createListModalOpen = false;
    },
    openCreateChallengeModal: (state: Modals) => {
      state.createChallengeModalOpen = true;
    },
    closeCreateChallengeModal: (state: Modals) => {
      state.createChallengeModalOpen = false;
    },
    openAddBookToListModal: (
      state: Modals,
      action: PayloadAction<{
        bookToAddToListId: number;
      }>
    ) => {
      state.bookToAddToListId = action.payload.bookToAddToListId;
    },
    closeAddBookToListModal: (state: Modals) => {
      state.bookToAddToListId = undefined;
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
