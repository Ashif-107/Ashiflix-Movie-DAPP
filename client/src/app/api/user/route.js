// app/api/user/route.js
import connection from '../../../../lib/db'; // Adjust the path to your database connection
import jwt from 'jsonwebtoken';

export async function GET(req) {
    const token = req.headers.get('authorization')?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return new Response(JSON.stringify({ message: 'Token is required' }), { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Adjust based on your JWT payload structure

        const [rows] = await connection.execute(
            'SELECT username FROM users WHERE id = ?',
            [userId]
        );

        if (rows.length > 0) {
            return new Response(JSON.stringify(rows[0]), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
