'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';


interface NavbarProps {
    connectWallet: () => void;
    account: string | null;
    isConnected: boolean;
}

export default function Navbar({ connectWallet, account, isConnected }: NavbarProps) {

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
    return (
        <div className="flex-col flex mb-6 md:flex-row justify-between p-10 bg-[#1995AD]">
            <div>
                <h1 className="text-xl md:text-4xl font-bold mb-3">ASHIFLIX</h1>
            </div>
            <div>
                {isConnected ?
                    (
                        <h1 className='md:gap-8 md:text-xl text-sm font-semibold'>{account}</h1>
                    )
                    : (<button
                        onClick={connectWallet}
                        className=' bg-blue-500 text-white rounded-md px-4 py-2 mb-4 hover:bg-blue-600 transition-colors duration-200'>Connect To MetaMask
                    </button>)}
            </div>
            <div className="flex gap-4 md:gap-8 md:text-xl text-sm font-semibold">
                <Link href="/">Home</Link>
                <Link href="/purchased">Purchased</Link>
                <Link href=""> {username ? `${username}` : 'Loading...'}</Link>
            </div>
        </div>
    )
}