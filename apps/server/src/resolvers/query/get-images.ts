import { type Image } from "@/types/generated-graphql-types.js";

export function getImages(): Image[] {
  return [
    {
      id: "1",
      thumbnailUrl: "https://picsum.photos/200/300",
      alt: "",
    },
    {
      id: "2",
      thumbnailUrl: "https://picsum.photos/300/200",
      alt: "",
    },
    {
      id: "3",
      thumbnailUrl: "https://picsum.photos/220/300",
      alt: "",
    },
  ];
}
