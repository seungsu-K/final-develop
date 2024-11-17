import S from '@/components/Button/IconButton.module.css';
import Icon from '../Icon/Icon';
import { string, func, number } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

IconButton.propTypes = {
  title: string,
  onClick: func,
  width: number,
  height: number,
  iconColor: string,
  iconId: string.isRequired,
  path: string,
};

function IconButton({
  title,
  onClick,
  width = 16,
  height = 16,
  iconColor = '#101115',
  iconId,
  path,
}) {
  const nav = useNavigate();

  const handleClick = (e) => {
    if (path === '-1') {
      e.preventDefault();
      nav(-1);
    }

    if (path && path !== '-1') {
      nav(path);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={S.IconButton}
      type="button"
      title={title}
      onClick={handleClick}
    >
      <Icon id={iconId} width={width} height={height} color={iconColor} />
    </button>
  );
}

const memoizedIconButton = memo(IconButton);

export default memoizedIconButton;
