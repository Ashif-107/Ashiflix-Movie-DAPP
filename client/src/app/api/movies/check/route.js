import db from '../../../../../lib/db'; // Adjust this import based on your DB connection logic

export async function GET(req) {
  console.log('GET function called');
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const title = searchParams.get("title");
  console.log(`received check fetch with userId: ${userId} and title: ${title}`);


  try {
    // Check the database for the movie title associated with the userId
    const result = await db.query('SELECT * FROM movies WHERE userId = ? AND title = ?', [userId, title]);

    console.log('Query result:', result);

    // Set purchased to true if the movie exists, otherwise false
    const purchased = result.length > 0;

    // Return the purchased status in the response
    return new Response(JSON.stringify({ purchased }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
