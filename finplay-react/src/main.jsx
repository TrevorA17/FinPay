import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; //Import Provider
import store from "./store/store"; // Import redux store
import App from "./App"; //Import App component

// Render the app and wrap it with the Redux provider
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);