import styles from './Button.module.css';

type ButtonProps = {
  children: preact.ComponentChildren;
  onClick: () => unknown;
  small?: boolean;
  clicked?: boolean;
  value?: string;
};

function Button({ children, onClick, small, clicked, value }: ButtonProps) {
  const classNames = [
    styles.button,
    small ? styles.small : '',
    clicked ? styles.clicked : ''
  ].join(' ');

  return (
    <button
      type="button"
      class={classNames}
      onClick={onClick}
      value={value}
    >
      {children}
    </button>
  );
}

export default Button;
