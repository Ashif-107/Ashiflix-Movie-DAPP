/* eslint-disable @next/next/no-img-element */
// src/app/login/page.tsx
"use client";

import '../globals.css'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem("token", token);  // Store token in localStorage for authenticated requests
                router.push("/");
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Login failed");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again." + error);
        }
    };

    return (
        <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center overflow-hidden" style={{ backgroundImage: "url('/log.jpg')" }}>
            <img src="logo.png" alt="logo" className='w-[150px] absolute top-10 left-10'/>
            <div className='bg-black bg-opacity-80 shadow-lg p-20'>

                <h2 className='text-4xl text-white font-bold mb-8'>Login</h2>
                <form onSubmit={handleLogin} className='flex flex-col gap-6 text-white'>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='bg-[#181717] bg-opacity-50 p-4 border w-80 rounded-lg'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='bg-[#181717] bg-opacity-50 p-4 border w-80 rounded-lg'
                    />
                    <button type="submit" className='bg-[#E50914] text-white text-xl py-2 font-bold'>Login</button>
                    <p className='text-gray-400'>New To Ashiflix? <a className="text-blue-500" href="/signup">Sign up now</a></p>
                </form>
                {message && <p className='text-gray-400'>{message}</p>}
            </div>
        </div>
    );
}
