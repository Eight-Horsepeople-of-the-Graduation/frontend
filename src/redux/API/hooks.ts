import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useApiDispatch = () => useDispatch<AppDispatch>();
export const useApiSelector: TypedUseSelectorHook<RootState> = useSelector;
