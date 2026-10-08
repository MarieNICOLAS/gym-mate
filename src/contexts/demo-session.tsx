import { createContext, useContext, useState, type PropsWithChildren } from 'react';
type DemoUser = {
  name: string;
  email: string;
};
type Session = {
  user: DemoUser | null;
  login: (email: string) => void;
  logout: () => void;
  updateName: (name: string) => void;
};
const Context = createContext<Session | null>(null);
// Session de maquette en mémoire. À remplacer par Firebase Authentication.
export function DemoSessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<DemoUser | null>(null);
  return <Context.Provider value={{ user, login: email => setUser({ email, name: email.split('@')[0] }), logout: () => setUser(null), updateName: name => setUser(current => current ? { ...current, name } : null) }}>{children}</Context.Provider>;
}
export function useDemoSession() {
  const session = useContext(Context);
  if (!session)
    throw new Error('DemoSessionProvider manquant');
  return session;
}
