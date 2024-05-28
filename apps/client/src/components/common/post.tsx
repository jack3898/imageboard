import { type ReactElement } from "react";
import { Button } from "../atom/button.js";
import { Star } from "lucide-react";

export function PostTitle(): ReactElement {
  return <>Post Title</>;
}

export function PostDescription(): ReactElement {
  return (
    <>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos fugiat ea maiores!
      Minima nisi aut harum aspernatur soluta voluptatum laudantium, numquam, eum veniam quibusdam
      doloribus. Consequatur architecto excepturi modi expedita.
    </>
  );
}

export function PostFavouriteButton(): ReactElement {
  return (
    <Button size="icon" className="w-6 h-6 p-0">
      <Star />
    </Button>
  );
}

export function PostUploader(): ReactElement {
  return <>jack</>;
}

export function PostUploadDate(): ReactElement {
  return <>{new Date().toLocaleDateString()}</>;
}
