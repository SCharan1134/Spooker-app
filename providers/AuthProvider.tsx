import { createContext, PropsWithChildren, useContext } from "react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { View } from "react-native";
import { Session, User } from "@supabase/supabase-js";
import { Use } from "react-native-svg";

type AuthContext = {
  session: Session | null;
  user: User | null;
  profile: any | null;
};

const AuthContext = createContext<AuthContext>({
  session: null,
  user: null,
  profile: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    const fetchProfile = async () => {
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      setProfile(data);
    };
  }, [session?.user]);
  return (
    <AuthContext.Provider
      value={{ session, user: session?.user as User, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
