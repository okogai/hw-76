import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { CssBaseline } from '@mui/material';
import { store } from './app/store.ts';

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
);
