import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/system";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Box maxWidth="100%" display="flex" justifyContent="center">
        <Provider store={store}>
          <App />
        </Provider>
      </Box>
    </BrowserRouter>
  </React.StrictMode>
);
