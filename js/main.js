document.addEventListener('DOMContentLoaded', () => {
    const tracksArr = localStorage.getItem('tracks');
    if (tracksArr) {
        tracks = JSON.parse(tracksArr);
    }
    renderMusic(tracks)

    const avatar = localStorage.getItem('avatar')
    if (avatar) {
        document.getElementById('avatar').src = avatar
    }else { 
        document.getElementById('avatar').src = '/image/deflautAvatar.png'
    }
})

const addMusicBtn = document.getElementById('addMusic');
const createPlayListBtn = document.getElementById('createPlayList');
const modalCreatePlayList = document.querySelector('.modalCreatePlayList');
const reportBugBtn = document.getElementById('reportBug');

const avatar = document.getElementById('avatar');
const modalAvatar = document.querySelector('.modalAvatar');
const changeInpAvatar = document.getElementById('changeInpAvatar');
const changePasswordBtn = document.getElementById('changePassword');
const modalChangePassword = document.querySelector('.modalChangePassword');
const changeLoginBtn = document.getElementById('changeLogin');
const modalChangeName = document.querySelector('.modalChangeName');
const changeEmailBtn = document.getElementById('changeEmail');
const modalChangeEmail = document.querySelector('.modalChangeEmail');
const logOutBtn = document.getElementById('logOut');
const deleteAccountBtn = document.getElementById('deleteAccount');

const player = document.getElementById('myPlayer');
const musicInp = document.getElementById('musicInput');

const trackInfo = document.querySelector('.track-info');
const trackTitle = document.getElementById('trackTitle');
const trackDuration = document.getElementById('trackDuration');
const progressBar = document.getElementById('progressBar');
const prevTrackBtn = document.getElementById('prevTrack');
const playPauseBtn = document.getElementById('playPause');
const nextTrackBtn = document.getElementById('nextTrack');
const allMusicUser = document.querySelector('.allMusicUser');


let tracks = [];
let currentTracksIndex = 0;
let db

addMusicBtn.addEventListener('click', () => {
    musicInp.click()
})

musicInp.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const music = {
            title: file.name,
            src: reader.result
        }
        tracks.push(music)
        saveMusicLS()
        renderMusic(tracks)
    }
})

function saveMusicLS() {
    localStorage.setItem('tracks', JSON.stringify(tracks))
}

function renderMusic() {
    allMusicUser.innerHTML = ' ';
    tracks.forEach((track, index) => {
        const musicCard = document.createElement('div');
        musicCard.classList.add('music-card')
        musicCard.innerHTML = `
        <h3>${track.title}</h3>
        <button onclick="deleteMusic(${index})" class='deleteMusic'>Удалить</button>
        `
        allMusicUser.appendChild(musicCard)
        musicCard.addEventListener('click', () => {
            trackInfo.style.display = 'flex'
            player.src = track.src
            trackTitle.textContent = track.title
            trackDuration.textContent = '0:00 / 0:00'
            currentTracksIndex = index
        })
    })
    saveMusicLS()
}

function deleteMusic(index) {
    tracks.splice(index, 1)
    renderMusic(tracks)
    saveMusicLS()
    localStorage.setItem('tracks', JSON.stringify(tracks))
    localStorage.removeItem('tracks')
}

function playMusic() {
    player.play()
}

function pauseMusic() {
    player.pause()
}

function nextMusic() {
    currentTracksIndex++
    if (currentTracksIndex >= tracks.length) {
        currentTracksIndex = 0
    }
    player.src = tracks[currentTracksIndex].src
    trackTitle.textContent = tracks[currentTracksIndex].title
    player.play()
}

function prevTrack() {
    currentTracksIndex--
    if (currentTracksIndex < 0) {
        currentTracksIndex = tracks.length - 1
    }
    player.src = tracks[currentTracksIndex].src
    trackTitle.textContent = tracks[currentTracksIndex].title
    player.play()
}

playPauseBtn.addEventListener('click', () => {
    if (player.paused) {
        playMusic()
    } else {
        pauseMusic()
    }
})

nextTrackBtn.addEventListener('click', nextMusic)
prevTrackBtn.addEventListener('click', prevTrack)

progressBar.addEventListener('input', () => {
    player.currentTime = (progressBar.value * player.duration) / 100;
});

player.addEventListener('timeupdate', () => {
    progressBar.value = (player.currentTime / player.duration) * 100;
    
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    trackDuration.textContent = `${formatTime(player.currentTime)} / ${formatTime(player.duration)}`;
});

player.addEventListener('ended', () => {
    nextMusic()
})


avatar.addEventListener('click', () => {
    modalAvatar.style.display = 'flex'
})

changePasswordBtn.addEventListener('click' , () => { 
    modalChangePassword.style.display = 'flex';
})

changeLoginBtn.addEventListener('click', () => {
    modalChangeName.style.display = 'flex';
})

changeEmailBtn.addEventListener('click', () => {
    modalChangeEmail.style.display = 'flex';
})

changeInpAvatar.addEventListener('change', () => {
    const file = changeInpAvatar.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        avatar.src = reader.result
        localStorage.setItem('avatar', reader.result)
    }
})

changePasswordBtn.addEventListener('click', () => {
    modalChangePassword.style.display = 'flex'
})

createPlayListBtn.addEventListener('click', () => {
    modalCreatePlayList.style.display = 'flex'
})

logOutBtn.addEventListener('click', () => {
    location.href = '/html/login/register.html'
})

deleteAccountBtn.addEventListener('click' , () => { 
    location.href = '/html/login/register.html'
    localStorage.removeItem('user')
})


//initialize db