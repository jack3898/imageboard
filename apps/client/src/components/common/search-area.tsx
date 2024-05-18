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
        <hr className="my-4" />
        <div className="max-w-96 overflow-auto">
          <ul>
            <li>? Flowery</li>
            <li>? Architecture</li>
            <li>? Grass</li>
            <li>? Rural</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
