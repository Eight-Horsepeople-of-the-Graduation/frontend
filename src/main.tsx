import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store as apiStore } from "./redux/api/store.ts";
import { store as appStore } from "./redux/app/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={apiStore}>
    <Provider store={appStore}>
      <App />
    </Provider>
  </Provider>
);
