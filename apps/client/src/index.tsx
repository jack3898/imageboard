import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/theme.js";
import { ApolloClientProvider } from "./context/apollo.js";
import { QueryProvider } from "./context/query.js";
import { Router } from "./context/router.js";
import { ImageboardContextProvider } from "./context/imageboard.js";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <ApolloClientProvider>
      <QueryProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ImageboardContextProvider>
            <div className="min-h-[100svh] grid bg-background text-foreground">
              <Router />
            </div>
          </ImageboardContextProvider>
        </ThemeProvider>
      </QueryProvider>
    </ApolloClientProvider>
  </StrictMode>
);
