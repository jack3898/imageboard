import { Button } from "@/components/atom/button.js";
import { Card, CardContent, CardHeader } from "@/components/atom/card.js";
import { SiteLogo } from "@/components/atom/site-logo.js";
import { Footer } from "@/components/panels/footer.js";
import { Header } from "@/components/panels/header.js";
import { SearchBox } from "@/components/common/search-box.js";
import { Focus } from "@/components/layout/focus.js";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type ReactElement } from "react";
import { Separator } from "@/components/atom/separator.js";

export const Route = createLazyFileRoute("/")({
  component: Home
});

function Home(): ReactElement {
  return (
    <Focus header={<Header />} footer={<Footer />} className="p-2">
      <Card>
        <CardHeader className="text-center">
          <SiteLogo />
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild className="inline-flex gap-2 items-center p-4">
            <Link to="/explore" search={{ q: "" }}>
              Explore posts <ArrowRight />
            </Link>
          </Button>
          <Separator className="my-4" />
          <SearchBox to="/explore" />
        </CardContent>
      </Card>
    </Focus>
  );
}
