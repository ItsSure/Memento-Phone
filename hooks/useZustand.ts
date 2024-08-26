import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useZustand = create((set) => ({
  date: null,

  setDate: async (date: Date) => {
    await AsyncStorage.setItem("date", date.toISOString());
    set(() => ({ date }));
  },

  resetDate: async () => {
    await AsyncStorage.removeItem("date");
    set({ date: null });
  },

  loadDate: async () => {
    const dateString = await AsyncStorage.getItem("date");
    if (dateString) {
      set({ date: new Date(dateString) });
    }
  },
}));
