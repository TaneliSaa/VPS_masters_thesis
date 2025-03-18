"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {

    //States
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    const {setUser} = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = res.json();

        if (res.ok) {
            alert("Login successful!");
            setUser({username});
            router.push("/pages/simulation");
        } else {
            alert("Login failed");
        };
    };

    return (

        <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
            <form onSubmit={handleLogin} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2"
                />

                <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
            </form>
        </div>
    );
}