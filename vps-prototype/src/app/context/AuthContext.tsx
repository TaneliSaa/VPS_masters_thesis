/* This is a global authentication state which basically allows any page or component in my app to access the logged in user wihtout needing constantly fetch with /api/me. I made this component for the purpose of instantly changing logged in message in my navbar. This is also very helpful if I need to access user information with any future component (maybe with activity log?)*/ 

"use client"

import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface User {
    username: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children} : {children: React.ReactNode}) {
    //States
    const [user,setUser] = useState<User | null>(null);

    //useEffect which automatically fetches user on page load
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/me");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        };
        fetchUser();

    },[]);

    return (
        //Components can access to user data
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}