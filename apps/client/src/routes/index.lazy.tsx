import { Button } from "@/components/atom/button.js";
import { Card, CardContent, CardHeader } from "@/components/atom/card.js";
import { SiteLogo } from "@/components/atom/site-logo.js";
import { SearchBox } from "@/components/common/search-box.js";
import { Focus } from "@/components/layout/focus.js";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
          <Button asChild className="inline-flex gap-2 items-center p-4">
            <Link to="/explore">
              Let's go <ArrowRight />
            </Link>
          </Button>
          <hr className="my-4" />
          <SearchBox to="/explore" />
        </CardContent>
      </Card>
    </Focus>
  );
}
