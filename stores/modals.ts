"use client";

import { create } from "zustand";

interface Modal<T> {
  data: T | null;
  setData: (value: T | null) => void;
}

export type State = {
  eventModal: Modal<{ lat: number; lng: number }>;
};

const useModal = create<State>((set, get) => ({
  eventModal: {
    data: null,
    setData: (value) =>
      set({ eventModal: { data: value, setData: get().eventModal.setData } }),
  },
}));

export { useModal };
