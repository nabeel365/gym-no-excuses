'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkoutModeState {
  isWorkoutMode: boolean;
  isMusicPlaying: boolean;
  toggleWorkoutMode: () => void;
  toggleMusic: () => void;
  setWorkoutMode: (value: boolean) => void;
  setMusicPlaying: (value: boolean) => void;
}

export const useWorkoutMode = create<WorkoutModeState>()(
  persist(
    (set) => ({
      isWorkoutMode: false,
      isMusicPlaying: false,
      toggleWorkoutMode: () => set((state) => ({ isWorkoutMode: !state.isWorkoutMode })),
      toggleMusic: () => set((state) => ({ isMusicPlaying: !state.isMusicPlaying })),
      setWorkoutMode: (value) => set({ isWorkoutMode: value }),
      setMusicPlaying: (value) => set({ isMusicPlaying: value }),
    }),
    {
      name: 'workout-mode-storage',
    }
  )
);