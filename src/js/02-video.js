import VimeoPlayer from '@vimeo/player';
import  throttle  from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

function saveTimeUp(e) {
    const videoplayerCurrentTime = e.seconds;
    localStorage.setItem("videoplayer-current-time", JSON.stringify(videoplayerCurrentTime));
};
    const savedTime = JSON.parse(
      localStorage.getItem('videoplayer-current-time')
    );
    player.setCurrentTime(savedTime || 0);

player.on('timeupdate', throttle(saveTimeUp, 1000));




