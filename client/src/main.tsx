import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeContextProvider } from "./contexts/ThemeContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
