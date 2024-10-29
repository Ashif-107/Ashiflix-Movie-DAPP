import db from '../../../../../lib/db'; // Adjust this import based on your DB connection logic

export async function POST(req) {
    console.log('POST request received');
    try {
        const { username, title, releaseDate } = await req.json();

        // Log the incoming data for debugging
        console.log('Received data:', { username, title, releaseDate });

        // Validate the input
        if (!username || !title || !releaseDate) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Insert movie into the database
        await db.query('INSERT INTO movies (title,userId, release_date) VALUES (?, ?, ?)', [title,username,releaseDate]);

        return new Response(JSON.stringify({ message: 'Movie added successfully' }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error adding movie to database:', error);

        // Return a 500 error response with the error message
        return new Response(JSON.stringify({ error: 'Failed to add movie' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
