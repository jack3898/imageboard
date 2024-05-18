import { Card, CardHeader, CardContent, CardTitle } from "@/components/atom/card.js";
import { Focus } from "@/components/layout/focus.js";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";

export const Route = createLazyFileRoute("/account")({
  component: Account,
});

function Account(): ReactElement {
  return (
    <Focus>
      <Card className="m-2">
        <CardHeader className="text-center">
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </Focus>
  );
}
