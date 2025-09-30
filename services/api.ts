export const TMBD_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    ACCESS_TOKEN: process.env.EXPO_PUBLIC_MOVIE_ACCESS_TOKEN,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_ACCESS_TOKEN}`
    }
}

export const fetchMovies = async ({query}: {query: string }) => {
    const endpoint =  query 
    ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response =  await fetch(endpoint, {
        method: 'GET',
        headers: TMBD_CONFIG.headers,
    });

    if(!response.ok){
        // @ts-ignore
        throw new Error('Failed to fetch movies', response.statusText);
    }

    const data = await response.json();

    return data.results;

} 

export const fetchMovieDetails = async ({movieId} : {movieId: string})=> {
   try{
    const endpoint = `${TMBD_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMBD_CONFIG.ACCESS_TOKEN}`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMBD_CONFIG.headers
    });
    console.log(`response: ${response.body}`);
    if(!response.ok){
        throw new Error('Failed to fetch movie details');}

        const data = await response.json();
        return data
   } catch(error){
    console.error('Error fetching movie details:', error);
    throw error;
   }
}