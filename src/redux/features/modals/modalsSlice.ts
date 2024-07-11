import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Modals {
  createListModalOpen: boolean;
  createChallengeModalOpen: boolean;
  bookToAddToListId?: number;
  removeBookFromListValues?: {
    bookId: number;
    listId: number;
  };
  isLoading: boolean;
  challengeToRemoveId?: number;
  listToDeleteId?: number;
}

const initialState: Modals = {
  createListModalOpen: false,
  createChallengeModalOpen: false,
  bookToAddToListId: undefined,
  removeBookFromListValues: undefined,
  isLoading: false,
  challengeToRemoveId: undefined,
  listToDeleteId: undefined,
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
    openRemoveBookFromListModal: (
      state: Modals,
      action: PayloadAction<{
        bookId: number;
        listId: number;
      }>
    ) => {
      state.removeBookFromListValues = action.payload;
    },
    closeRemoveBookFromListModal: (state: Modals) => {
      state.removeBookFromListValues = undefined;
    },
    openRemoveChallengeModel: (
      state: Modals,
      action: PayloadAction<number>
    ) => {
      state.challengeToRemoveId = action.payload;
    },
    closeRemoveChallengeModal: (state: Modals) => {
      state.challengeToRemoveId = undefined;
    },
    openDeleteListModal: (state: Modals, action: PayloadAction<number>) => {
      state.listToDeleteId = action.payload;
    },
    closeDeleteListModal: (state: Modals) => {
      state.listToDeleteId = undefined;
    },
    startLoading: (state: Modals) => {
      state.isLoading = true;
    },
    stopLoading: (state: Modals) => {
      state.isLoading = false;
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
  openRemoveBookFromListModal,
  closeRemoveBookFromListModal,
  openRemoveChallengeModel,
  closeRemoveChallengeModal,
  openDeleteListModal,
  closeDeleteListModal,
  startLoading,
  stopLoading,
} = modalsSlice.actions;

export default modalsSlice.reducer;
