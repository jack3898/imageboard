import { Button } from "@/components/atom/button.js";
import { Card, CardContent, CardHeader } from "@/components/atom/card.js";
import { SiteLogo } from "@/components/atom/site-logo.js";
import { Focus } from "@/components/layout/focus.js";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { type ReactElement } from "react";

export const Route = createLazyFileRoute("/")({
  component: Home,
});

function Home(): ReactElement {
  return (
    <Focus>
      <Card className="size-full">
        <CardHeader className="text-center">
          <SiteLogo />
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild>
            <Link to="/explore" preload="intent">
              Explore!
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Focus>
  );
}
