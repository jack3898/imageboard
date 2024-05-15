import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowseLayout } from "./components/layout/browse.js";
import { SearchArea } from "./components/common/search-area.js";
import { ImageList } from "./components/common/image-list.js";
import { Footer } from "./components/common/footer.js";
import { Header } from "./components/common/header.js";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <div className="min-h-[100svh] grid">
      <BrowseLayout
        header={<Header />}
        left={<SearchArea />}
        main={<ImageList />}
        footer={<Footer />}
        className="p-2 bg-slate-200"
      />
    </div>
  </StrictMode>,
);
