import { create } from "zustand";

type BrowserStore = {
  viewportWidth: number;
  viewportHeight: number;
};

const useBrowserStore = create<BrowserStore>()(() => ({
  viewportHeight: window.innerHeight,
  viewportWidth: window.innerWidth,
}));

window.addEventListener("resize", () => {
  useBrowserStore.setState({
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
  });
});

export { useBrowserStore };
