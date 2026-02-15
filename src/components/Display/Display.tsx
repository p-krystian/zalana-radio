import { type AudioManageT } from '@/components/CachedAudio/CachedAudio';
import { lang } from '@/conf';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import styles from './Display.module.css';

type DisplayProps = {
  title: string;
  date?: Date;
  manager?: AudioManageT | null;
};

const time = (sec: number) => {
  let s = Math.round(+sec);
  const m = Math.floor(s / 60);
  s = s % 60;

  const ps = s > 9 ? s : `0${s}`;
  const pm = m > 9 ? m : `0${m}`;

  return `${pm}:${ps}`;
};

function Display({ date, title, manager }: DisplayProps) {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [overflow, setOverflow] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const displayDate = useMemo(() => (date || new Date(0)).toLocaleDateString(lang), [date]);

  const checkOverflow = useCallback(() => {
    const scroll = titleRef.current?.scrollWidth || 0;
    const client = titleRef.current?.clientWidth || 0;

    setOverflow(Math.max(scroll - client, 0));
    // Overflow calculation must be done with every title change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    const unregisterTotal = manager?.registerDurationUpdate(setTotal);
    const unregisterCurrent = manager?.registerTimeUpdate(setCurrent);

    return () => {
      unregisterTotal?.();
      unregisterCurrent?.();
      setCurrent(0);
      setTotal(0);
    };
  }, [manager]);

  useEffect(() => {
    checkOverflow();

    document.fonts.addEventListener('load', checkOverflow);

    return () => {
      document.fonts.removeEventListener('load', checkOverflow);
    };
  }, [checkOverflow]);

  return (
    <div class={styles.display}>
      <span class={styles.date}>{displayDate}</span>
      <div
        ref={titleRef}
        className={`${styles.title} ${overflow ? styles.marquee : ''}`}
        style={{ '--_px': overflow }}
      >
        <span>{title}</span>
      </div>
      <div class={styles.duration}>
        <span class={styles.current}>{time(current)}</span>
        {' / '}
        <span class={styles.total}>{time(total)}</span>
      </div>
    </div>
  );
}

export default Display;
