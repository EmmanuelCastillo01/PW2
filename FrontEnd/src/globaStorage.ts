import { create } from "zustand";

interface UserState {
    user: Usuario | null;
    setUser: (newUser: Usuario) => void;
    logout: () => void;
  }
  
  // Creamos la store con create
  export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (newUser) => set({ user: newUser }),
    logout: () => set({ user: null }),
  }));