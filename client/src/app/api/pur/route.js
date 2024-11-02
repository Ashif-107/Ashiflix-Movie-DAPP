import db from '../../../../lib/db'; // Adjust the path to your database connection
import { NextResponse } from 'next/server';


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('userId');
        
        if (!username) {
            return NextResponse.json({ success: false, message: 'Username is required' }, { status: 400 });
        }// Retrieve userId from query params

        console.log('Fetching movies for username:', username);

        // Query to get movies based on user ID
        const movies = await db.query(
            'SELECT * FROM movies WHERE userId = ?',
            [username]
        );

        console.log('Query results:', movies.rows);


        return NextResponse.json({ success: true, movies: movies.rows }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user movies:', error);
        return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
    }
}

