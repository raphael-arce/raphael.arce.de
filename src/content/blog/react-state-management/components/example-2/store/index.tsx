import { create } from "zustand";

interface Store {
  y: number;
  doubleY: () => void;
}

const useStore = create<Store>((set) => ({
  y: 1,
  doubleY: () => set((state) => ({ y: state.y * 2 })),
}));

export default useStore;
