import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

// async function enableMocking() {
//   if (import.meta.env.DEV) {
//     const { worker } = await import("./mocks/broswer.ts");
//     await worker.start({
//       onUnhandledRequest: "bypass",
//     });
//   }
// }

// enableMocking();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
