import { Footer } from "@/components/panels/footer.js";
import { Header } from "@/components/panels/header.js";
import { SearchArea } from "@/components/panels/search-area.js";
import { BrowseLayout } from "@/components/layout/browse.js";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";

export const Route = createLazyFileRoute("/explore")({
  component: Explore
});

function Explore(): ReactElement {
  return (
    <BrowseLayout
      header={<Header />}
      left={<SearchArea />}
      main={<Outlet />}
      footer={<Footer />}
      className="p-2"
    />
  );
}
