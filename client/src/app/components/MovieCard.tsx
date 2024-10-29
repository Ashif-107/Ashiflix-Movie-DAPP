/* eslint-disable @next/next/no-img-element */
interface Movie {
  Poster: string;
  Title: string;
  Year: string;
}


import { ethers } from 'ethers';
import { contractaddress, contractAbi } from '../constants/constants';
import { useEffect, useState } from 'react';



export default function MovieCard({ movie }: { movie: Movie }) {

  const [isPurchased, setIsPurchased] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);



  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token'); // Assuming you stored the token in localStorage

      if (token) {
        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setUserId(data.id); // Set the username from the response
        } else {
          console.error('Failed to fetch username:', response.statusText);
        }
      }
    };

    fetchUsername();
  }, []);


 
  const buyMovie = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to purchase movies!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractaddress, contractAbi, signer);

      // Call purchaseMovie with the required payment in VT
      const price = ethers.parseEther("0.0001");
      const tx = await contractInstance.purchaseMovie(movie.Title, {
        value: price
      });

      await tx.wait(); // Wait for transaction confirmation
      console.log(`Movie purchased: ${movie.Title} (${movie.Year})`);

      console.log('Adding movie:', { username, title: movie.Title, releaseDate: movie.Year });

      const response = await fetch('/api/movies/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // Use the correct userId here
          title: movie.Title,
          releaseDate: movie.Year,
        }),
      });

      if (!response.ok) {
        console.error('Failed to add movie:', response.statusText);
      } else {
        setIsPurchased(true);
      }
    } catch (error) {
      console.error("Error purchasing movie:", error);
      if ((error as any).data) {
        console.log("Revert reason:", (error as any).data.message);
      }
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 w-64 h-88 p-4">
      <img className="w-full h-88 object-cover" src={movie.Poster} alt={movie.Title} />
      <div className="p-4 bg-gray-300">
        <h3 className="text-lg font-semibold">{movie.Title}</h3>
        <p className="text-gray-500">{movie.Year}</p>
        {!isPurchased && (
          <button
            onClick={buyMovie}
            className="mt-2 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors duration-200"
          >
            Buy
          </button>
        )}
        {isPurchased && (
          <p className="mt-2 w-full bg-green-500 text-white rounded-md py-2 text-center">
            Purchased
          </p>
        )}
      </div>
    </div>
  );
}
