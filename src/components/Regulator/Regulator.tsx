import Button from '@/components/Button/Button';
import { t } from '@/conf';
import { useId } from 'preact/hooks';
import styles from './Regulator.module.css';

type RegulatorProps = {
  desc: string,
  value: number,
  maxValue: number,
  setValue: (value: number) => void
};

function Regulator({ desc, value, maxValue, setValue }: RegulatorProps) {
  const inputID = useId();
  return (
    <div className={styles.regulator}>
      <label for={inputID}>
        {desc}
      </label>
      <Button
        onClick={() => setValue(Math.max(value - 1, 1))}
        value={t.less}
        small
      >
        <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <title>{t.less}</title>
          <line stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="4" x2="21" y1="13" y2="13" />
        </svg>
      </Button>
      <input
        type="number"
        id={inputID}
        min="1"
        max={maxValue}
        value={value}
        step="1"
        onInput={(e) => setValue(+e.currentTarget.value)}
      />
      <Button
        onClick={() => setValue(Math.min(value + 1, maxValue))}
        value={t.more}
        small
      >
        <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <title>{t.more}</title>
          <line stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="13" x2="13" y1="21" y2="4" />
          <line stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="4" x2="21" y1="13" y2="13" />
        </svg>
      </Button>
    </div>
  );
}

export default Regulator;
