import { Card, CardHeader, CardContent, CardTitle } from "@/components/atom/card.js";
import { Footer } from "@/components/panels/footer.js";
import { Header } from "@/components/panels/header.js";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";
import { Focus } from "@/components/layout/focus.js";

export const Route = createLazyFileRoute("/account")({
  component: Account
});

function Account(): ReactElement {
  return (
    <Focus header={<Header />} footer={<Footer />} className="p-2">
      <Card className="size-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </Focus>
  );
}
