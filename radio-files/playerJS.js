(() => {
const $ = q => document.querySelector(q);
const $a = q => document.querySelectorAll(q);
const clickSound = new Audio('./radio-files/click.wav');
clickSound.preload = true;
clickSound.volume = 0.2;
const fullData = [];
const thisData = () => fullData?.at(
  +$('input#pyr-s').value - 1
)?.at(
  +$('input#pyr-e').value - 1
);
let lastPlayed = null;

const time = (sec) => {
  let s = Math.round(+sec);
  let m = Math.floor(s / 60);
  s = s % 60;
  s = s > 9 ? s : `0${s}`;
  m = m > 9 ? m : `0${m}`;

  return `${m}:${s}`;
}
function updateTime() {
  const currentData = thisData();
  const field = $('#pyr-current');

  field.innerText = currentData ? (
    time(currentData.audio.currentTime)
  ) : (
    '00:00'
  );
}
function setDisplay() {
  const currentData = thisData();

  const date = $('#pyr-date');
  const title = $('#pyr-title');
  const titleField = $('#pyr-title span');
  const duration = $('#pyr-total');

  titleField.classList.remove('anime');
  updateTime();
  if (!currentData) {
    date.innerText = '00.00.0000';
    titleField.innerText = 'NO SIGNAL';
    duration.innerText = '00:00';
    return;
  }
  date.innerText = currentData.date;
  titleField.innerText = currentData.name;
  duration.innerText = currentData.audio.duration ? (
    time(currentData.audio.duration)
  ) : (
    "LOADING"
  );
  if (title.offsetWidth < titleField.offsetWidth) {
    titleField.style.setProperty(
      '--_o',
      title.offsetWidth - titleField.offsetWidth
    );
    titleField.classList.add('anime');
  }
}
async function loadData() {
  try {
    const path = location.href.split('/');
    path.pop();
    const url = path.join('/');

    const res = await fetch(
      `${url}/broadcast/noAPI.json`,
      {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    fullData.push(...await res.json());
  }
  catch {
    $('#pyr-title span').innerText = `BŁĄD ${res.status}`;
    return;
  }
  let currentTime = new Date().getTime();
  try {
    const timeAPI = await fetch(
      'https://worldtimeapi.org/api/timezone/Europe/Warsaw',
      {
        mode: 'cors',
        cache: 'no-cache'
      }
    );
    const timeData = await timeAPI.json();
    currentTime = new Date(timeData.datetime).getTime();
  }
  catch {
    console.warn("Failed to download time from API");
    currentTime = new Date().getTime();
  }
  while (true) {
    if (fullData.at(-1).length < 1) {
      fullData.pop(-1);
      continue;
    }
    const e = fullData.at(-1)?.at(-1).date.split('.');
    const episodeTime = new Date(`${e[1]}-${e[0]}-${e[2]}`).getTime();

    if (episodeTime < currentTime)
      break;
    fullData.at(-1).pop(-1);
  }
  for (const season of fullData) {
    for (const episode of season) {
      episode.audio = new Audio(episode.url);
      episode.audio.volume = +$('#pyr-vol').value;
      episode.audio.addEventListener('loadeddata', e => (
        e.target === thisData()?.audio && setDisplay()
      ));
      episode.audio.addEventListener('timeupdate', e => (
        e.target === thisData()?.audio && updateTime()
      ));
      episode.audio.addEventListener('ended', () => stop());
    }
  }
  $('input#pyr-s').value = fullData.length;
  $('input#pyr-s').max = fullData.length + 1;
  $('input#pyr-e').value = fullData.at(-1).length;
  setDisplay();
}
function setSE() {
  stop();
  setDisplay();
  const audio = thisData()?.audio;
  if (audio)
    audio.volume = +$('#pyr-vol').value;
}
function upDown(btnId) {
  const input = $(`#pyr-${btnId.substr(4, 1)}`);
  const action = btnId.substr(5);
  if (action == "up")
    input.value = Math.min((+input.value + 1), +input.max);
  else
    input.value = Math.max((+input.value - 1), +input.min);
  setSE();
}
function unclick() {
  const btns = [$('#pyr-stop'), $('#pyr-play'), $('#pyr-pause')];
  for (const btn of btns)
    btn.classList.remove('clicked');
}
function stop() {
  const audio = thisData()?.audio;
  if (lastPlayed) {
    lastPlayed.pause();
    lastPlayed.currentTime = 0;
    lastPlayed = null;
  }
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    setDisplay();
  }
  unclick();
  $('#pyr-stop').classList.add('clicked');
  $('.pyr-membrane').classList.remove('anime');
}
function play() {
  const audio = thisData()?.audio;
  if (!audio)
    return stop();
  unclick();

  if (audio.duration) {
    audio.play();
    $('#pyr-play').classList.add('clicked');
    $('.pyr-membrane').classList.add('anime');
    lastPlayed = audio;
  }
  else {
    audio.preload = 'true';
    fetch(audio.src)
      .then(res => res.blob())
      .then(blob => {
        audio.src = URL.createObjectURL(blob);
        audio.load();
      });
    stop();
  }
}
function pause() {
  if (thisData()?.audio?.paused)
    return stop();
  thisData()?.audio?.pause();
  unclick();
  $('#pyr-pause').classList.add('clicked');
  $('.pyr-membrane').classList.remove('anime');
}
function backward() {
  const audio = thisData()?.audio;
  if (audio && !audio.paused)
    audio.currentTime -= 5;
}
function forward() {
  const audio = thisData()?.audio;
  if (audio && audio.currentTime + 6 <= audio.duration && !audio.paused)
    audio.currentTime += 5;
}
window.addEventListener('load', () => {
  if (window.location !== window.parent.location)
    document.body.classList.add('pyr-iframe');
  $a('article.player button').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      clickSound.pause();
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
  $a('article.player button.pyr-small').forEach(btn => {
    btn.addEventListener('click', () => upDown(btn.id));
  });
  $('#pyr-vol').addEventListener('input', e => {
    const audio = thisData()?.audio;
    if (audio)
      audio.volume = +e.target.value;
  });
  clickSound.load();
  $('#pyr-stop').addEventListener('click', stop);
  $('#pyr-play').addEventListener('click', play);
  $('#pyr-pause').addEventListener('click', pause);
  $('#pyr-backward').addEventListener('click', backward);
  $('#pyr-forward').addEventListener('click', forward);
  $('#pyr-s').addEventListener('change', setSE);
  $('#pyr-e').addEventListener('change', setSE);
  stop();
  loadData();
});
document.fonts.addEventListener('load', () => setDisplay());
})();
