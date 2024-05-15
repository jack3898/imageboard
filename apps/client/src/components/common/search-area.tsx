import { type ReactElement } from "react";

export function SearchArea(): ReactElement {
  return (
    <>
      <strong>Tags</strong>
      <div className="w-96">
        <ul>
          <li>? Flowery</li>
          <li>? Architecture</li>
          <li>? Grass</li>
          <li>? Rural</li>
        </ul>
      </div>
    </>
  );
}
