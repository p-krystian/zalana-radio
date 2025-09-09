const lang = 'pl';
const moveStep = 5;

const env = {
  API_URL: import.meta.env.VITE_API_URL
} as const;

const t = {
  vol: 'VOL',
  less: 'Mniej',
  more: 'Więcej',
  s: 'S',
  e: 'E',
  backward: 'Prxewiń w tył',
  stop: 'Stop',
  play: 'Odtwarzaj',
  pause: 'Pauza',
  forward: 'Przewiń w przód',
  loading: 'Wczytywanie',
  none: 'Brak sygnału'
} as const;

export {
  lang,
  moveStep,
  env,
  t
};
