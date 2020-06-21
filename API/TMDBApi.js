
const API_TOKEN = "a943f9123bb2d20cab84f3ef4363233c"

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page

    return fetch (url)
        .then((res) => res.json())
        .catch((error) => console.log(error))
}

export function getImageFromApi(name) {
    console.log(name);
    
    return 'https://image.tmdb.org/t/p/w300' + name
}