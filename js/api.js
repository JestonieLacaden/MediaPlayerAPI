
const url = 'https://genius-song-lyrics1.p.rapidapi.com';
const options = {
    method: 'GET',
    url: 'https://genius-song-lyrics1.p.rapidapi.com',
    params: { id: '7394358' },
    headers: {
        // 'X-RapidAPI-Key': 'eb581e5b11msh9bdae76121aa3f9p176553jsn56b582fbbf95'
        'X-RapidAPI-Key': '60e41764d1mshee763a7bf3866c1p14c714jsnadc2fc68c65c',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
};

const urlSpot = 'https://spotify23.p.rapidapi.com';
const optionsSpot = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'eb581e5b11msh9bdae76121aa3f9p176553jsn56b582fbbf95',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
};
// const callApi = async () => {
//     try {
//         await fetch(`${url}/?id=${options.params.id}`, options).then(response => response.json()).then((response) => res = response);
//     } catch (error) {
//         console.log(error);
//     }
// }