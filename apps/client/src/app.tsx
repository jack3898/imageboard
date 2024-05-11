import { use, type ReactElement } from "react";

export function App(): ReactElement {
  const result = use(fetch("http://localhost:8000/test").then((res) => res.json()));

  return <p className="text-green-300 text-3xl">{result.message}</p>;
}
