import fetch from 'node-fetch';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const API_KEY = process.env.OMDB_API_KEY;

  if (!query) return new Response("Query not provided", { status: 400 });

  const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await response.json();

  return data && data.Search
    ? new Response(JSON.stringify(data.Search), { status: 200 })
    : new Response("Movies not found", { status: 404 });
}
