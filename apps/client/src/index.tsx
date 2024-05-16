import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowseLayout } from "./components/layout/browse.js";
import { SearchArea } from "./components/common/search-area.js";
import { ImageList } from "./components/common/image-list.js";
import { Footer } from "./components/common/footer.js";
import { Header } from "./components/common/header.js";
import { ThemeProvider } from "./context/theme.js";
import { ApolloClientProvider } from "./context/apollo.js";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <ApolloClientProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-[100svh] grid bg-background text-foreground">
          <BrowseLayout
            header={<Header />}
            left={<SearchArea />}
            main={<ImageList />}
            footer={<Footer />}
            className="p-2"
          />
        </div>
      </ThemeProvider>
    </ApolloClientProvider>
  </StrictMode>,
);
