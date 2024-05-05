import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Alert {
  severity: "success" | "warning" | "error";
  message: string;
  open: boolean; // a flag to control alert visibility
}

const initialState: Alert = {
  message: "",
  severity: "success",
  open: false, // Initially hidden
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state: Alert,
      action: PayloadAction<{
        message: string;
        severity: typeof state.severity;
      }>
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true; // Set alert to visible
    },
    clearAlert: (state: Alert) => {
      state.message = "";
      state.severity = "success";
      state.open = false; // Hide the alert
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
