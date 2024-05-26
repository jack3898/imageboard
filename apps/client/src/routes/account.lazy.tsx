import { Card, CardHeader, CardContent, CardTitle } from "@/components/atom/card.js";
import { Footer } from "@/components/panels/footer.js";
import { Header } from "@/components/panels/header.js";
import { FullLayout } from "@/components/layout/full.js";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";

export const Route = createLazyFileRoute("/account")({
  component: Account
});

function Account(): ReactElement {
  return (
    <FullLayout
      header={<Header />}
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
