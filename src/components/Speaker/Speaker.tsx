import styles from './Speaker.module.css';

type SpeakerProps = {
  playing: boolean;
}

function Speaker({ playing }: SpeakerProps) {
  const membraneClass = `${styles.membrane} ${playing ? styles.anime : ''}`;

  return (
    <div class={styles.speaker} aria-hidden="true">
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="48" r="8" />
        <circle cx="464" cy="48" r="8" />
        <circle cx="256" cy="256" r="210" fill="none" />
        <circle cx="48" cy="464" r="8" />
        <circle cx="464" cy="464" r="8" />
      </svg>
      <div class={membraneClass}></div>
    </div>
  );
}

export default Speaker;
