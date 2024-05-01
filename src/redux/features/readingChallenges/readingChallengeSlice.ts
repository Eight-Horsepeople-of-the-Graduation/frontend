import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface readingChallengeState {
  selectedChallengeId: number;
}
const initialState = {
  selectedChallengeId: 1,
};

export const readingChallengeSlice = createSlice({
  name: "readingChallenge",
  initialState,
  reducers: {
    selectChallenge: (
      state: readingChallengeState,
      action: PayloadAction<number>
    ) => {
      state.selectedChallengeId = action.payload;
    },
  },
});

export const { selectChallenge } = readingChallengeSlice.actions;

export default readingChallengeSlice.reducer;
