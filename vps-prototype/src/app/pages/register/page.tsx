"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterPage() {

    //States
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username,password}),
        });

        if (res.ok) {
            alert("Register successful!")
            router.push("/pages/login");
        } else {
            alert("Registeration failed.")
        }
    };

    return(
        <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
            <form onSubmit={handleRegister} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2"
                />

                <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
            </form>
        </div>
    );
}