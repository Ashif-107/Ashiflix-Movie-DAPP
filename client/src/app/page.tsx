"use client";
import './globals.css'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from './components/Navbar';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // Don't show anything while redirecting to login
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-[#A1D6E2]">
      <Navbar />
      <div className='min-h-screen p-8 flex flex-col items-center'>
        <h1 className="text-3xl font-bold mb-4">
          Welcome to the <span className='text-gray-700 font-serif'>ASHIFLIX</span> - A Decentralized Movie Platform!
        </h1>
        <h2 className='text-2xl font-bold'>Your All Kind of Movies and Series in One Place</h2>
      </div>
    </div>
  )
}
