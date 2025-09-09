import { lang } from '@/conf';
import styles from './Display.module.css';

type DisplayProps = {
  date?: Date;
  title: string;
  current: number;
  total: number;
};

const time = (sec: number) => {
  let s = Math.round(+sec);
  const m = Math.floor(s / 60);
  s = s % 60;

  const ps = s > 9 ? s : `0${s}`;
  const pm = m > 9 ? m : `0${m}`;

  return `${pm}:${ps}`;
}

function Display({ date, title, current, total }: DisplayProps) {
  const displayDate = date ? date.toLocaleDateString(lang) : '00.00.0000';

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
          {time(current)}
        </span>
        {' / '}
        <span class={styles.total}>
          {time(total)}
        </span>
      </div>
    </div>
  );
}

export default Display;
