import { type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../atom/card.js";
import { SearchBox } from "./search-box.js";

export function SearchArea(): ReactElement {
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Search</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">
        <SearchBox to="/explore" />
      </CardContent>
    </Card>
  );
}
