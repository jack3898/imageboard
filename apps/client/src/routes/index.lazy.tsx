import { Card, CardContent, CardHeader } from "@/components/atom/card.js";
import { SiteLogo } from "@/components/atom/site-logo.js";
import { SearchBox } from "@/components/common/search-box.js";
import { Focus } from "@/components/layout/focus.js";
import { createLazyFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";

export const Route = createLazyFileRoute("/")({
  component: Home,
});

function Home(): ReactElement {
  return (
    <Focus>
      <Card className="m-2">
        <CardHeader className="text-center">
          <SiteLogo />
        </CardHeader>
        <CardContent className="text-center">
          <SearchBox to="/explore" />
        </CardContent>
      </Card>
    </Focus>
  );
}
