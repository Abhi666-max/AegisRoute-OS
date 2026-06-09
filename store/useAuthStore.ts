import { create } from 'zustand';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
  uid: string;
  email: string;
  role: "citizen" | "authority" | "admin";
  country: string;
  createdAt: number;
}

interface AuthState {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  isDemoModalOpen: boolean;
  setUser: (user: User | null) => void;
  setUserData: (data: UserData | null) => void;
  setAuthModalOpen: (isOpen: boolean) => void;
  setDemoModalOpen: (isOpen: boolean) => void;
  initializeAuth: () => () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userData: null,
  loading: true,
  isAuthModalOpen: false,
  isDemoModalOpen: false,
  setUser: (user) => set({ user }),
  setUserData: (userData) => set({ userData }),
  setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
  setDemoModalOpen: (isOpen) => set({ isDemoModalOpen: isOpen }),
  initializeAuth: () => {
    set({ loading: true });
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      set({ user });
      if (user) {
        if (user.email === 'abhi.admin.dev@gmail.com') {
          set({ 
            userData: { uid: user.uid, email: user.email, role: 'admin', country: 'Global', createdAt: Date.now() },
            isAuthModalOpen: false 
          });
        } else {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              set({ userData: userDoc.data() as UserData });
            } else {
              set({ userData: null });
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            set({ userData: null });
          }
        }
      } else {
        set({ userData: null });
      }
      set({ loading: false });
    });
    return unsubscribe;
  }
}));
