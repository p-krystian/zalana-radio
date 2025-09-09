import { t } from '@/conf';
import getData, { DataT } from '@/utils/dataFetcher';
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'preact/hooks';

import Controls from '@/components/Controls/Controls';
import Display from '@/components/Display/Display';
import Regulator from '@/components/Regulator/Regulator';
import Speaker from '@/components/Speaker/Speaker';
import Volume from '@/components/Volume/Volume';

type AudioStatusT = 'loading' | 'paused' | 'playing' | 'none';
type AudioStateT = {
  status: AudioStatusT;
  currentTime: number;
  duration: number;
};
type ReducerAction = [
  'status', AudioStatusT
] | [
  'currentTime' | 'duration', number
];

const initialAudioState: AudioStateT = {
  status: 'none',
  currentTime: 0,
  duration: 0,
};
const reducer = (state: AudioStateT, [key, value]: ReducerAction) => ({
  ...state,
  [key]: value,
});

function App() {
  const [data, setData] = useState<DataT>([]);
  const [volume, setVolume] = useState(0.5);
  const [s, setS] = useState(1);
  const [e, setE] = useState(1);
  const currentAudio = useRef<HTMLAudioElement>(null);
  const [audioState, dispatch] = useReducer(reducer, initialAudioState);

  const epizode = data.at(s - 1)?.at(e - 1);

  useLayoutEffect(() => {
    dispatch(['duration', currentAudio.current?.duration || 0]);
    if (!epizode) {
      dispatch(['status', 'none']);
    }
  }, [epizode])

  useEffect(() => {
    getData().then((d) => {
      setData(d);
      setS(d.length);
      setE(d.at(-1)?.length || 1);
    });
  }, []);

  return (
    <>
      {!!epizode && (
        <audio
          ref={currentAudio}
          src={epizode?.url}
          volume={volume}
          preload="auto"
          onPlay={() => dispatch(['status', 'playing'])}
          onPlaying={() => dispatch(['status', 'playing'])}
          onPause={() => dispatch(['status', 'paused'])}
          onLoadStart={() => dispatch(['status', 'loading'])}
          onLoadedData={() => dispatch(['status', 'paused'])}
          onLoadedMetadata={(e) => dispatch(['duration', e.currentTarget.duration])}
          onTimeUpdate={(e) => dispatch(['currentTime', e.currentTarget.currentTime])}
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            dispatch(['status', 'paused']);
          }}
          controls
        />
      )}
      <div>
        <Speaker playing={audioState.status === 'playing'} />
        <Volume volume={volume} setVolume={setVolume} />
      </div>
      <div>
        <Display
          title={audioState.status === 'loading' ? t.loading : epizode?.name || t.none}
          date={epizode?.date}
          current={audioState.currentTime}
          total={audioState.duration}
        />
        <Controls
          playing={audioState.status === 'playing'}
          audio={currentAudio.current}
        />
        <div class="pyr-flex-evenly">
          <Regulator desc={t.s} value={s} setValue={setS} maxValue={data.length + 1} />
          <Regulator desc={t.e} value={e} setValue={setE} maxValue={10} />
        </div>
      </div>
    </>
  )
}
export default App;
