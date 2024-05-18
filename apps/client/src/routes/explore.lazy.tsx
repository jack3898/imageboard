import { Footer } from "@/components/common/footer.js";
import { Header } from "@/components/common/header.js";
import { SearchArea } from "@/components/common/search-area.js";
import { BrowseLayout } from "@/components/layout/browse.js";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";

export const Route = createLazyFileRoute("/explore")({
  component: Explore,
});

function Explore(): ReactNode {
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
