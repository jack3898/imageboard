import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GlobalStore = {
  thumbnailFit: "cover" | "contain";
};

const useGlobalStore = create<GlobalStore>()(
  persist(
    () => ({
      thumbnailFit: "cover" as GlobalStore["thumbnailFit"],
    }),
    {
      name: "appGlobalState",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export { useGlobalStore };
