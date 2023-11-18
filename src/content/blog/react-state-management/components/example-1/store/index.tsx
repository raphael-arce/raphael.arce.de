import { create } from "zustand";

interface Store {
  counterB: number;
  increaseB: () => void;
}

const useStore = create<Store>((set) => ({
  counterB: 1,
  increaseB: () => set((state) => ({ counterB: state.counterB * 2 })),
}));

export default useStore;
