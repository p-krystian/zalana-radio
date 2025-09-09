import { t } from '@/conf';
import getData, { DataT } from '@/utils/dataFetcher';
import { useEffect, useState } from 'preact/hooks';

import Controls from '@/components/Controls/Controls';
import Display from '@/components/Display/Display';
import Regulator from '@/components/Regulator/Regulator';
import Speaker from '@/components/Speaker/Speaker';
import Volume from '@/components/Volume/Volume';

function App() {
  const [volume, setVolume] = useState(0.5);
  const [s, setS] = useState(1);
  const [e, setE] = useState(1);
  const [data, setData] = useState<DataT>([]);

  useEffect(() => {
    getData().then((d) => {
      setData(d);
      setS(d.length + 1);
      setE(d.length > 0 ? d[d.length - 1].length : 1);
    });
  }, []);

  return (
    <>
      <div>
        <Speaker playing={false} />
        <Volume volume={volume} setVolume={setVolume} />
      </div>
      <div>
        <Display title="Testowanie" currentDur={0} totalDur={0} date={12387129} />
        <Controls />
        <div class="pyr-flex-evenly">
          <Regulator desc={t.s} value={s} setValue={setS} maxValue={data.length + 1} />
          <Regulator desc={t.e} value={e} setValue={setE} maxValue={10} />
        </div>
      </div>
    </>
  )
}
export default App;
