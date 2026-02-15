import { t } from '@/conf';
import getData, { DataT } from '@/utils/dataFetcher';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import CachedAudio, { AudioManageT } from '@/components/CachedAudio/CachedAudio';
import Controls from '@/components/Controls/Controls';
import Display from '@/components/Display/Display';
import Regulator from '@/components/Regulator/Regulator';
import Speaker from '@/components/Speaker/Speaker';
import Volume from '@/components/Volume/Volume';

type AudioEventT = preact.TargetedEvent<HTMLAudioElement>;
type AudioStatusT = 'loading' | 'paused' | 'playing' | 'none';

function App() {
  const [data, setData] = useState<DataT>([]);
  const [volume, setVolume] = useState(0.5);
  const [s, setS] = useState(1);
  const [e, setE] = useState(1);
  const audioManage = useRef<AudioManageT>(null);
  const [audioStatus, setAudioStatus] = useState<AudioStatusT>('none');

  const epizode = data.at(s - 1)?.at(e - 1);

  const updatePlayStatus = useCallback((e: AudioEventT) => {
    setAudioStatus(e.currentTarget.paused ? 'paused' : 'playing');
  }, []);

  const setLoading = useCallback(() => {
    setAudioStatus('loading');
  }, []);

  const onEnd = useCallback(
    (e: AudioEventT) => {
      e.currentTarget.currentTime = 0;
      updatePlayStatus(e);
    },
    [updatePlayStatus],
  );

  useEffect(() => {
    if (!epizode) {
      setAudioStatus('none');
    }
  }, [epizode]);

  useEffect(() => {
    if (window.location !== window.parent.location) {
      document.body.classList.add('pyr-iframe');
    }
    getData().then((d) => {
      setData(d);
      setS(d.length);
      setE(d.at(-1)?.length || 1);
    });
  }, []);

  return (
    <>
      <CachedAudio
        manage={audioManage}
        src={epizode?.url}
        volume={volume}
        onPlay={updatePlayStatus}
        onPlaying={updatePlayStatus}
        onPause={updatePlayStatus}
        onLoadStart={setLoading}
        onLoadedData={updatePlayStatus}
        onWaiting={setLoading}
        onEnded={onEnd}
      />
      <div>
        <Speaker playing={audioStatus === 'playing'} />
        <Volume volume={volume} setVolume={setVolume} />
      </div>
      <div>
        <Display
          title={audioStatus === 'loading' ? t.loading : epizode?.name || t.none}
          date={epizode?.date}
          manager={audioManage.current}
        />
        <Controls playing={audioStatus === 'playing'} manager={audioManage.current} />
        <div class="pyr-flex-evenly">
          <Regulator desc={t.s} value={s} setValue={setS} maxValue={data.length + 1} />
          <Regulator desc={t.e} value={e} setValue={setE} maxValue={10} />
        </div>
      </div>
    </>
  );
}
export default App;
