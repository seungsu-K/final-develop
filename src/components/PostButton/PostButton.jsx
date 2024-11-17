import { string, bool, func, object, number } from 'prop-types';
import S from './PostButton.module.css';

function PostButton({
  width = '3rem',
  height = '3rem',
  color = 'var(--white)',
  backgroundColor = 'var(--primary)',
  zIndex,
  bottom,
  top,
  right,
  left,
  borderRadius = '3.125rem',
  disabled = false,
  onClick,
  children,
}) {
  return (
    <button
      className={S.PostButton}
      style={{
        width,
        height,
        color,
        backgroundColor,
        zIndex,
        bottom,
        top,
        right,
        left,
        borderRadius,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

PostButton.propTypes = {
  text: string,
  width: string,
  height: string,
  color: string,
  backgroundColor: string,
  bottom: string,
  top: string,
  right: string,
  left: string,
  borderRadius: string,
  disabled: bool,
  onClick: func,
  children: object,
  zIndex: number,
};

export default PostButton;
