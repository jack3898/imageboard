import { type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../atom/card.js";

export function SearchArea(): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-96">
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
