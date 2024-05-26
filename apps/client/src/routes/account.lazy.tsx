import { Card, CardHeader, CardContent, CardTitle } from "@/components/atom/card.js";
import { Footer } from "@/components/common/footer.js";
import { Header } from "@/components/common/header.js";
import { SearchArea } from "@/components/common/search-area.js";
import { BrowseLayout } from "@/components/layout/browse.js";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";

export const Route = createLazyFileRoute("/account")({
  component: Account
});

function Account(): ReactElement {
  return (
    <BrowseLayout
      header={<Header />}
      left={<SearchArea />}
      main={
        <Card className="size-full">
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      }
      footer={<Footer />}
      className="p-2"
    />
  );
}
