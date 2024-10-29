'use client';
import './globals.css'

import { useEffect, useState } from "react";

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum: any;
  }
}
import { useRouter } from "next/navigation";
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import Loader from './components/Loader';

import { ethers } from 'ethers'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [movPresent, isMovPresent] = useState(false);

  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);


  useEffect(() => {
    // Check for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  async function handleAccountChange(accounts: string | any[]) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log("Metamask Connected: " + address);
        setAccount(address);
        setIsConnected(true);
      } catch (err) {
        console.error("Error connecting to wallet:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  const searchMovies = async () => {
    const res = await fetch(`/api/movies/search?q=${query}`);
    const data = await res.json();
    setMovies(data);
    isMovPresent(true);
  };



  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
      } else {
        try {
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Invalid token", error);
          localStorage.removeItem("token"); // Clear invalid token
          router.push("/login");
        }
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
    <div className="bg-[#A1D6E2] overflow-hidden">
      <Navbar
        connectWallet={connectWallet}
        account={account}
        isConnected={isConnected}
      />
      <div className='min-h-screen p-8 flex flex-col items-center'>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Welcome to the <span className='text-gray-700 font-serif'>ASHIFLIX</span> - A Decentralized Movie Platform!
        </h1>
        <h2 className='text-xl md:text-2xl font-bold mb-7'>Your All Kind of Movies and Series in One Place</h2>

        <div>
          {!isConnected ?(
            <h1>Please connect to Metamask</h1>
          ):(<>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="border border-gray-300 rounded-md p-2 mb-4 bg-[#1995AD]"
            />
            <button onClick={searchMovies} className="ml-9 bg-blue-500 text-white rounded-md px-4 py-2 mb-4 hover:bg-blue-600 transition-colors duration-200">Search</button>
          </>)}
        </div>
        <div className='movie-section p'>
          {!movPresent ? (
            <Loader />
          ) : (
            <MovieList movies={movies} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
