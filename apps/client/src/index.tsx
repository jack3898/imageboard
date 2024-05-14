import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowseLayout } from "./layout/browse.js";
import { SearchArea } from "./common/search-area.js";
import { SiteLogo } from "./common/site-logo.js";
import { ImageList } from "./common/image-list.js";
import { Credit } from "./atom/credit.js";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <div className="p-2 min-h-[100svh] grid">
      <BrowseLayout
        header={<SiteLogo />}
        left={<SearchArea />}
        main={<ImageList />}
        footer={<Credit />}
      />
    </div>
  </StrictMode>,
);
