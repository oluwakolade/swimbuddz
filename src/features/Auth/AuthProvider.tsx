import { createContext, useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import type { User } from '@supabase/supabase-js';

type Profile = {
  id: string;
  full_name: string;
  is_member: boolean;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data?.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sessionUser.id)
          .single();

        if (!error && profileData) {
          setProfile(profileData);
        }
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              setProfile(data);
            }
          });
      } else {
        setProfile(null);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;



// import { createContext, useEffect, useState } from 'react';
// import { supabase } from '../../services/supabaseClient';
// import type { User } from '@supabase/supabase-js';

// type AuthContextType = {
//   user: User | null;
// };

// const AuthContext = createContext<AuthContextType>({ user: null });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setUser(data?.session?.user ?? null);
//     });

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => {
//       listener?.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// export default AuthContext;

// import { createContext, useEffect, useState } from 'react';
// import { supabase } from '../../services/supabaseClient';
// import type { User } from '@supabase/supabase-js';

// type AuthContextType = {
//   user: User | null;
//   fullName: string | null;
//   isMember: boolean;
//   role: string | null;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   fullName: null,
//   isMember: false,
//   role: null,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [fullName, setFullName] = useState<string | null>(null);
//   const [isMember, setIsMember] = useState<boolean>(false);
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     const loadSession = async () => {
//       const { data } = await supabase.auth.getSession();
//       const sessionUser = data.session?.user ?? null;
//       setUser(sessionUser);

//       if (sessionUser) {
//         setFullName(sessionUser.user_metadata?.full_name ?? null);
//         setIsMember(sessionUser.user_metadata?.is_member ?? false);
//         setRole(sessionUser.user_metadata?.role ?? null);
//       }
//     };

//     loadSession();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       const sessionUser = session?.user ?? null;
//       setUser(sessionUser);

//       if (sessionUser) {
//         setFullName(sessionUser.user_metadata?.full_name ?? null);
//         setIsMember(sessionUser.user_metadata?.is_member ?? false);
//         setRole(sessionUser.user_metadata?.role ?? null);
//       }
//     });

//     return () => {
//       listener?.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, fullName, isMember, role }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
