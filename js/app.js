
let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.artist');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');
const lyrics = document.querySelector('.lyrics-paragraph');
const title_music = document.querySelector('.title-music');
const pic_album = document.querySelector('.pic-album');
const ul_album = document.querySelector('#ul-album');
const ul_artists = document.querySelector('#ul-artists');
const title_song_album = document.querySelector('#title-song-album');
const year_song_album = document.querySelector('#year-song-album');


//API
//Lyrics
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(async () => {
        const res = await fetch(`${url}/song/lyrics/?id=${options.params.id}`, options);
        try {
            if (res.ok) {
                const data = await res.json();
                lyrics.innerHTML = JSON.stringify(data.lyrics.lyrics.body.html);
                title_music.innerHTML = JSON.stringify(data.lyrics.tracking_data.title);
            } else {
                console.log('Request Failed Lyrics: ', res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }, 2000)

    //Other Albums
    setTimeout(async () => {
        const res = await fetch(`${urlSpot}/search/?q=taylor%20swift&type=albums&offset=0&limit=3&numberOfTopResults=5`, optionsSpot);

        try {
            if (res.ok) {
                const data = await res.json();
                const albums = data.albums.items
                albums.map(album => {
                    const data = album.data;
                    const imageUrl = data.coverArt.sources[0].url;
                    const link = data.uri;
                    const listItem = document.createElement('li');

                    listItem.innerHTML = `
                        <a href="${link}" target="_blank">
                        <img src="${imageUrl}" />
                        <p>${data.name}</p>
                        <i>${data.date.year}</i>
                        </a>
                    `

                    ul_album.appendChild(listItem);
                });
            } else {
                console.log('Request Failed Albums: ', res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }, 2000)


    //Related Artists
    setTimeout(async () => {
        const res = await fetch('https://spotify23.p.rapidapi.com/artists/?ids=66CXWjxzNUsdJxJ2JdwvnR%2C6eUKZXaKkcviH0Ku9w2n3V%2C6jJ0s89eD6GaHleKKya26X', optionsSpot);

        if (res.ok) {
            const data = await res.json();
            const listArtist = data.artists;;
            listArtist.map(artist => {
                const listItem = document.createElement('li');
                const imgUrl = artist.images[0].url;
                const link = artist.uri;
                const name = artist.name;

                listItem.innerHTML = `
                <a href="${link}" target="_blank">
                <img src="${imgUrl}" />
                <p>${name}</p>
                </a>
                `
                ul_artists.appendChild(listItem);
            });
        } else {
            throw new Error(`Request Failed: ${res.status}`);
        }

    }, 2000)
});
//End of API

//PlayBTN
playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')) {
        music.play();
    } else {
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

//MUSICS Control
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300)
}


setMusic(0)

//Time Formatting
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        forwardBtn.click()
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}

forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})

//Tab Explore

const tabs = document.querySelectorAll('.tab_btn');
const all_content = document.querySelectorAll('.content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab => { tab.classList.remove('active') });
        tab.classList.add('active');

        // let line = document.querySelector('.line');
        // line.style.width = e.target.offsetWidth + "px";
        // line.style.left = e.target.offsetLeft + "px";

        all_content.forEach(content => {
            content.classList.remove('active');
        })
        all_content[index].classList.add('active');;
    })
})