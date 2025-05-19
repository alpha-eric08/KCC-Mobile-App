import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  memberSince?: string;
  campus?: string;
  notifications: boolean;
  darkMode: boolean;
  bibleTranslation: string;
  isLoggedIn: boolean;
  toggleNotifications: () => void;
  toggleDarkMode: () => void;
  setBibleTranslation: (translation: string) => void;
  updateProfile: (profile: Partial<UserState>) => void;
  login: (userData: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: '',
      name: 'Guest User',
      email: '',
      photoUrl: undefined,
      memberSince: undefined,
      campus: undefined,
      notifications: true,
      darkMode: false,
      bibleTranslation: 'KJV',
      isLoggedIn: false,
      
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setBibleTranslation: (translation) => set({ bibleTranslation: translation }),
      
      updateProfile: (profile) => set((state) => ({ ...state, ...profile })),
      
      login: (userData) => set({ 
        id: userData.id, 
        name: userData.name, 
        email: userData.email, 
        isLoggedIn: true 
      }),
      
      logout: () => set({ 
        id: '', 
        name: 'Guest User', 
        email: '', 
        photoUrl: undefined, 
        isLoggedIn: false 
      }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);