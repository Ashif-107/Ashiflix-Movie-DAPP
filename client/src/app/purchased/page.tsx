'use client'
import { useEffect, useState } from "react";

export default function Page() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [username, setUsername] = useState<string | null>(null);



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
                    setUsername(data.username); // Set the username from the response
                } else {
                    console.error('Failed to fetch username:', response.statusText);
                }
            }
        };

        fetchUsername();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Using fetch to make a GET request
                console.log(`${username} is being called`)
                const response = await fetch(`/api/pur?userId=${username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data = await response.json();

                console.log('Fetched movies:', movies);
                
                if (data.success && Array.isArray(data.movies)) {
                    setMovies(data.movies);
                } else {
                    console.error('Error fetching movies:', data.message);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [username]);

    if (loading) return <div>Loading movies...</div>;

    return (
        <div className="bg-[#A1D6E2] min-h-screen overflow-hidden p-8">
            <h1 className="text-center text-2xl md:text-5xl font-extrabold">Your Purchased Movies</h1>
            {movies.length > 0 ? (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>{movie.title} - {movie.release_date}</li>
                    ))}
                </ul>
            ) : (
                <p className="font-semibold text-xl md:text-3xl text-center mt-[100px]">You have not purchased any movies yet.</p>
            )}
        </div>
    )
}