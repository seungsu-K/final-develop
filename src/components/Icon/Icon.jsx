import S from '@/components/Icon/style.module.css';

import { number } from 'prop-types';
import { string } from 'prop-types';

Icon.propTypes = {
  id: string.isRequired,
  width: number,
  height: number,
  text: string,
  color: string,
};

function Icon({ id, width = 20, height = 20, text = null, color = '#101115' }) {
  return (
    <div className={S.component}>
      <svg width={width} height={height} style={{ color }}>
        <use xlinkHref={`/stack.svg#${id}`} />
      </svg>
      <span>{text}</span>
    </div>
  );
}

export default Icon;
