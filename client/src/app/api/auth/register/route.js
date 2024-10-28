// app/api/auth/register/route.js

import bcrypt from 'bcryptjs';
import connection from '../../../../../lib/db';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Validate input
        if (!username || !password) {
            return new Response(JSON.stringify({ message: 'Username and password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        return new Response(JSON.stringify({ message: 'User registered successfully' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
