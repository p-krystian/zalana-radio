import { useState } from 'preact/hooks';
import { t } from '@/conf';

import Speaker from '@/components/Speaker/Speaker';
import Volume from '@/components/Volume/Volume';
import Display from '@/components/Display/Display';
import Controls from '@/components/Controls/Controls';
import Regulator from '@/components/Regulator/Regulator';

function App() {
  const [volume, setVolume] = useState(0.5);
  const [s, setS] = useState(1);
  const [e, setE] = useState(1);

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
          <Regulator desc={t.s} value={s} setValue={setS} maxValue={3} />
          <Regulator desc={t.e} value={e} setValue={setE} maxValue={10} />
        </div>
      </div>
    </>
  )
}
export default App;
