import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

type AuthContextType = {
  user: User | null;
  displayName: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  displayName: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setDisplayName(`${data.firstName} ${data.lastName}`);
        }
      } else {
        setDisplayName(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, displayName }}>
      {children}
    </AuthContext.Provider>
  );
}
