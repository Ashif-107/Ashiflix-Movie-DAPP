// pages/api/auth/login.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connection from '../../../../../lib/db';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const [rows] = await connection.execute(
      'SELECT * fROM users WHERE username = ? ',
      [username]
    );

    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
