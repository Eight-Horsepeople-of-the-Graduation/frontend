import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Modals {
  createListModalOpen: boolean;
  createChallengeModalOpen: boolean;
  bookToAddToListId?: number;
  bookToRemoveFromListId?: number;
  listToRemoveBookFromId?: number;
  isLoading: boolean;
  challengeToRemoveId?: number;
}

const initialState: Modals = {
  createListModalOpen: false,
  createChallengeModalOpen: false,
  bookToAddToListId: undefined,
  bookToRemoveFromListId: undefined,
  listToRemoveBookFromId: undefined,
  isLoading: false,
  challengeToRemoveId: undefined
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
        bookToRemoveFromListId: number;
        listToRemoveBookFromId: number;
      }>
    ) => {
      state.bookToRemoveFromListId = action.payload.bookToRemoveFromListId;
      state.listToRemoveBookFromId = action.payload.listToRemoveBookFromId;
    },
    closeRemoveBookFromListModal: (state: Modals) => {
      state.bookToRemoveFromListId = undefined;
      state.listToRemoveBookFromId = undefined;
    },
    openRemoveChallengeModel: (
      state: Modals,
      action: PayloadAction< number>
    ) => {
      state.challengeToRemoveId = action.payload;
    },
    closeRemoveChallengeModel: (state: Modals) => {
      state.challengeToRemoveId = undefined;
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
  startLoading,
  stopLoading,
} = modalsSlice.actions;

export default modalsSlice.reducer;
