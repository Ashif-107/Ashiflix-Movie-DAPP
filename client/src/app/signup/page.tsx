/* eslint-disable @next/next/no-img-element */
// src/app/signup/page.tsx
"use client";


import '../globals.css'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setMessage("Signup successful! Redirecting to login...");
                setTimeout(() => router.push("/login"), 1500);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Signup failed");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again." + error);
        }
    };

    return (
        <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center overflow-hidden" style={{ backgroundImage: "url('/log.jpg')" }}>
            <img src="logo.png" alt="logo" className='w-[150px] absolute top-10 left-10'/>
            <div className='bg-black bg-opacity-80 shadow-lg p-20'>

                <h2 className='text-4xl text-white font-bold mb-8'>Signup</h2>
                <form onSubmit={handleSignup} className='flex flex-col gap-6 text-white'>
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
                    <button type="submit" className='bg-[#E50914] text-white text-xl py-2 font-bold'>Register Now</button>
                    <p className='text-gray-400'>Already have a account? <a className="text-blue-500" href="/login">Login now</a></p>

                </form>
                {message && <p className='text-gray-400'>{message}</p>}
            </div>
        </div>
    );
}
