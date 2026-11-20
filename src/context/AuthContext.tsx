import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
  avatar?: string;
};

type StoredUser = User & {
  password: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => Promise<void>;
  updateAvatar: (uri: string) => Promise<void>;
};

const USERS_KEY = "users";
const SESSION_KEY = "session_email";

const AuthContext = createContext<AuthContextValue | null>(null);

async function readUsers(): Promise<StoredUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function toPublicUser(stored: StoredUser): User {
  return { name: stored.name, email: stored.email, avatar: stored.avatar };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const email = await AsyncStorage.getItem(SESSION_KEY);
        if (email) {
          const users = await readUsers();
          const found = users.find((u) => u.email === email);
          if (found) {
            setUser(toPublicUser(found));
          }
        }
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const users = await readUsers();
    const normalized = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalized)) {
      throw new Error("An account with this email already exists");
    }
    const newUser: StoredUser = {
      name: name.trim(),
      email: normalized,
      password,
    };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  };

  const login = async (email: string, password: string, remember: boolean) => {
    const users = await readUsers();
    const normalized = email.trim().toLowerCase();
    const found = users.find(
      (u) => u.email === normalized && u.password === password,
    );
    if (!found) {
      throw new Error("Invalid email or password");
    }
    setUser(toPublicUser(found));
    if (remember) {
      await AsyncStorage.setItem(SESSION_KEY, normalized);
    } else {
      await AsyncStorage.removeItem(SESSION_KEY);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const updateAvatar = async (uri: string) => {
    if (!user) {
      return;
    }
    const users = await readUsers();
    const updated = users.map((u) =>
      u.email === user.email ? { ...u, avatar: uri } : u,
    );
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));
    setUser({ ...user, avatar: uri });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, updateAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
