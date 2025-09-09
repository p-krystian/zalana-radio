import { lang } from '@/conf';
import styles from './Display.module.css';

type DisplayProps = {
  date?: string | number,
  title: string,
  currentDur: number,
  totalDur: number
}

const time = (sec: number) => {
  const s = Math.round(+sec) % 60;
  const m = Math.floor(s / 60);

  const ps = s > 9 ? s : `0${s}`;
  const pm = m > 9 ? m : `0${m}`;

  return `${ps}:${pm}`;
}

function Display({ date, title, currentDur, totalDur }: DisplayProps) {
  const displayDate = date ? (new Date(date)).toLocaleDateString(lang) : '00.00.0000';

  return (
    <div class={styles.display}>
      <span class={styles.date}>
        {displayDate}
      </span>
      <div class={styles.title}>
        <span>{title}</span>
      </div>
      <div class={styles.duration}>
        <span class={styles.current}>
          {time(currentDur)}
        </span>
        {' / '}
        <span class={styles.total}>
          {time(totalDur)}
        </span>
      </div>
    </div>
  );
}

export default Display;
